<?php

namespace Modules\Extranet\Services\TokenLogin\Connectors\Veos;

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
        return dispatch_now(new SessionCreate($this->token));
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
