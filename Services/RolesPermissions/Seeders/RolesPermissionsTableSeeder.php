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
            'identifier' => 'ROLE_SYSTEM',
            'icon' => 'fas fa-user-secret'
        ]);

        $this->superAdmin = Role::create([
            'name' => 'Super admin',
            'identifier' => 'ROLE_SUPERADMIN',
            'icon' => 'fas fa-user-cog'
        ]);

        $this->admin = Role::create([
            'name' => 'admin',
            'identifier' => 'ROLE_ADMIN',
            'icon' => 'fas fa-user-shield'
        ]);

        $this->client = Role::create([
            'name' => 'Client',
            'identifier' => 'ROLE_USER',
            'icon' => 'fas fa-users',
            'default' => 1
        ]);
        
        // Contents
        $this->createPermissions([
            'contents' => 'Contents',
            'contents.create' => 'Contents create',
            'contents.publish' => 'Contents publish',
            'contents.edit' => 'Contents edit',
            'contents.remove' => 'Contents remove',
        ], PermissionGroup::create([
            'name' => 'Contents',
            'identifier' => 'contents'
        ]));

        // Medias
        $this->createPermissions([
            'medias' => 'Medias',
            'medias.create' => 'Medias create',
            'medias.edit' => 'Medias edit',
            'medias.remove' => 'Medias remove',
        ], PermissionGroup::create([
            'name' => 'Medias',
            'identifier' => 'medias'
        ]));

        // Settings
        $this->createPermissions([
            'settings' => 'settings',
        ], PermissionGroup::create([
            'name' => 'Settings',
            'identifier' => 'settings'
        ]));

        // Styles
        $this->createPermissions([
            'styles' => 'Styles',
            'styles.edit' => 'Style edit',
        ], PermissionGroup::create([
            'name' => 'Styles',
            'identifier' => 'styles'
        ]));

        // Users
        $this->createPermissions([
            'users' => 'Users',
            'users.create' => 'Users create',
            'users.edit_roles' => 'Users edit roles',
            'users.edit_permissions' => 'Users edit_permissions',
        ], PermissionGroup::create([
            'name' => 'Users',
            'identifier' => 'users'
        ]));

        // roles
        $this->createPermissions([
            'roles' => 'Roles',
            'roles.create' => 'Roles create',
            'roles.edit' => 'Roles edit',
            'roles.remove' => 'Roles remove',
        ], PermissionGroup::create([
            'name' => 'Roles',
            'identifier' => 'roles'
        ]));

        // permissions
        $this->createPermissions([
            'permissions' => 'Permissions',
            'permissions.create' => 'Permissions create',
            'permissions.edit' => 'Permissions edit',
            'permissions.remove' => 'Permissions remove',
        ], PermissionGroup::create([
            'name' => 'Permissions',
            'identifier' => 'permissions'
        ]));

        // Page layout
        $this->createPermissions([
            'page_layouts' => 'Page layout',
            'page_layouts.create' => 'Page layout create',
            'page_layouts.remove' => 'Page layout remove',
        ], PermissionGroup::create([
            'name' => 'Page layout',
            'identifier' => 'layout'
        ]));

        // Menu
        $this->createPermissions([
            'menu' => 'Menu',
            'menu.edit' => 'Menu edit',
            'menu.create' => 'Menu create',
            'menu.remove' => 'Menu remove',
        ], PermissionGroup::create([
            'name' => 'Menu',
            'identifier' => 'menu'
        ]));

        // Element model
        $this->createPermissions([
            'element_models' => 'Element model',
            'element_models.edit' => 'Element model edit',
            'element_models.create' => 'Element model create',
            'element_models.remove' => 'Element model remove',
        ], PermissionGroup::create([
            'name' => 'Element model',
            'identifier' => 'element_model'
        ]));

        // Elements
        $this->createPermissions([
            'elements' => 'Elements',
            'elements.edit' => 'Elements edit',
            'elements.create' => 'Elements create',
            'elements.remove' => 'Elements remove',
        ], PermissionGroup::create([
            'name' => 'Elements',
            'identifier' => 'elements'
        ]));

        // Parameters
        $this->createPermissions([
            'parameters' => 'Parameters',
        ], PermissionGroup::create([
            'name' => 'Parameters',
            'identifier' => 'parameters'
        ]));

        // Parameters
        $this->createPermissions([
            'services' => 'Services',
        ], PermissionGroup::create([
            'name' => 'Services',
            'identifier' => 'services'
        ]));

        $this->createPermissions([
            'dashboard' => 'Dashboard',
        ], PermissionGroup::create([
            'name' => 'Dashboard',
            'identifier' => 'dashboard'
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
        $this->superAdmin->addPermission('dashboard');
        $this->superAdmin->addPermission('medias');
        $this->superAdmin->addPermission('medias.create');
        $this->superAdmin->addPermission('medias.edit');
        $this->superAdmin->addPermission('medias.remove');
        

        $this->admin->addPermission('settings');
        $this->admin->addPermission('styles.edit');
        $this->admin->addPermission('architect_api.get');
        $this->admin->addPermission('dashboard');
        $this->client->addPermission('architect_api.get');
        $this->superAdmin->addPermission('medias');
        $this->superAdmin->addPermission('medias.create');
        $this->superAdmin->addPermission('medias.edit');
        $this->superAdmin->addPermission('medias.remove');
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
