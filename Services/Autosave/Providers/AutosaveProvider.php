<?php

namespace Modules\Extranet\Services\Autosave\Providers;

use Illuminate\Support\ServiceProvider;

use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Route;

class AutosaveProvider extends RouteServiceProvider
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
        parent::boot();
    }

    public function map()
    {
        $this->mapWebRoutes();
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

    protected function mapWebRoutes()
    {
        Route::prefix('autosave')
            ->middleware(['web', 'auth:veos-ws', 'permissions:roles'])
            ->namespace('Modules\Extranet\Services\Autosave\Controllers')
            ->group(__DIR__ . '/../Routes/web.php');
    }
}
