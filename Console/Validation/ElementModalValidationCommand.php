<?php

namespace Modules\Extranet\Console\Validation;

use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;

use Modules\Extranet\Entities\Element;
use Modules\Extranet\Tasks\Elements\ValidateElementFieldModalParameters;

class ElementModalValidationCommand extends Command
{
    /**
     * The console command name.
     *
     * @var string
     */
    protected $name = 'extranet:check-config-modal-element';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check if elements modal has errors';

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
        foreach(Element::all() as $element) {          
            foreach($element->fields as $field) {
                $isValid = (new ValidateElementFieldModalParameters($field))->run();

                $field->update([
                    'errors' => !$isValid ? json_encode([
                        'type' => 'modalRoute',
                    ]) : null
                ]);
            }
        }
    }

}
