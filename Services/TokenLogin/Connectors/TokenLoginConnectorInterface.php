<?php 

namespace Modules\Extranet\Services\TokenLogin\Connectors;

interface TokenLoginConnectorInterface 
{
    public function handle();
    public function setToken($token);
}