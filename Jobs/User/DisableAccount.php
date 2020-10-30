<?php

namespace Modules\Extranet\Jobs\User;

use GuzzleHttp\Client;
use Modules\Extranet\Extensions\VeosWsUrl;

class DisableAccount
{
    public function __construct($login, $env = null)
    {
        $this->login = $login;
        $this->env = $env;
        $this->client = new Client();
    }

    public function handle()
    {
        // Get a WS token for the WS queries
        if (!$this->token = $this->getToken()) {
            return false;
        }

        // Get login ID from Boby WS
        $this->id = $this->getLoginId();

        $this->updateAccount();
    }

    private function getToken()
    {
        $login = $this->client->post(VeosWsUrl::getEnvironmentUrl($this->env).'login', [
            'json' => [
                'uid' => 'WS',
                'passwd' => 'WS1234',
            ],
        ]);

        if ($login) {
            $loginResult = json_decode($login->getBody()->getContents());

            if (!$loginResult || $loginResult->statusCode != 0) {
                return false;
            }

            return $loginResult->token;
        }

        return false;
    }

    private function getLoginId()
    {
        $response = $this->client->get(VeosWsUrl::get($this->env).'boBy/v2/WS2_SEL_IDPERLOGIN?login='.$this->login, [
            'headers' => [
                'Authorization' => 'Bearer '.$this->token,
            ],
        ]);

        $payload = json_decode($response->getBody()->getContents());

        return isset($payload->data[0]) ? $payload->data[0]->ID_PER : null;
    }

    private function updateAccount()
    {
        // Get Personne object from WS
        $response = $this->client->get(VeosWsUrl::get($this->env).'personne/'.$this->id, [
            'headers' => [
                'Authorization' => 'Bearer '.$this->token,
            ],
        ]);
        $user = json_decode($response->getBody()->getContents());

        // Update retrieved personne object
        $user->actif = 0;
        $user->listInfos = collect($user->listInfos)->map(function ($item, $key) {
            if ($item->key == 'INFOPER.ACTIFEXTRANET') {
                $item->value = 0;
            }

            return $item;
        })->toArray();

        // Update query to WS
        $response = $this->client->put(VeosWsUrl::get($this->env).'personne/'.$this->id, [
            'json' => $user,
            'headers' => [
                'Authorization' => 'Bearer '.$this->token,
            ],
        ]);
        $payload = json_decode($response->getBody()->getContents());

        return isset($payload->id) ? true : false;
    }
}
