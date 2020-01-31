<?php

namespace Modules\Extranet\Services\RolesPermissions\Tests\Feature;

use Modules\Extranet\Services\RolesPermissions\Tests\TestCase;
use Modules\Extranet\Entities\User;
use Modules\Architect\Entities\Content;

use Modules\Extranet\Services\RolesPermissions\Entities\Permission;
use Modules\Extranet\Services\RolesPermissions\Entities\PermissionGroup;
use Modules\Extranet\Services\RolesPermissions\Entities\Role;

class RolesPermissionsTest extends TestCase
{
    /**
     * Test User/Role.
     *
     * @return void
     */
    public function testUserRoles()
    {
        $user = User::create([
            'id_per' => 1,
        ]);

        $role = Role::create([
            'name' => 'Superadmin',
            'description' => 'Superadmin role',
            'identifier' => 'root',
        ]);

        // Test add one role
        $user->addRole($role->identifier);
        $this->assertTrue($user->roles()->count() ? true : false);

        // Test has role
        $this->assertTrue($user->hasRole($role->identifier));

        // Test has roles
        $this->assertTrue($user->hasRoles([$role->identifier]));

        // Test remove role
        $user->removeRole($role->identifier);
        $this->assertTrue($user->roles()->count() ? false : true);
    }

    /**
     * test Role/Permission.
     *
     * @return void
     */
    public function testRolesPermissions()
    {
        $role = Role::create([
            'name' => 'Superadmin',
            'description' => 'Superadmin role',
            'identifier' => 'root',
        ]);

        $group = PermissionGroup::create([
            'name' => 'Group 1',
            'identifier' => 'group-1',
            'order' => 1
        ]);

        $permission1 = Permission::create([
            'name' => 'Permision 1',
            'description' => 'Permision 1',
            'identifier' => 'permission1',
            'group_id' => $group->id,
        ]);

        // Test add permission to role
        $role->addPermission($permission1);
        $this->assertTrue($role->hasPermission($permission1->identifier));

        // Test to remove permission to role
        $role->removePermission($permission1);
        $this->assertFalse($role->hasPermission($permission1->identifier));
    }

    /**
     * Test User/Permissions.
     *
     * @return void
     */
    public function testUserPermissions()
    {
        $user = User::create([
            'id_per' => 1,
        ]);

        $role = Role::create([
            'name' => 'Superadmin',
            'description' => 'Superadmin role',
            'identifier' => 'root',
        ]);

        $group = PermissionGroup::create([
            'name' => 'Group 1',
            'identifier' => 'group-1',
            'order' => 1
        ]);

        $permission1 = Permission::create([
            'name' => 'Permision 1',
            'description' => 'Permision 1',
            'identifier' => 'permission1',
            'group_id' => $group->id,
        ]);

        $permission2 = Permission::create([
            'name' => 'Permission 2',
            'description' => 'Permision 2',
            'identifier' => 'permission2',
            'group_id' => $group->id,
        ]);

        $permission3 = Permission::create([
            'name' => 'Permission 3',
            'description' => 'Permision 3',
            'identifier' => 'permission3',
            'group_id' => $group->id,
        ]);

        $role->permissions()->sync([$permission1->id, $permission2->id]);

        // Associate role to user
        $user->addRole($role->identifier);

        // Test permission by the role
        $this->assertTrue($user->hasPermission('permission1'));

        $user->enablePermission('permission2');

        // Test add user/permission
        $this->assertSame($user->permissions()->count(), 1);

        // Test disabled permission
        $user->disablePermission('permission2');
        $this->assertFalse($user->hasPermission('permission2'));
    }
}
