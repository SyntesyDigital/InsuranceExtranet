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
    public function __construct($login, $iss, $key)
    {
        $this->login = $login;
        $this->iss = $iss;
        $this->key = $key;
        $this->client = new Client();

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

        return VeosWsUrl::prod();
    }
}
