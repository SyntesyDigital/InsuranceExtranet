<?php

namespace Modules\Extranet\Services\TokenLogin\Connectors\Interfaces;

interface TokenLoginConnectorInterface
{
    public function __construct($token);

    public function handle();

    public function setToken($token);
}
