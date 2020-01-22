<?php

namespace Modules\Extranet\Services\RolesPermissions\Exceptions;

use InvalidArgumentException;

class RoleDoesNotExistException extends InvalidArgumentException
{
    public static function create(string $name)
    {
        return new static("Role `{$name}` does not exist.");
    }
}
