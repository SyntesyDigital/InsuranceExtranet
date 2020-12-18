<?php

namespace Modules\Extranet\Tasks\Elements;

use Modules\Extranet\Entities\Element;
use Modules\Architect\Entities\Content;

use ValidateElementFieldModalParameters;

class ValidateElementModalParameters
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
            if(!(new ValidateElementFieldModalParameters($field))->run()) {
                return false;
            }
        }   

        return true;
    }
}
