<?php

namespace Modules\Extranet\Jobs\Validation;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

use Modules\Architect\Entities\Page;
use Modules\Extranet\Entities\Element;
use Modules\Extranet\Tasks\Elements\ValidateElementFieldPageRouteParameters;

class ElementsPageRouteValidation implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct()
    {}

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        foreach(Element::all() as $element) {
            
            foreach($element->fields as $field) {
                $isValid = (new ValidateElementFieldPageRouteParameters($field))->run();

                $field->update([
                    'errors' => !$isValid ? json_encode([
                        'type' => 'pageRoute',
                    ]) : null
                ]);
            }
        }
    }

}
