<?php

namespace Modules\Extranet\Transformers;

use Illuminate\Http\Resources\Json\Resource;



class ModelReactTransformer extends Resource
{

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request = null)
    {
        return $this->getSurveyArray($this->resource);
    }

    public function toJson($request = null)
    {
      return json_encode($this->toArray($request));
    }

    public function getSurveyArray($sinister_fields)
    {
      $i = 0;
      foreach (json_decode($sinister_fields) as $field) {
        $info[$i]['id'] = $field->id;
        $info[$i]['type'] = $field->type;
        $info[$i]['input'] = $field->input;
        $info[$i]['name'] = $field->form_name;
        $info[$i]['label'] = $field->name;
        $info[$i]['identifier'] = $field->identifier;
        $info[$i]['saved'] = $field->saved;
        $info[$i]['editable'] = $field->editable;
        $i++;
      }

      return $info;
    }


}
