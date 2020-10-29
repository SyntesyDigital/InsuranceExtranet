<?php

namespace Modules\Extranet\Services\ElementTemplate\Fields\Adapters;

use Modules\Architect\Entities\Language;
use Modules\Architect\Entities\Media;
use Modules\Extranet\Services\ElementTemplate\Entities\ElementTemplate;
use Modules\Extranet\Services\ElementTemplate\Entities\ElementTemplateField;
use Modules\Extranet\Entities\ElementField;
use Modules\Architect\Entities\Content;


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
                        if(isset($nodes[$key]['field']['name'])){
                            $nodes[$key]['field']['fieldname'] = $nodes[$key]['field']['name'];
                            $nodes[$key]['field']['value'] = $this->buildPageField($node['field']);
                        }
                    }
                }
            }
        }

        return $nodes;
    }

    private function getLanguageIsoFromId($id)
    {
        $language = Language::getCachedLanguageById($id);

        return $language ? $language->iso : false;
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

            case 'url':
            case 'link':
                $field = $this->elementTemplate->fields->where('name', $fieldName)->first();
                $values = null;

                if($field) {
                    $childs = $this->elementTemplate->getFieldChilds($field);

                    if($childs != null){
                        foreach($childs as $k => $v) {
                            if($v->language_id) {
                                $iso = $this->getLanguageIsoFromId($v->language_id);
                                $values[ explode('.', $v->name)[1] ][$iso] = $v->value;
                            } else {
                                if(explode('.', $v->name)[1] == 'content') {
                                    $content = Content::find($v->value);
                                    $values[ explode('.', $v->name)[1] ] = isset($content) ? 
                                    $content->load('routesParameters') : 
                                    null;
                                }
                            }
                        }
                    }
                }
                return $values;
                break;
        }

        return null;
    }
}
