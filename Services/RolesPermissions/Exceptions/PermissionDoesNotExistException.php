<?php

namespace Modules\Extranet\Services\RolesPermissions\Exceptions;

use InvalidArgumentException;

class PermissionDoesNotExistException extends InvalidArgumentException
{
    public static function create(string $name)
    {
        return new static("Permission `{$name}` does not exist.");
    }
}
