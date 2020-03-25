<?php

namespace Modules\Extranet\Services\ElementTemplate\Fields;

use Modules\Extranet\Services\ElementTemplate\Fields\FieldInterface;
use Modules\Extranet\Services\ElementTemplate\Entities\ElementTemplateField;
use Modules\Extranet\Services\ElementTemplate\Entities\ElementTemplate;
use Modules\Architect\Entities\Language;

abstract class Field
{
    public function model()
    {
        return ElementTemplateField::class;
    }

    public function getLanguageFromIso($iso, $languages)
    {
        foreach($languages as $language) {
            if($language->iso == $iso) {
                return $language;
            }
        }
        return false;
    }

    public function save(ElementTemplate $elementTemplate, $identifier, $values, $languages = null)
    {
        $languages = Language::getAllCached();

        $values = !is_array($values) ? [$values] : $values;

        foreach($values as $iso => $value) {
            $language = $this->getLanguageFromIso($iso, $languages);

            $elementTemplate
                ->fields()
                ->save(new ElementTemplateField([
                    'name' => $identifier,
                    'value' => is_array($value) ? json_encode($value) : $value,
                    'language_id' => $language ? $language->id : null
                ]));
        }

        return true;
    }

    public function getType()
    {
        return $this->type;
    }

    public function getName()
    {
        return trans('architect::fields.' . $this->getType());
    }

    public function getIcon()
    {
        return $this->icon;
    }

    public function getRules()
    {
        return $this->rules;
    }

    public function getSettings()
    {
        return $this->settings;
    }
}
?>
