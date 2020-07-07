<?php

namespace Modules\Extranet\Services\RolesPermissions\Traits;

use Modules\Extranet\Services\RolesPermissions\Entities\Permission;
use Modules\Extranet\Services\RolesPermissions\Entities\Role;
use Modules\Extranet\Services\RolesPermissions\Exceptions\PermissionDoesNotExistException;

trait HasPermissions
{
    /**
     * permissions.
     *
     * @return void
     */
    public function permissions()
    {
        return $this->belongsToMany(Permission::class, 'users_permissions', 'user_id', 'permission_id')->withPivot('enabled');
    }

    /**
     * getPermissions.
     *
     * @return void
     */
    public function getPermissions()
    {
        $permissions = collect();

        foreach ($this->roles()->get() as $role) {
            foreach ($role->permissions as $permission) {
                $permissions->push($permission);
            }
        }

        foreach ($this->permissions()->get() as $permission) {
            if ($permission->pivot->enabled) {
                if (!$permissions->contains('id', $permission->id)) {
                    $permissions->push($permission);
                }
            } else {
                if ($permissions->contains('id', $permission->id)) {
                    $permissions = $permissions->reject(function ($item, $key) use ($permission) {
                        return $item->id == $permission->id;
                    });
                }
            }
        }

        return $permissions;
    }

    /**
     * Check if user has permission
     * Disabled/Enabled permission are prioritary.
     *
     * @param mixed $identifier
     *
     * @return void
     */
    public function hasPermission($identifier)
    {
        $permission = $this->getPermissionByIdentifier($identifier);

        if ($this->isDisabledPermission($permission->identifier)) {
            return false;
        }

        if ($this->isEnabledPermission($permission->identifier)) {
            return true;
        }

        return $this->roles()->get()->filter(function ($role) use ($permission) {
            return $role->hasPermission($permission->identifier);
        })->isNotEmpty();
    }

    /**
     * Check if user has permissions.
     *
     * @param mixed $identifiers
     *
     * @return bool
     */
    public function hasPermissions($identifiers)
    {
        $satisfy = false;
        foreach ($identifiers as $identifier) {
            if ($this->hasPermission($identifier)) {
                $satisfy = true;
            }
        }

        return $satisfy;
    }

    /**
     * Return if this permission is disabled.
     *
     * @param mixed $identifier
     *
     * @return void
     */
    public function isDisabledPermission($identifier)
    {
        return $this->permissions()
            ->where('identifier', $identifier)
            ->where('enabled', 0)
            ->get()
            ->isNotEmpty();
    }

    /**
     * Return if this permission is enabled.
     *
     * @param mixed $identifier
     *
     * @return void
     */
    public function isEnabledPermission($identifier)
    {
        return $this->permissions()
            ->where('identifier', $identifier)
            ->where('enabled', 1)
            ->get()
            ->isNotEmpty();
    }

    /**
     * Save Enabled/Disabled permission.
     *
     * @param mixed $permission
     * @param mixed $enabled
     *
     * @return void
     */
    public function savePermission($permission, $enabled = 1)
    {
        $permission = $this->getPermissionByIdentifier($permission);

        $this->permissions()->detach($permission->id);

        $this->permissions()->attach([
            $permission->id => [
                'enabled' => $enabled,
            ],
        ]);

        $this->load('permissions');
    }

    /**
     * Force enable permission to user.
     *
     * @param mixed(Permission or String) $permission
     *
     * @voir
     */
    public function enablePermission($permission)
    {
        $this->savePermission($permission, 1);
    }

    /**
     * Force disable permission to user.
     *
     * @param mixed(Permission or String) $permission
     *
     * @void
     */
    public function disablePermission($permission)
    {
        $this->savePermission($permission, 0);
    }

    /**
     * Delete permission relationship.
     *
     * @param mixed(Permission or String) $permission
     *
     * @void
     */
    public function deletePermission($identifier)
    {
        $this->permissions()->detach([$permission->id]);
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
                throw new PermissionDoesNotExistException();
            }
        }

        if (!is_a($permission, Permission::class)) {
            throw new PermissionIsBadObjectExceptionException();
        }

        return $permission;
    }
}
