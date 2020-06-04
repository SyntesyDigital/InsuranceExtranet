<?php

namespace Modules\Extranet\Extensions;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Contracts\Auth\UserProvider;
use Modules\Extranet\Entities\Session as UserSession;
use Modules\Extranet\Entities\User;

class VeosUserTokenProvider implements UserProvider
{
    public function __construct()
    {
    }

    public function retrieveById($identifier)
    {
    }

    public function retrieveByToken($identifier, $token)
    {
    }

    public function updateRememberToken(Authenticatable $user, $token)
    {
    }

    public function retrieveByCredentials(array $credentials)
    {
    }

    public function validateCredentials(Authenticatable $user, array $credentials)
    {
        return $user;
    }

    public function check()
    {
        return $this->user();
    }

    public function guest()
    {
    }

    public function user()
    {
        $token = trim(str_replace('Bearer', '', request()->header('Authorization')));
        $session = UserSession::where('token', $token)->first();

        if (!$session) {
            abort(403);
        }

        return $session->user;
    }

    public function attempt()
    {
    }
}
