<?php

namespace Modules\Extranet\Console\Validation;

use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;

use Modules\Architect\Entities\Page;
use Modules\Extranet\Jobs\Validation\PageElementRouteValidation;

class PageElementRouteValidationCommand extends Command
{
    /**
     * The console command name.
     *
     * @var string
     */
    protected $name = 'extranet:check-config-page-elements';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check if pages elements has route configuration errors';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        foreach(Page::all() as $page) {
            (new PageElementRouteValidation($page))->handle();
        }
    }

}
