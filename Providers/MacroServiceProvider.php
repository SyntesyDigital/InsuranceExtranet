<?php

namespace Modules\Extranet\Providers;

use Modules\Extranet\Services\MacrosService;
use Collective\Html\HtmlServiceProvider;

/**
 * Class MacroServiceProvider.
 */
class MacroServiceProvider extends HtmlServiceProvider
{
    public function register()
    {
        parent::register();

        $this->app->singleton('form', function ($app) {
            $form = new MacrosService($app['html'], $app['url'], $app['view'], $app['session.store']->token());

            return $form->setSessionStore($app['session.store']);
        });
    }
}
