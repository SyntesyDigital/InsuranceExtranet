<?php

namespace Modules\Extranet\Adapters;

use Illuminate\Database\Eloquent\Collection as EloquentCollection;

use Modules\Architect\Entities\Media;
use Modules\Architect\Entities\Content;
use Modules\Architect\Entities\ContentField;
use Modules\Architect\Entities\Page;
use Modules\Architect\Entities\Language;
use Modules\Architect\Fields\FieldConfig;

use Modules\Architect\Transformers\ContentTransformer;
use Modules\Architect\Ressources\ContentCollection;

use Cache;

class PageBuilderAdapter
{
    public function __construct(Content $content, $languages = null)
    {
        $this->content = $content;
        $this->page = $content->page;
        $this->languages = $languages ? $languages : Language::getAllCached();
        $this->loadRelationsFields();
    }

    public function get()
    {
        if(!$this->page) {
            return null;
        }

        $nodes = json_decode($this->page->definition, true);
        return $this->getPage($nodes);
    }

    private function getLanguageIsoFromId($id)
    {
        $language = Language::getCachedLanguageById($id);

        return $language ? $language->iso : false;
    }

    private function loadRelationsFields()
    {
        // Medias
        $mediasId = $this->content->fields->where('relation', 'medias')->pluck('value');
        $this->medias = $mediasId ? Media::whereIn('id', $mediasId)->get() : null;

        // Contents
        $contentsId = $this->content->fields->where('relation', 'contents')->pluck('value');
        $this->contents = $contentsId ? Content::whereIn('id', $contentsId)->get() : null;
    }

    function getPage(&$nodes)
    {
        if($nodes) {
            foreach ($nodes as $key => $node) {
                if(isset($node['children'])) {
                    $nodes[$key]['children'] = $this->getPage($node['children']);
                } else {
                    if(isset($node['field'])) {
                        $nodes[$key]['field']['fieldname'] = $nodes[$key]['field']['name'];
                        //$nodes[$key]['field']['name'] = $node['field']['type'];

                        switch($nodes[$key]['field']['type']) {
                            case "widget-list":
                                $nodes[$key]['field']['value'] = $this->buildPageField($node['field']);
                            break;

                            case "widget":
                                $nodes[$key]['field']['fields'] = $this->buildPageField($node['field']);

                                $typologyId = isset($nodes[$key]['field']['settings']['typology']) ? $nodes[$key]['field']['settings']['typology'] : null;
                                $categoryId = isset($nodes[$key]['field']['settings']['category']) ? $nodes[$key]['field']['settings']['category'] : null;

                                if($typologyId) {
                                    $content = Content::where('typology_id', $typologyId);

                                    if($categoryId) {
                                        $content->whereHas('categories', function($q) use ($categoryId){
                                            $q->where('category_id', $categoryId);
                                        });
                                    }

                                    $nodes[$key]['field']['contents'] = $content->with('fields', 'categories')->get()->map(function($content) {
                                        return (new ContentTransformer($content))->toArray(request());
                                    })->toArray();
                                }
                            break;

                            default:
                                $nodes[$key]['field']['value'] = $this->buildPageField($node['field']);
                        }
                    }
                }
            }
        }

        return $nodes;
    }

    private function buildPageField($field, $name = null)
    {
        $fieldName = isset($field['fieldname']) ? $field['fieldname'] : null;

        if($name) {
            $fieldName = $name;
        }

        switch($field["type"]) {
            case 'richtext':
            case 'slug':
            case 'text':
                return $this->content->fields->where('name', $fieldName)->mapWithKeys(function($field) {
                    $language = Language::getCachedLanguageById($field->language_id);
                    return [$language->iso => $field->value];
                })->toArray();
            break;

            case 'file':
            case 'image':
                $contentField = $this->content->fields->where('name', $fieldName)->first();
                if($contentField != null){
                    return $this->medias->where('id', $contentField->value)->first();
                    //Media::find($contentField->value);
                }
            break;

            case 'translated_file':
                $self = $this;
                return $this->content->fields->where('name', $fieldName)->mapWithKeys(function($field) use ($self) {
                    $language = Language::getCachedLanguageById($field->language_id);
                    return [$language->iso => $self->medias->where('id', $field->value)->first()];
                })->toArray();
            break;

            case 'localization':
                $contentField = $this->content->fields->where('name', $fieldName)->first();
                if($contentField != null){
                  return json_decode($contentField->value, true);
                }
            break;

            case 'date':
                $contentField = ContentField::where('name', $fieldName)->first();
                return date('Y-m-d H:i:s', $contentField->value);
            break;

            case 'images':
                $self = $this;
                return $this->content->fields->where('name', $fieldName)->map(function($field) use ($self){
                    //return Media::find($field->value);
                    return $self->medias->where('id', $field->value)->first();
                })->toArray();
            break;

            case 'contents':
                $self = $this;
                return $this->content->fields->where('name', $fieldName)->map(function($field) use ($self){
                    //return Content::find($field->value);
                    return $self->contents->where('id', $field->value)->first();
                })->map(function($content) {
                    return (new ContentTransformer($content))->toArray(request());
                })->toArray();
            break;

            case 'video':
                $field = $this->content->fields->where('name', $fieldName)->first();
                $values = null;

                if($field) {
                    $childs = $this->content->getFieldChilds($field);

                    if($childs != null){
                      foreach($childs as $k => $v) {
                          if($v->language_id) {
                              $iso = $this->getLanguageIsoFromId($v->language_id);
                              $values[ explode('.', $v->name)[1] ][$iso] = $v->value;
                          }
                      }
                    }
                }
                return $values;
            break;

            case 'url':
            case 'link':
                $field = $this->content->fields->where('name', $fieldName)->first();
                $values = null;

                if($field) {
                    $childs = $this->content->getFieldChilds($field);

                    if($childs != null){
                      foreach($childs as $k => $v) {
                          if($v->language_id) {
                              $iso = $this->getLanguageIsoFromId($v->language_id);
                              $values[ explode('.', $v->name)[1] ][$iso] = $v->value;
                          } else {
                              if(explode('.', $v->name)[1] == 'content') {
                                  $values[ explode('.', $v->name)[1] ] = Content::find($v->value);
                              }
                          }
                      }
                    }
                }
                return $values;
            break;

            case 'widget':
                if(class_exists($field['class'])) {
                    $widget = (new $field['class']);
                    $fields = [];
                    foreach($widget->fields as $_field) {
                        if(!isset($_field['value'])) {
                            $_field['value'] = [];
                        }

                        $fieldName = $field['fieldname'] . "_" . $_field['identifier'];
                        $_field["value"] = $this->buildPageField($_field, $fieldName);
                        $fields[] = $_field;
                    }
                    return $fields;
                }
            break;


            case 'widget-list':

                if(!isset($field["value"])) {
                    return null;
                }

                foreach($field["value"] as $k => $w) {
                    if(class_exists($w['class'])) {
                        $widget = (new $w['class']);
                        $fields = [];
                        foreach($widget->fields as $_field) {
                            if(!isset($_field['value'])) {
                                $_field['value'] = [];
                            }

                            $fieldName = $w['fieldname'] . "_" . $_field['identifier'];
                            $_field["value"] = $this->buildPageField($_field, $fieldName);
                            $fields[] = $_field;
                        }
                        $field["value"][$k]["fields"] = $fields;
                    }
                }
                return $field["value"];
            break;

            default:
                $fields = $this->content->fields->where('name', $fieldName)->first();
                return $fields ? $fields->value : null;
            break;
        }

        return null;
    }

}
?>
