<?php

namespace Modules\Extranet\Services\RolesPermissions\Exceptions;

use InvalidArgumentException;
use Modules\Extranet\Services\RolesPermissions\Entities\Role;

class RoleIsBadObjectException extends InvalidArgumentException
{
    public static function create()
    {
        return new static('Parameter role must be a '.Role::class.' object');
    }
}
