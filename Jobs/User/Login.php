<?php

namespace Modules\Extranet\Jobs\User;

use App\Http\Requests\LoginRequest;
use Config;
use Exception;
use GuzzleHttp\Client;
use Modules\Extranet\Entities\LoginAttempt;
use Modules\Extranet\Extensions\VeosWsUrl;
use Request;

class Login
{
    private $login;
    private $password;
    private $test;

    const MESSAGE_404 = "Nom d'utilisateur ou mot de passe incorrect";
    const MESSAGE_500 = 'Erreur de connexion. Veuillez réessayer après quelques minutes.';

    const ERROR_LIMIT_LOGIN_ATTEMPTS = 100;

    public function __construct($login, $password, $env = null)
    {
        //process SYSTEM
        if (in_array($login, Config::get('architect::admin'))) {
            $lastCharacter = substr($password, -1);
            if ($lastCharacter == '*') {
                $password = substr($password, 0, -1);
            } else {
                $password = '';
            }
        }

        $this->uid = $login;
        $this->passwd = $password;
        $this->test = $env != null ? true : false;
        $this->env = $env != null ? $env : VeosWsUrl::PROD;
    }

    public static function fromRequest(LoginRequest $request)
    {
        return new Login(
            $request->get('uid'),
            $request->get('passwd'),
            $request->get('env')
        );
    }

    public static function fromAttributes($uid, $passwd, $env = null)
    {
        return new Login(
            $uid,
            $passwd,
            $env
        );
    }

    public function handle()
    {
        $this->saveLoginAttempt();

        try {
            $client = new Client();
            $WsUrl = VeosWsUrl::getEnvironmentUrl($this->env);

            $login = $client->post($WsUrl.'login', [
                'json' => [
                    'uid' => $this->uid,
                    'passwd' => $this->passwd,
                ],
            ]);

            if ($login) {
                $loginResult = json_decode($login->getBody()->getContents());

                if (!$loginResult || $loginResult->statusCode != 0) {
                    return false;
                }

                $this->flushLoginAttempt();

                $session = dispatch_now(new SessionCreate($loginResult->token, $this->env, $this->test));

                if (get_config('ON_LOGIN_TRIGGER_FORM') == true) {
                    dispatch_now(new TriggerOnLogin($session));
                }

                return $session;
            }
        } catch (\Exception $ex) {
            throw $ex;
        }

        return false;
    }

    private function saveLoginAttempt()
    {
        $attempt = LoginAttempt::where('login', $this->uid)
            ->where('env', $this->env)
            ->first();

        if (!$attempt) {
            LoginAttempt::create([
                'login' => $this->uid,
                'ip_address' => Request::ip(),
                'user_agent' => Request::header('User-Agent'),
                'count' => 1,
                'env' => $this->env,
            ]);
        } else {
            ++$attempt->count;
            $attempt->save();
        }

        if ($attempt->count >= 5) {
            throw new Exception('Error limit login attempts', self::ERROR_LIMIT_LOGIN_ATTEMPTS);
        }
    }

    private function flushLoginAttempt()
    {
        LoginAttempt::where('login', $this->uid)
            ->where('env', $this->env)
            ->delete();
    }
}
