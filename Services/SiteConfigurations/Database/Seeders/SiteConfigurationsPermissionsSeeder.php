<?php

namespace Modules\Extranet\Services\SiteConfigurations\Database\Seeders;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;
use Modules\Extranet\Services\RolesPermissions\Entities\Permission;
use Modules\Extranet\Services\RolesPermissions\Entities\PermissionGroup;
use Modules\Extranet\Services\RolesPermissions\Entities\Role;

class SiteConfigurationsPermissionsSeeder extends Seeder
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

        $this->system = Role::where('identifier', 'ROLE_SYSTEM')->first();

        $this->superAdmin = Role::where('identifier', 'ROLE_SUPERADMIN')->first();

        $this->admin = Role::where('identifier', 'ROLE_ADMIN')->first();

        $this->createPermissions([
            'siteConfigurations' => 'Site Configurations',
            'siteConfigurations.edit' => 'Site Configurations edit',
        ], PermissionGroup::create([
            'name' => 'Site Configurations',
            'identifier' => 'siteConfigurations',
        ]));

        $this->superAdmin->addPermission('siteConfigurations');
        $this->superAdmin->addPermission('siteConfigurations.edit');

        $this->admin->addPermission('siteConfigurations');
        $this->admin->addPermission('siteConfigurations.edit');
    }

    public function createPermissions($permissions, $group)
    {
        foreach ($permissions as $k => $v) {
            $this->permissions[$v] = Permission::create([
                'name' => $v,
                'identifier' => $k,
                'group_id' => $group->id,
            ]);

            $this->system->addPermission($k);
        }
    }
}
