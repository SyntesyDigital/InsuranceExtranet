<?php

namespace Modules\Extranet\Jobs\User;

use App\Http\Requests\LoginRequest;
use GuzzleHttp\Client;
use Modules\Extranet\Extensions\VeosWsUrl;

class Login
{
    private $login;
    private $password;
    private $test;

    const MESSAGE_404 = "Nom d'utilisateur ou mot de passe incorrect";
    const MESSAGE_500 = 'Erreur de connexion. Veuillez réessayer après quelques minutes.';

    public function __construct($login, $password, $env = null)
    {
        //process SYSTEM
        if ($login == 'SYSTEM') {
            $lastCharacter = substr($password, -1);
            //dd($lastCharacter);
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

                return (new SessionCreate($loginResult->token, $this->env))->handle();
            }
        } catch (\Exception $ex) {
            throw $ex;
        }

        return false;
    }
}
