<?php

namespace Modules\Extranet\Services\TokenLogin\Connectors\April;

use Modules\Extranet\Jobs\User\SessionCreate;
use Modules\Extranet\Services\TokenLogin\Connectors\Interfaces\TokenLoginConnectorInterface;
use Modules\Extranet\Services\TokenLogin\Veos\LoginToken;

class AprilConnector implements TokenLoginConnectorInterface
{
    /**
     * __construct.
     *
     * @param mixed $token
     * @param mixed $caller
     *
     * @return void
     */
    public function __construct($token, $caller = 'AIMM')
    {
        $this->token = $token;
        $this->caller = $caller;
    }

    /**
     * handle.
     *
     * @return void
     */
    public function handle()
    {
        // Query APRIL WS to retrieve user data from token
        $response = dispatch_now(new AprilControleJeton($this->token, $this->caller));

        // Open VEOS session and return token
        $veosToken = dispatch_now(new LoginToken($response->getLogin()));

        // Init user session if VEOS token exist
        return $veosToken
            ? dispatch_now(new SessionCreate($veosToken))
            : null;
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

    /**
     * setCaller.
     *
     * @param mixed $caller
     *
     * @return void
     */
    public function setCaller($caller)
    {
        $this->caller = $caller;
    }
}