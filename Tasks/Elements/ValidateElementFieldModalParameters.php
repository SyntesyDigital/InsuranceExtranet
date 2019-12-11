<?php

namespace Modules\Extranet\Tasks\Elements;

use Modules\Extranet\Entities\Element;
use Modules\Extranet\Entities\ElementField;

class ValidateElementFieldModalParameters
{
    public function __construct(ElementField $field)
    {
        $this->field = $field;
    }

    public function run()
    {
        // Retrieve hasRoute settings array
        $hasModal = isset($this->field->settings["hasModal"])
            ? $this->field->settings["hasModal"]
            : null;

        // Retrieve Element entity
        $element = isset($hasModal["id"])
            ? Element::find($hasModal["id"])
            : null;

        if($element) {

            // Build route parameters id array
            /*
            $elementParameters = collect($element->getParameters())->filter(function($param){
                return (isset($param['settings']->required)) && $param['settings']->required === true
                    ? $param['identifier']
                    : false;
            })->toArray();
            */
            $elementParameters = [];
            foreach($element->getParameters() as $param){
              if((isset($param['settings']->required)) && $param['settings']->required === true)
                $elementParameters[] = $param['identifier'];
            }

            // Build element parameters
            $modalParameters = [];
            foreach($hasModal["params"] as $param) {
                if(isset($param['value']))
                $modalParameters[] = $param["identifier"];
            }

            foreach($elementParameters as $v) {

                if(!in_array($v,$modalParameters)){
                  return false;
                }
            }
        }

        return true;
    }
}
