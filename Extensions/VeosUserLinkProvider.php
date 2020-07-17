<?php

namespace Modules\Extranet\Extensions;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Contracts\Auth\UserProvider;
use Modules\Extranet\Entities\User;
use Session;

class VeosUserLinkProvider implements UserProvider
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
        $user = Session::get('user');
        $user = $user ? json_decode(Session::get('user')) : null;

        if ($user) {
            if (isset($user->exp) && $user->exp < time()) {
                header('Location: '.route('error.expired-token'));
                exit();
            }
        }

        return $user;
    }

    public function session()
    {
        return $this->user();
    }

    public function attempt()
    {
    }
}
