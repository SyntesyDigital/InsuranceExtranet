<?php

namespace Modules\Extranet\Providers;

use Illuminate\Database\Eloquent\Factory;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;
use Modules\Extranet\Services\Currency\Providers\CurrencyProvider;
use Modules\Extranet\Services\ElementModelLibrary\Providers\ElementModelLibraryProvider;
use Modules\Extranet\Services\ElementTemplate\Providers\ElementTemplateProvider;
use Modules\Extranet\Services\RolesPermissions\Providers\RolesPermissionsProvider;
use Modules\Extranet\Services\SiteConfigurations\Providers\SiteConfigurationsProvider;
use Modules\Extranet\Services\TokenLogin\Providers\TokenLoginProvider;

class ExtranetServiceProvider extends ServiceProvider
{
    /**
     * Indicates if loading of the provider is deferred.
     *
     * @var bool
     */
    protected $defer = false;

    /**
     * Boot the application events.
     */
    public function boot()
    {
        $this->registerTranslations();
        $this->registerConfig();
        $this->registerViews();
        $this->registerFactories();
        $this->loadMigrationsFrom(__DIR__.'/../Database/Migrations');

        $this->app->register(RolesPermissionsProvider::class);
        $this->app->register(ElementModelLibraryProvider::class);
        $this->app->register(ElementTemplateProvider::class);
        $this->app->register(TokenLoginProvider::class);
        $this->app->register(CurrencyProvider::class);
        $this->app->register(SiteConfigurationsProvider::class);

        if (config('app.env') == 'production') {
            \URL::forceScheme('https');
        }

        // Get name views for add class body tag
        View::composer('*', function ($view) {
            View::share('viewName', $view->getName());
        });
    }

    /**
     * Register the service provider.
     */
    public function register()
    {
        foreach (glob(__DIR__.'/../Helpers/*.php') as $filename) {
            require_once $filename;
        }

        $this->commands([
            \Modules\Extranet\Console\Validation\ElementModalValidationCommand::class,
            \Modules\Extranet\Console\Validation\PageElementRouteValidationCommand::class,
        ]);
    }

    /**
     * Register config.
     */
    protected function registerConfig()
    {
        $this->publishes([
            __DIR__.'/../Config/config.php' => config_path('extranet.php'),
        ], 'config');

        $this->mergeConfigFrom(
            __DIR__.'/../Config/config.php',
            'extranet'
        );

        $this->mergeConfigFrom(
            __DIR__.'/../Config/models.php',
            'models'
        );

        $this->mergeConfigFrom(
            __DIR__.'/../Config/version.php',
            'version'
        );

        $this->mergeConfigFrom(
            __DIR__.'/../Config/admin.php',
            'architect::admin'
        );

        $this->mergeConfigFrom(
            __DIR__.'/../Config/settings.php',
            'architect::plugins.settings'
        );

        $this->mergeConfigFrom(
            __DIR__.'/../Config/topbar_menu.php',
            'architect::plugins.topbar.menu'
        );

        $this->mergeConfigFrom(
            __DIR__.'/../Config/lighthouse.php',
            'lighthouse'
        );
    }

    /**
     * Register views.
     */
    public function registerViews()
    {
        $viewPath = resource_path('views/modules/extranet');

        $sourcePath = __DIR__.'/../Resources/views';

        $this->publishes([
            $sourcePath => $viewPath,
        ], 'views');

        $this->loadViewsFrom(array_merge(array_map(function ($path) {
            return $path.'/modules/extranet';
        }, \Config::get('view.paths')), [$sourcePath]), 'extranet');
    }

    /**
     * Register translations.
     */
    public function registerTranslations()
    {
        $langPath = resource_path('lang/modules/extranet');

        if (is_dir($langPath)) {
            $this->loadTranslationsFrom($langPath, 'extranet');
        } else {
            $this->loadTranslationsFrom(__DIR__.'/../Resources/lang', 'extranet');
        }
    }

    /**
     * Register an additional directory of factories.
     */
    public function registerFactories()
    {
        if (!app()->environment('production')) {
            app(Factory::class)->load(__DIR__.'/../Database/factories');
        }
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
