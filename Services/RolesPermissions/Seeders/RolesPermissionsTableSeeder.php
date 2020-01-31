<?php

namespace Modules\Extranet\Services\RolesPermissions\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

use Modules\Extranet\Services\RolesPermissions\Entities\Permission;
use Modules\Extranet\Services\RolesPermissions\Entities\Role;
use Modules\Extranet\Services\RolesPermissions\Entities\PermissionGroup;

class RolesPermissionsTableSeeder extends Seeder
{

    private $permissions;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        $this->system = Role::create([
            'name' => 'system',
            'identifier' => 'system'
        ]);

        $this->superAdmin = Role::create([
            'name' => 'Super admin',
            'identifier' => 'super-admin'
        ]);

        $this->admin = Role::create([
            'name' => 'admin',
            'identifier' => 'admin'
        ]);

        $this->client = Role::create([
            'name' => 'Client',
            'identifier' => 'client'
        ]);
        
        // Contents
        $this->createPermissions([
            'contents' => 'Contents',
            'contents.create' => 'Contents create',
            'contents.publish' => 'Contents publish',
            'contents.edit' => 'Contents edit',
            'contents.remove' => 'Contents remove',
        ], PermissionGroup::create([
            'name' => 'Contents'
        ]));

        // Settings
        $this->createPermissions([
            'settings' => 'settings',
        ], PermissionGroup::create([
            'name' => 'Settings'
        ]));

        // Styles
        $this->createPermissions([
            'styles' => 'Styles',
            'styles.edit' => 'Style edit',
        ], PermissionGroup::create([
            'name' => 'Styles'
        ]));

        // Users
        $this->createPermissions([
            'users' => 'Users',
            'users.create' => 'Users create',
            'users.edit_roles' => 'Users edit roles',
            'users.edit_permissions' => 'Users edit_permissions',
        ], PermissionGroup::create([
            'name' => 'Users'
        ]));

        // roles
        $this->createPermissions([
            'roles' => 'Roles',
            'roles.create' => 'Roles create',
            'roles.edit' => 'Roles edit',
            'roles.remove' => 'Roles remove',
        ], PermissionGroup::create([
            'name' => 'Roles'
        ]));

        // permissions
        $this->createPermissions([
            'permissions' => 'Permissions',
            'permissions.create' => 'Permissions create',
            'permissions.edit' => 'Permissions edit',
            'permissions.remove' => 'Permissions remove',
        ], PermissionGroup::create([
            'name' => 'Permissions'
        ]));

        // Page layout
        $this->createPermissions([
            'page_layouts' => 'Page layout',
            'page_layouts.create' => 'Page layout create',
            'page_layouts.remove' => 'Page layout remove',
        ], PermissionGroup::create([
            'name' => 'Page layout'
        ]));

        // Menu
        $this->createPermissions([
            'menu' => 'Menu',
            'menu.edit' => 'Menu edit',
            'menu.create' => 'Menu create',
            'menu.remove' => 'Menu remove',
        ], PermissionGroup::create([
            'name' => 'Menu'
        ]));

        // Element model
        $this->createPermissions([
            'element_models' => 'Element model',
            'element_models.edit' => 'Element model edit',
            'element_models.create' => 'Element model create',
            'element_models.remove' => 'Element model remove',
        ], PermissionGroup::create([
            'name' => 'Element model'
        ]));

        // Elements
        $this->createPermissions([
            'elements' => 'Elements',
            'elements.edit' => 'Elements edit',
            'elements.create' => 'Elements create',
            'elements.remove' => 'Elements remove',
        ], PermissionGroup::create([
            'name' => 'Elements'
        ]));

        // Parameters
        $this->createPermissions([
            'parameters' => 'Parameters',
        ], PermissionGroup::create([
            'name' => 'Parameters'
        ]));

        // Parameters
        $this->createPermissions([
            'services' => 'Services',
        ], PermissionGroup::create([
            'name' => 'Services'
        ]));

        // Parameters
        $this->createPermissions([
            'architect_api.get' => 'API Architect',
        ], PermissionGroup::create([
            'name' => 'Architect'
        ]));


        $this->superAdmin->addPermission('contents');
        $this->superAdmin->addPermission('contents.edit');
        $this->superAdmin->addPermission('settings');
        $this->superAdmin->addPermission('styles.edit');
        $this->superAdmin->addPermission('users');
        $this->superAdmin->addPermission('users.create');
        $this->superAdmin->addPermission('users.edit_roles');
        $this->superAdmin->addPermission('users.edit_permissions');
        $this->superAdmin->addPermission('permissions');
        $this->superAdmin->addPermission('permissions.create');
        $this->superAdmin->addPermission('menu');
        $this->superAdmin->addPermission('menu.create');
        $this->superAdmin->addPermission('menu.edit');
        $this->superAdmin->addPermission('menu.remove');
        $this->superAdmin->addPermission('elements');
        $this->superAdmin->addPermission('elements.create');
        $this->superAdmin->addPermission('elements.edit');
        $this->superAdmin->addPermission('architect_api.get');

        $this->admin->addPermission('settings');
        $this->admin->addPermission('styles.edit');
        $this->admin->addPermission('architect_api.get');

        $this->client->addPermission('architect_api.get');
    }


    public function createPermissions($permissions, $group)
    {
        foreach($permissions as $k => $v) {
            $this->permissions[$v] = Permission::create([
                'name' => $v,
                'identifier' => $k,
                'group_id' => $group->id
            ]);

            $this->system->addPermission($k);
        }
    }
}
