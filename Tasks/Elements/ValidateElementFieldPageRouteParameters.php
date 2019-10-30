<?php

namespace Modules\Extranet\Tasks\Elements;

use Modules\Extranet\Entities\ElementField;
use Modules\Architect\Entities\Content;

class ValidateElementFieldPageRouteParameters
{
    public function __construct(ElementField $field)
    {   
        $this->field = $field;
    }

    public function run()
    {
        // Retrieve hasRoute settings array 
        $hasRoute = isset($this->field->settings["hasRoute"]) 
            ? $this->field->settings["hasRoute"] 
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

        return true;
    }
}
