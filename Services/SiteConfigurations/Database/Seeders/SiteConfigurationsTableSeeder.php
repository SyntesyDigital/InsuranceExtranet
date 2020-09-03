<?php

namespace Modules\Extranet\Services\SiteConfigurations\Database\Seeders;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;
use Modules\Extranet\Services\SiteConfigurations\Entities\SiteConfiguration;

class SiteConfigurationsTableSeeder extends Seeder
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
        $this->general = SiteConfiguration::create([
            'identifier' => 'general',
            'icon' => 'fas fa-desktop',
        ]);
    }
}
