<?php

namespace Modules\Extranet\Services\RolesPermissions\Providers;

use Illuminate\Support\ServiceProvider;
use Modules\Extranet\Services\RolesPermissions\Middleware\HasAbilitiesRoute;
use Modules\Extranet\Services\RolesPermissions\Middleware\Permissions;
use Modules\Extranet\Services\RolesPermissions\Middleware\Roles;
use Modules\Extranet\Services\RolesPermissions\Services\RolesPermissionsService;

class RolesPermissionsProvider extends ServiceProvider
{
    protected $helpers = [
        'HasAbilitiesHelper',
        'HasNotAbilitiesHelper',
        'HasPermission',
        'HasRoles',
    ];
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
        $this->loadBladeHelpers();
    }

    public function loadBladeHelpers()
    {
        foreach ($this->helpers as $helper) {
            $helperPath = __DIR__.'/../Helpers/'.$helper.'.php';

            if (\File::isFile($helperPath)) {
                $className = str_replace('.php', '', basename($helperPath));

                require_once $helperPath;

                $class = 'Modules\\Extranet\\Services\\RolesPermissions\\Helpers\\'.$className;

                if (class_exists($class)) {
                    new $class();
                }
            }
        }
    }

    /**
     * Register service middlewares.
     *
     * @return void
     */
    public function registerMiddlewares()
    {
        $this->app['router']->aliasMiddleware('permissions', Permissions::class);
        $this->app['router']->aliasMiddleware('roles', Roles::class);
        //$this->app['router']->aliasMiddleware('abilities', HasAbilitiesRoute::class);
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

    /**
     * register.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton('Services/RolesPermissions', function ($app) {
            return new RolesPermissionsService($app);
        });
    }
}
