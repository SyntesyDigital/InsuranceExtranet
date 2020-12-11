<?php

namespace Modules\Extranet\Services\TokenLogin\Connectors\Theoreme;

use Exception;
use Illuminate\Http\Request;
use Modules\Extranet\Extensions\VeosWsUrl;
use Modules\Extranet\Jobs\User\SessionCreate;
use Modules\Extranet\Jobs\User\Session\SessionTokenLink;
use Modules\Extranet\Services\TokenLogin\Veos\LoginToken;
use Modules\Extranet\Services\TokenLogin\Connectors\Interfaces\TokenLoginConnectorInterface;
use Session;

class TheoremeConnector implements TokenLoginConnectorInterface
{
    /**
     * __construct.
     *
     * @param mixed $token
     * @param mixed $caller
     *
     * @return void
     */
    public function __construct($token)
    {
        $this->token = $token;
        $this->test = isset($params['test']) && $params['test'] == 1 ? true : false;
        $this->env = request()->get('env') ? request()->get('env') : VeosWsUrl::PROD;
    }

    /**
     * handle.
     *
     * @return void
     */
    public function handle()
    {
        
        $obj = json_decode(base64_decode(str_replace('_', '/', str_replace('-', '+', explode('.', $this->token)[1]))));

        // Open VEOS session and return token
        $veosToken = dispatch_now(new LoginToken($obj->login));

        $payload = [
            'env' => $this->env,
            'test' => $this->test,
            'token' => $this->token,
            'id_per' => $obj->idPer,
            'token' => $veosToken,
            'exp' => $obj->exp,
            'role' => ROLE_ANONYMOUS,
            'supervue' => false,
            'firstname' => '',
            'lastname' => '',
            'language' => $obj->language,
            'jailed' => true,
        ];

        Session::put('user', json_encode($payload));

        return $payload;
    }

    /**
     * setToken.
     *
     * @param mixed $token
     *
     * @return void
     */
    public function setToken($token)
    {
        $this->token = $token;
    }
}
