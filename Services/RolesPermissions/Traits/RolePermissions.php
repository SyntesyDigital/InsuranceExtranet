<?php

namespace Modules\Extranet\Services\RolesPermissions\Traits;

use Modules\Extranet\Services\RolesPermissions\Entities\Permission;
use Modules\Extranet\Services\RolesPermissions\Exceptions\PermissionIsBadObjectException;
use Modules\Extranet\Services\RolesPermissions\Exceptions\PermissionDoesNotExistException;

trait RolePermissions
{
    /**
     * Check if role has permission.
     *
     * @param mixed $identifier
     *
     * @return bool
     */
    public function hasPermission($permission)
    {
        $permission = $this->getPermissionByIdentifier($permission);

        return $this->permissions->where('identifier', $permission->identifier)->isNotEmpty();
    }

    /**
     * Return if role a all this permissions.
     *
     * @return bool
     */
    public function hasPermissions(array $identifiers)
    {
        return $this->roles->whereIn('identifier', $identifiers)->count() == sizeof($permissions) ? true : false;
    }

    /**
     * Add permission to role.
     *
     * @param mixed $permission
     *
     * @return void
     */
    public function addPermission($permission)
    {
        $this->permissions()->attach([
            $this->getPermissionByIdentifier($permission)->id,
        ]);

        $this->load('permissions');
    }

    /**
     * Remove permission to role.
     *
     * @param mixed $permission
     *
     * @return void
     */
    public function removePermission($permission)
    {
        $this->permissions()->detach([
            $this->getPermissionByIdentifier($permission)->id,
        ]);

        $this->load('permissions');
    }

    /**
     * Return all permissions.
     *
     * @return void
     */
    public function getPermissions()
    {
        return $this->permissions;
    }

    /**
     * Retrive permission by his identifier.
     *
     * @param string $permission
     *
     * @return Permission
     */
    private function getPermissionByIdentifier($permission)
    {
        if (!is_object($permission)) {
            $permission = Permission::where('identifier', $permission)->first();

            if (!$permission) {
                throw new PermissionDoesNotExistException();
            }
        }

        if (!is_a($permission, Permission::class)) {
            throw new PermissionIsBadObjectException();
        }

        return $permission;
    }
}
