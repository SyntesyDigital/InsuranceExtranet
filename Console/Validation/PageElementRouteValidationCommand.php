<?php

namespace Modules\Extranet\Console\Validation;

use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;

use Modules\Extranet\Entities\ElementField;
use Modules\Extranet\Tasks\Elements\ValidateElementFieldPageRouteParameters;
use Modules\Extranet\Entities\Errors\ElementFieldPageRouteParametersError;

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
        foreach(ElementField::all() as $field) {
            $isValid = (new ValidateElementFieldPageRouteParameters($field))->run();

            if(!$isValid) {
                $field->addError(ElementFieldPageRouteParametersError::class);
            } else {
                $field->removeError(ElementFieldPageRouteParametersError::class);
            }
        }
    }
}
