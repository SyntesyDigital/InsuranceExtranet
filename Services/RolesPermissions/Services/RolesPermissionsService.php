<?php

namespace Modules\Extranet\Services\RolesPermissions\Services;

use Modules\Extranet\Services\RolesPermissions\Entities\Role;

class RolesPermissionsService
{
    public function __construct($app)
    {
        $this->app = $app;
    }

    /**
     * getRolePermissions.
     *
     * @param mixed $identifier
     *
     * @return void
     */
    public function getRolePermissions($identifier)
    {
        $role = Role::where('identifier', $identifier)->first();

        return $role ? $role->permissions : [];
    }

    /**
     * getPermissionsFromRoleId.
     *
     * @param mixed $roleId
     *
     * @return void
     */
    public function getPermissionsFromRoleId($roleId)
    {
        switch ($roleId) {
            case ROLE_SUPERADMIN:
                $identifier = 'superadmin';

                // no break
            case ROLE_SYSTEM:
                $identifier = 'system';

                // no break
            case ROLE_ADMIN:
                $identifier = 'admin';

                // no break
            case ROLE_USER:
                $identifier = 'user';
        }

        $role = $identifier
            ? Role::where('identifier', $identifier)->first()
            : null;

        return $role ? $role->permissions : [];
    }
}
