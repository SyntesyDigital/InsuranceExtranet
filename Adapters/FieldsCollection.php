<?php

namespace Modules\Extranet\Adapters;

use Illuminate\Database\Eloquent\Collection;
use App;

class FieldsCollection extends Collection
{
    public function getValue($name, $locale = null)
    {
        $locale = $locale ? $locale : App::getLocale();
        $field = $this->get($name);

        if($field) {
            if(is_array($field->value)) {
                return isset($field->value[$locale]) ? $field->value[$locale] : null;
            }

            return $field->value;
        }

        return null;
    }
}
