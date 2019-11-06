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
            $pageRoutesParameters = collect($page->getRouteParametersWithSettings())->filter(function($param){
                return (isset($param['required'])) && $param['required'] === true ? $param['identifier'] : false;
            })->toArray();

            // Build element parameters
            $elementRoutesParameters = [];
            foreach($hasRoute["params"] as $param) {
                $elementRoutesParameters[$param["identifier"]] = $param["value"];
            }

            foreach($pageRoutesParameters as $k => $arr) {
                if(!isset($elementRoutesParameters[$k])) {
                    return false;                   
                }

                if(!$elementRoutesParameters[$k]) {
                    return false;
                }
            }
        }

        return true;
    }
}
