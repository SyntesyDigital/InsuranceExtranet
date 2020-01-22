<?php

namespace Modules\Extranet\Services\RolesPermissions\Providers;

use Illuminate\Support\ServiceProvider;
use Modules\Extranet\Services\RolesPermissions\Middleware\HasAbilitiesRoute;

use Auth;

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

        Blade::directive('abilities', function ($expression) {
            // Strip Open and Close Parenthesis
            $expression = substr(substr($expression, 0, -1), 1);

            // Split variable and its value
            list($variable, $value) = explode('\',', $expression, 2);

            // Ensure variable has no spaces or apostrophes
            $variable = trim(str_replace('\'', '', $variable));

            
        });
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
