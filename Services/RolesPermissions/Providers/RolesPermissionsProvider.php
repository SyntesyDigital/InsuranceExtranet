<?php

namespace Modules\Extranet\Services\RolesPermissions\Providers;

use Illuminate\Support\ServiceProvider;
use Modules\Extranet\Services\RolesPermissions\Middleware\HasAbilitiesRoute;

class RolesPermissionsProvider extends ServiceProvider
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
        $this->loadMigrationsFrom(__DIR__.'/../Migrations');
        $this->registerMiddlewares();
    }

    /**
     * Register service middlewares.
     *
     * @return void
     */
    public function registerMiddlewares()
    {
        $this->app['router']->aliasMiddleware('abilities', HasAbilitiesRoute::class);
    }

    /**
     * Get the services provided by the provider.
     *
     * @return array
     */
    public function provides()
    {
        return [];
    }
}
