<?php

namespace Modules\Extranet\Jobs\User;

use App\Http\Requests\LoginRequest;
use Config;
use Exception;
use GuzzleHttp\Client;
use Modules\Extranet\Entities\LoginAttempt;
use Modules\Extranet\Extensions\VeosWsUrl;
use Modules\Extranet\Repositories\PersonneRepository;
use Request;

class Login
{
    private $login;
    private $password;
    private $test;

    const MESSAGE_404 = "Nom d'utilisateur ou mot de passe incorrect";
    const MESSAGE_500 = 'Erreur de connexion. Veuillez réessayer après quelques minutes.';

    const ERROR_LIMIT_LOGIN_ATTEMPTS = 100;
    const ERROR_LOGIN_NOT_ALLOWED = 101;

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
        $this->repository = new PersonneRepository();
        $this->client = new Client();
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
        $this->checkAttempts();

        try {
            $WsUrl = VeosWsUrl::getEnvironmentUrl($this->env);

            $login = $this->client->post($WsUrl.'login', [
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

                if(get_config('LOGIN_LIMIT_ATTEMPTS')) {
                    $this->repository->flushLoginAttempt($this->uid, $this->env);
                }

                $session = dispatch_now(new SessionCreate($loginResult->token, $this->env, $this->test));

                return $session;
            }
        } catch (\Exception $ex) {
            throw $ex;
        }

        return false;
    }

    private function checkAttempts()
    {
        $attempts = 0;
        $limit = get_config('LOGIN_LIMIT_ATTEMPTS') ? get_config('LOGIN_LIMIT_ATTEMPTS') : false;

        if ($limit == false || $limit <= 0) {
            return null;
        }

        if (dispatch_now(new CheckIfDisabledAccount($this->uid, $this->env))) {
            throw new Exception('User not allowed to login', self::ERROR_LOGIN_NOT_ALLOWED);
        }

        $user = $this->repository->getByUid($this->uid, $this->env);

        // Get attempts
        foreach ($user->listInfos as $item) {
            if ($item->key == 'INFOPER.TENTATIVE') {
                $attempts = $item->value;
            }
        }

        // Increase user attempts
        $user->listInfos = collect($user->listInfos)->map(function ($item, $key) use ($attempts) {
            if ($item->key == 'INFOPER.TENTATIVE') {
                $item->value = $attempts + 1;
            }

            return $item;
        })->toArray();

        // Get Token
        $response = $this->client->post(VeosWsUrl::getEnvironmentUrl($this->env).'login', [
            'json' => [
                'uid' => 'WS',
                'passwd' => 'WS1234',
            ],
        ]);

        $payload = json_decode($response->getBody()->getContents());

        if (!$payload->token) {
            return null;
        }

        // Update user account
        $this->repository->update($user->id, $user, $payload->token, $this->env);

        if ($attempts >= $limit) {
            dispatch_now(new DisableAccount($this->uid, $this->env));

            throw new Exception('Error limit login attempts', self::ERROR_LIMIT_LOGIN_ATTEMPTS);
        }
    }

}
