<?php

namespace Modules\Extranet\Extensions;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Contracts\Auth\UserProvider;
use Session;
use App\User;

use Modules\Extranet\Repositories\PersonneRepository;

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
        $token = trim(str_replace('Bearer', '', request()->header('Authorization')));;

        $user = User::find(1);
        $user->id_per = 11410303;
        $user->token = $token;
        $user->env = 'PROD';

        return $user;
    }

    public function guest()
    {
    }

    public function user()
    {
        $token = trim(str_replace('Bearer', '', request()->header('Authorization')));;

        $user = new User;
        $user->id_per = 11410303;
        $user->token = $token;
        $user->env = 'prod';

        return $user;
    }

    public function attempt()
    {
    }
}
