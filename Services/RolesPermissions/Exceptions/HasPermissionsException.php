<?php

namespace Modules\Extranet\Services\RolesPermissions\Traits;

use Modules\Extranet\Services\RolesPermissions\Entities\Permission;
use Modules\Extranet\Services\RolesPermissions\Entities\Role;

trait HasPermissionsException
{
    public function permissions()
    {
        return $this->belongsToMany(Permission::class, 'users_permissions');
    }

    public function hasPermission($identifier)
    {
        $count = $this->roles->filter(function ($role) use ($identifier) {
            return $role->hasPermission($identifier);
        })->count();

        $count += $this->permissions->where('identifier', $identifier)->count();

        return $count > 0 ? true : false;
    }

    public function addPermission($identifier)
    {
    }

    public function removePermission($identifier)
    {
    }

    /**
     * Retrive permission by his identifier.
     *
     * @param string $role
     *
     * @return Role
     */
    private function getPermissionByIdentifier($permission)
    {
        if (!is_object($permission)) {
            $permission = Permission::where('identifier', $permission)->first();

            if (!$permission) {
                throw new RoleDoesNotExist();
            }
        }

        if (!is_a($role, Role::class)) {
            throw new RoleIsBadObject();
        }

        return $role;
    }
}
