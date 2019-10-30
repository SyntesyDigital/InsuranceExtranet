<?php

namespace Modules\Extranet\Tasks\Elements;

use Modules\Extranet\Entities\Element;
use Modules\Architect\Entities\Content;

class ValidateElementRouteParameters
{
    public function __construct(Element $element)
    {   
        $this->element = $element;
    }

    public function run()
    {
        // Lazy load for optimize queries
        $this->element->load('fields');

        foreach($this->element->fields as $field) {

            // Retrieve hasRoute settings array 
            $hasRoute = isset($field->settings["hasRoute"]) 
                ? $field->settings["hasRoute"] 
                : null;

            // Retrieve page entity
            $page = isset($hasRoute["id"]) 
                ? Content::find($hasRoute["id"])
                : null;

            if($page) {
                // Lazy loading page routes parameters
                $page->load('routesParameters');

                // Build route parameters id array
                $pageRoutesParameters = $page->routesParameters->pluck('id')->toArray();
                $elementRoutesParameters = collect($hasRoute["params"])->pluck('id')->toArray();

                // If array are different, 
                if(!empty(array_diff($pageRoutesParameters, $elementRoutesParameters))) {
                    return false;
                }
            }

        }   

        return true;
    }
}
