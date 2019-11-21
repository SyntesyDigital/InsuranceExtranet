<?php

namespace Modules\Extranet\Adapters;

//use Illuminate\Database\Eloquent\Collection as EloquentCollection;

use Modules\Architect\Entities\Media;
use Modules\Architect\Entities\Content;
use Modules\Architect\Entities\Typology;
use Modules\Architect\Entities\Language;
use Modules\Architect\Fields\FieldConfig;

use Modules\Architect\Transformers\ContentTransformer;
use Modules\Architect\Ressources\ContentCollection;

use  Modules\Extranet\Adapters\FieldsCollection;

class FieldsAdapter
{
    private $fields = [];
    private $typology = null;
    private $content = null;

    public function __construct($object)
    {
        if(get_class($object) == "Modules\Architect\Entities\Typology") {
            $this->typology = $object->load('fields');
        }

        if(get_class($object) == "Modules\Architect\Entities\Content") {
            $this->content = $object->load('fields');
        }

        $this->languages = Language::getAllCached();
    }


    private function getLanguageIsoFromId($id)
    {
        foreach($this->languages as $language) {
            if($language->id == $id) {
                return $language->iso;
            }
        }

        return false;
    }

    /*
    *   Build and fill typology fields list with content
    */
    public function get()
    {
        if($this->content) {
            $fields = $this->content->typology->fields;
        }

        if($this->typology) {
            $fields = $this->typology->fields;
        }

        foreach($fields as &$typologyField) {
            if($this->content) {
                foreach($this->content->fields as $k => $contentField) {
                    if($typologyField->identifier == $contentField->name) {
                        $typologyField->value = $this->content->getFieldValues($typologyField->identifier, $typologyField->type, $this->languages);
                        $this->fields[$typologyField->identifier] = $typologyField;
                    }
                }
            }

            if(!isset($typologyField->value)) {
                $typologyField->value = null;
                $this->fields[$typologyField->identifier] = $typologyField;
            }
        }

        return new FieldsCollection($this->fields);
    }
}
?>
