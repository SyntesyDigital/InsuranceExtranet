<?php

namespace Modules\Extranet\Services\TokenLogin\Connectors\April;

use Modules\Extranet\Services\TokenLogin\Connectors\Interfaces\ResponseAdapterInterface;

class AprilResponseAdapter implements ResponseAdapterInterface
{
    public function __construct($payload)
    {
        $this->payload = $payload;
        $this->login = $payload->Email;
    }

    public function getLogin()
    {
        return $this->login;
    }
}
