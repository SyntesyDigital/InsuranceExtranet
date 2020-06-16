<?php

namespace Modules\Extranet\Services\TokenLogin\Connectors\April;

use Modules\Extranet\Services\TokenLogin\Connectors\Interfaces\ResponseAdapterInterface;

class ResponseAdapter implements ResponseAdapterInterface
{
    public function __construct($payload)
    {
        $this->payload = $payload;
        $this->login = $payload->IdentifiantUtilisateurConnexion;
    }

    public function getLogin()
    {
        return $this->login;
    }
}
