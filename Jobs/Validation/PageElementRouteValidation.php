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
use Modules\Extranet\Entities\Errors\ElementFieldPageRouteParametersError;

class PageElementRouteValidation implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $page;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Page $page)
    {
        $this->page = $page;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $nodes = json_decode($this->page->definition, true);
        
        $elements = $this->getElements($nodes);

        foreach($elements as $element) {
            
            foreach($element->fields as $field) {
                $isValid = (new ValidateElementFieldPageRouteParameters($field))->run();

                if(!$isValid) {
                    $field->addError(ElementFieldPageRouteParametersError::class);
                } else {
                    $field->removeError(ElementFieldPageRouteParametersError::class);
                }
            }
        }
    }

    public function getElements(&$nodes, &$elements = []) 
    {
        if($nodes) {
            foreach ($nodes as $key => $node) {
                if(isset($node['children'])) {
                    $this->getElements($node['children'], $elements);
                } else {
                    $field = isset($node['field']) ? $node['field'] : null;

                    if($field) {
                        $class = isset($field['class']) 
                            ? collect(explode('\\', $field['class']))->last() 
                            : null;

                        if($class == "ElementTable") {
                            $settings = $field['settings'];

                            $element = isset($settings["tableElements"]) 
                                ? Element::find($settings["tableElements"]) 
                                : null;

                            if($element) {
                                $elements[] = $element;
                            }
                        }
                    }
                }
            }
        }

        return $elements;
    }

}
