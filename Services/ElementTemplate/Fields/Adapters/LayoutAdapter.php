<?php

namespace Modules\Extranet\Services\ElementTemplate\Fields\Adapters;

use Modules\Architect\Entities\Language;
use Modules\Architect\Entities\Media;
use Modules\Extranet\Services\ElementTemplate\Entities\ElementTemplate;
use Modules\Extranet\Services\ElementTemplate\Entities\ElementTemplateField;
use Modules\Extranet\Entities\ElementField;


class LayoutAdapter
{
    public function __construct(ElementTemplate $elementTemplate)
    {
        $this->elementTemplate = $elementTemplate;
        $this->languages = Language::getAllCached();
        $this->elementFields = $this->elementTemplate->element
            ->load('fields')
            ->fields
            ->mapWithKeys(function ($field) {
                return [$field['identifier'] => $field];
            });
    }

    public function get()
    {
        $nodes = json_decode($this->elementTemplate->layout, true);

        $layout = $this->getPage($nodes);
        return $layout;
    }

    public function getPage(&$nodes)
    {
        if (!$nodes) {
            return null;
        }

        foreach ($nodes as $key => $node) {
            if (isset($node['children'])) {
                $nodes[$key]['children'] = $this->getPage($node['children']);
            } else {
                if (isset($node['field'])) {
                    if(isset($node['field']['element_id'])){

                        $field = $node['field'];
                        $elementField = isset($this->elementFields[$field['identifier']])  
                            ? $this->elementFields[$field['identifier']]->toArray() 
                            : null ;

                        $nodes[$key]['field'] = $elementField;
                        $nodes[$key]['field']['fieldname'] = $nodes[$key]['field']['name'];
                    }
                    else {
                        $nodes[$key]['field']['fieldname'] = $nodes[$key]['field']['name'];
                        $nodes[$key]['field']['value'] = $this->buildPageField($node['field']);
                    }
                }
            }
        }

        return $nodes;
    }

    private function buildPageField($field, $name = null)
    {
        $fieldName = isset($field['fieldname']) ? $field['fieldname'] : null;

        if ($name) {
            $fieldName = $name;
        }
        
        switch ($field['type']) {
            case 'richtext':
            case 'text':
                return ElementTemplateField::where('name', $fieldName)
                    ->where('template_id', $this->elementTemplate->id)
                    ->get()
                    ->mapWithKeys(function ($field) {
                        return [$field->language->iso => $field->value];
                    })
                    ->toArray();
            break;

            case 'file':
            case 'image':
                $field = ElementTemplateField::where('name', $fieldName)
                    ->where('template_id', $this->elementTemplate->id)
                    ->first();

                if ($field) {
                    return Media::find($field->value);
                }
            break;

            case 'images':
                return ElementTemplateField::where('name', $fieldName)
                    ->where('template_id', $this->elementTemplate->id)
                    ->get()
                    ->map(function ($field) {
                        return Media::find($field->value);
                    })
                    ->toArray();
                break;

            
            case 'icon':
                $fields = ElementTemplateField::where('name', $fieldName)
                    ->where('template_id', $this->elementTemplate->id)
                    ->first();

                return $fields ? $fields->value : null;
                break;
        }

        return null;
    }
}
