<?php

namespace Modules\Extranet\Services\TokenLogin\Veos;

use Firebase\JWT\JWT;
use GuzzleHttp\Client;
use Modules\Extranet\Extensions\VeosWsUrl;

class LoginToken
{
    /**
     * __construct.
     *
     * @param mixed $login
     * @param mixed $iss
     * @param mixed $key
     *
     * @return void
     */
    public function __construct($login, $iss = null, $key = null)
    {
        $this->login = $login;
        $this->iss = $iss ?: get_config('VEOS_ISS');
        $this->key = $key ?: get_config('VEOS_KEY');
        $this->client = new Client();
        $this->env = request()->get('env');

        $this->testMode = substr(strtolower($this->login), -4) == '-dev' ? true : false;
        $this->recMode = substr(strtolower($this->login), -4) == '-rec' ? true : false;
        $this->devMode = substr(strtolower($this->login), -5) == '-dev2' ? true : false;
    }

    /**
     * getLoginString.
     *
     * @return void
     */
    public function getLoginString()
    {
        if ($this->testMode || $this->recMode) {
            return substr($this->login, 0, -4);
        } elseif ($this->devMode) {
            return substr($this->login, 0, -5);
        }

        return $this->login;
    }

    /**
     * query.
     *
     * @return void
     */
    public function handle()
    {
        echo 'ISS : ';
        print_r($this->iss);
        echo PHP_EOL;
        echo 'KEY : ';
        print_r($this->key);
        exit();
        $postQuery = $this->client->post($this->getWsUrl().'login/token', [
            'json' => [
                'token' => JWT::encode([
                    'iss' => $this->iss,
                    'iat' => time(),
                    'login' => $this->getLoginString(),
                ], $this->key),
            ],
        ]);

        $payload = json_decode($postQuery->getBody()->getContents());

        return isset($payload->token) ? $payload->token : null;
    }

    /**
     * getWsUrl.
     *
     * @return void
     */
    private function getWsUrl()
    {
        if ($this->testMode) {
            return VeosWsUrl::test();
        } elseif ($this->recMode) {
            return VeosWsUrl::rec();
        } elseif ($this->devMode) {
            return VeosWsUrl::test();
        }

        return VeosWsUrl::get($this->env);
    }
}
