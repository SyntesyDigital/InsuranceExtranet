<?php

namespace Modules\Extranet\Services\RolesPermissions\Exceptions;

use InvalidArgumentException;
use Modules\Extranet\Services\RolesPermissions\Entities\Permission;

class PermissionIsBadObjectException extends InvalidArgumentException
{
    public static function create()
    {
        return new static('Parameter permission must be a '.Permission::class.' object');
    }
}
