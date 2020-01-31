<?php

namespace Modules\Extranet\Services\RolesPermissions\Providers;

use Blade;
use Illuminate\Support\ServiceProvider;
use Modules\Extranet\Services\RolesPermissions\Middleware\HasAbilitiesRoute;
use Auth;
class RolesPermissionsProvider extends ServiceProvider
{
    protected $helpers = [
        'HasAbilitiesHelper',
        'HasNotAbilitiesHelper',
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
                $class = 'Modules\\Extranet\\Services\\RolesPermissions\\Helpers\\' . $className;
                new $class();
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
