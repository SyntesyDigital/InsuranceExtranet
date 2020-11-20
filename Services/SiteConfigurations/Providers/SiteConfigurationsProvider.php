<?php

namespace Modules\Extranet\Services\SiteConfigurations\Providers;

use Illuminate\Support\ServiceProvider;

use Schema;

class SiteConfigurationsProvider extends ServiceProvider
{
    /**
     * Indicates if loading of the provider is deferred.
     *
     * @var bool
     */
    protected $defer = false;

    /**
     * Boot the application events.
     *
     * @return void
     */
    public function boot()
    {
        $this->loadMigrationsFrom(__DIR__.'/../Database/Migrations');

        if(Schema::hasTable('site_configurations')){
            $this->mergeConfigFrom(
                __DIR__.'/../Config/SiteConfigurations.php',
                'siteConfigurations'
            );
        }

        foreach (glob(__DIR__.'/../Helpers/*.php') as $filename) {
            require_once $filename;
        }
    }

    /**
     * Get the services provided by the provider.
     *
     * @return array
     */

    /**
     * Register config.
     */
    public function provides()
    {
        return [];
    }
}
