<?php

namespace Modules\Extranet\Services\TokenLogin\Connectors\Veos;

use Exception;
use Illuminate\Http\Request;
use Modules\Extranet\Jobs\User\Session\SessionTokenLink;
use Modules\Extranet\Jobs\User\SessionCreate;
use Modules\Extranet\Services\TokenLogin\Connectors\Interfaces\TokenLoginConnectorInterface;

class VeosConnector implements TokenLoginConnectorInterface
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
    }

    /**
     * handle.
     *
     * @return void
     */
    public function handle()
    {
        $params = [];
        $request = request();

        if ($request->get('display_mode')) {
            $params['display_mode'] = $request->get('display_mode');
        }

        if ($request->get('jailed')) {
            $params['jailed'] = 1;
            $params['display_mode'] = 'jailed';
        }

        $params['env'] = $request->get('env') ? $request->get('env') : null;

        $obj = json_decode(base64_decode(str_replace('_', '/', str_replace('-', '+', explode('.', $this->token)[1]))));

        if (isset($obj->sub)) {
            if ($obj->sub == 'Token Auth' && isset($obj->idPer)) {
                if ($obj->exp < time()) {
                    throw new Exception('Token expired', 800);
                }

                return dispatch_now(new SessionTokenLink($this->token, $params));
            }
        }

        return dispatch_now(new SessionCreate($this->token, null, $params));
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
