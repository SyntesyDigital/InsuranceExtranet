<?php

namespace Modules\Extranet\Services\TokenLogin\Connectors;

class TokenLoginConnectorHandler
{
    public $connector;

    public function __construct($token, $provider)
    {
        $connector = isset(config('services:tokenlogin.providers')[$provider])
            ? config('services:tokenlogin.providers')[$provider]
            : null;

        if (!$connector) {
            return false;
        }

        $this->connector = new $connector($token);
    }

    public function handle()
    {
        if (!$this->connector) {
            return false;
        }

        return $this->connector->handle();
    }
}
