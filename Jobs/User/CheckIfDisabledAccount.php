<?php

namespace Modules\Extranet\Jobs\User;

use Exception;
use GuzzleHttp\Client;
use Modules\Extranet\Extensions\VeosWsUrl;

class CheckIfDisabledAccount
{
    private $login;

    public function __construct($login, $env = null)
    {
        $this->login = $login;
        $this->env = $env;
        $this->client = new Client();
    }

    public function handle()
    {
        try {
            $WsUrl = VeosWsUrl::getEnvironmentUrl($this->env);

            $response = $this->client->post($WsUrl.'login', [
                'json' => [
                    'uid' => 'WS',
                    'passwd' => 'WS1234',
                ],
            ]);

            if ($response) {
                $loginResult = json_decode($response->getBody()->getContents());

                if (!$loginResult || $loginResult->statusCode != 0) {
                    return false;
                }

                $response = $this->client->get($WsUrl.'boBy/v2/WS2_SEL_BLOCAGETIDPER?login='.$this->login, [
                    'headers' => [
                        'Authorization' => 'Bearer '.$loginResult->token,
                    ],
                ]);

                if ($response) {
                    $result = json_decode($response->getBody()->getContents());

                    if (!isset($result->data[0])) {
                        return false;
                    }

                    return isset($result->data[0]->VAL_INFP) ? boolval($result->data[0]->VAL_INFP) : false;
                }
            }
        } catch (Exception $ex) {
        }

        return false;
    }
}
