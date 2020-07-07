<?php

namespace Modules\Extranet\Jobs\User\Session;

use Modules\Extranet\Extensions\VeosWsUrl;
use Session;

class SessionTokenLink
{
    private $login;
    private $password;
    private $test;

    public function __construct($token, $env = null)
    {
        $this->token = $token;
        $this->test = $env != null ? true : false;
        $this->env = $env != null ? $env : VeosWsUrl::PROD;
    }

    public function handle()
    {
        $obj = json_decode(base64_decode(str_replace('_', '/', str_replace('-', '+', explode('.', $this->token)[1]))));

        Session::put('user', json_encode([
            'env' => $this->env,
            'test' => $this->test,
            'token' => $this->token,
            'id_per' => $obj->idPer,
            'code' => $obj->code,
            'categ' => $obj->categ,
            'role' => ROLE_ANONYMOUS,
            'supervue' => false,
            'firstname' => '',
            'lastname' => '',
            'language' => $obj->language,
        ]));

        return true;
    }
}
