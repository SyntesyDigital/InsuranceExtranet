<?php

namespace Modules\Extranet\Services\TokenLogin\Providers;

use Illuminate\Support\ServiceProvider;
use Modules\Extranet\Services\TokenLogin\Middleware\SignInWhenToken;

class TokenLoginProvider extends ServiceProvider
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
        $this->mergeConfigFrom(
            __DIR__.'/../Config/providers.php',
            'services:tokenlogin'
        );

        app('router')->aliasMiddleware('SignInWhenToken', SignInWhenToken::class);
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
