<?php

namespace Modules\Extranet\Extensions;

use GuzzleHttp\Client;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Contracts\Auth\UserProvider;
use Session;

class VeosUserProvider implements UserProvider
{
    public function __construct()
    {
        if ($this->user()) {
            switch ($this->user()->role) {
               case ROLE_SYSTEM:
               case ROLE_SUPERADMIN:
               case ROLE_ADMIN:
               case ROLE_USER:
                    //update token
                    $this->renewToken();
                    break;

                default:
                    header('Location: /unavailable');
                    exit();
                    break;
           }
        }
    }

    public function retrieveById($identifier)
    {
        //Needs Implementation
        echo 'retrieveById';
        exit();
    }

    public function retrieveByToken($identifier, $token)
    {
        //Needs Implementation
        echo 'retrieveByToken';
        exit();
    }

    public function updateRememberToken(Authenticatable $user, $token)
    {
        //Needs Implementation
    }

    public function retrieveByCredentials(array $credentials)
    {
        echo 'retrieveByCredentials';
        exit();
        //Needs Implementation
    }

    public function validateCredentials(Authenticatable $user, array $credentials)
    {
        echo 'validateCredentials';
        exit();
        //Needs Implementation
    }

    public function check()
    {
        return Session::has('user') ? true : false;
    }

    public function guest()
    {
    }

    private function isTokenExpired($token)
    {
        if (!isset($token)) {
            return true;
        }

        $tokenArray = explode('.', $token);
        $payload = json_decode(base64_decode($tokenArray[1]));

        if ($payload->exp < time()) {
            return true;
        } else {
            return false;
        }
    }

    public function renewToken()
    {
        if (Session::has('user')) {
            //if not has expired renew
            $user = json_decode(Session::get('user'));

            //if token expired redirect to login
            if ($this->isTokenExpired($user->token)) {
                header('Location: /login');
                exit();
            }

            //if not expired renew login
            $client = new Client();
            $response = $client->get(VeosWsUrl::getEnvironmentUrl($user->env).'login/renew', [
            'headers' => [
                'Authorization' => 'Bearer '.$user->token,
            ],
        ]);
            $result = json_decode($response->getBody());
            $user->token = $result->token;
            Session::put('user', json_encode($user));
        }
    }

    public function user()
    {
        return Session::has('user') ? json_decode(Session::get('user')) : false;
    }

    public function attempt()
    {
    }
}
