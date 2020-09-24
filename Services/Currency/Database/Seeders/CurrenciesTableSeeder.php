<?php

namespace Modules\Extranet\Services\Currency\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

use Modules\Extranet\Services\RolesPermissions\Entities\Permission;
use Modules\Extranet\Services\RolesPermissions\Entities\Role;
use Modules\Extranet\Services\RolesPermissions\Entities\PermissionGroup;
use Modules\Extranet\Services\Currency\Entities\Currency;

class CurrenciesTableSeeder extends Seeder
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

        $this->euro = Currency::create([
            'code' => 'eur',
            'label' => 'Euro',
            'symbole' => '€', 
            'symbole_position' => Currency::RIGHT_SYMBOLE_POSITION,
            'decimals' => 2,
            'decimals_separator' => ',',
            'thousands_separator' => '.',
            'default' => 1
        ]);

        $this->superAdmin =  Role::where('identifier','ROLE_SUPERADMIN')->first();
        $this->system =  Role::where('identifier','ROLE_SYSTEM')->first();

        // Currencies
        $this->createPermissions([
            'currencies' => 'Currencies',
            'currencies.create' => 'Currencies create',
            'currencies.edit' => 'Currencies edit',
            'currencies.remove' => 'Currencies remove'
        ], PermissionGroup::create([
            'name' => 'Currencies',
            'identifier' => 'currencies'
        ]));

        $this->superAdmin->addPermission('currencies');
        $this->superAdmin->addPermission('currencies.edit');
        $this->superAdmin->addPermission('currencies.remove');
        $this->superAdmin->addPermission('currencies.create');

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
