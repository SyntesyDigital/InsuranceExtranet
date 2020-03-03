<?php

namespace Modules\Extranet\Services\ElementModelLibrary\Jobs;

use Modules\Extranet\Entities\Element;
use Modules\Extranet\Entities\ElementField;
use Modules\Extranet\Entities\ElementAttribute;

use Modules\Extranet\Services\ElementModelLibrary\Entities\ElementModel;
use Modules\Extranet\Services\ElementModelLibrary\Entities\ModelField;
use Modules\Extranet\Services\ElementModelLibrary\Entities\ModelProcedure;
use Modules\Extranet\Services\ElementModelLibrary\Entities\Service;

use Config;

class ImportElementModel
{
  //  use FormFields;

    public function __construct($attributes)
    {
      $this->attributes = array_only($attributes, [
          'elementType',
          'model',
          'fields',
          'procedures',
          'variables'
      ]);
    }

    public function handle()
    {
      
      //dd($this->attributes);

      $configFields = [];
      foreach(Config('models.fields') as $configField){
        $configFields[$configField['mapping']] = $configField;
      }


      $model = $this->attributes['model'];

      $elementModel = ElementModel::create([
        'identifier' => $model->ID,
        'name' => $model->TITRE,
        'description' => $model->COMMENTAIRE,
        'icon' => $model->ICONE,
        'type' => 'form-v2',
        'ws' => $model->WS,
        'ws_format' => $model->WS_FORMAT,
        'filtres' => $model->FILTRES,
        'example' => $model->EXEMPLE,
        'def1'  => $model->DEF1,
        'def2'  => $model->DEF2,
      ]);

      //dd($elementModel);

      $procedures = $this->attributes['procedures'];

      foreach($procedures as $procedure) {

        if(empty($procedure->SERVICE)){
          continue;
        }

        $service = Service::where('identifier',$procedure->SERVICE->ID)->first();

        if(!isset($service)){
          $service = Service::create([
            'identifier' => $procedure->SERVICE->ID,
            'name' => $procedure->SERVICE->SERVICE,
            'http_method' => $procedure->SERVICE->METHODE,
            'url' => $procedure->SERVICE->URL,
            'boby' => '',
            'json' => '',
            'response' => $procedure->SERVICE->REPONSE,
            'comment' => $procedure->SERVICE->COMMENTAIRE,
          ]);
        }

        $modelProcedure = ModelProcedure::create([
          'service_id' => $service->id,
          'model_id'=> $elementModel->id,
          'name' => $procedure->LIB,
          'configurable' => $procedure->CONF == "Y" ? 1 : 0,
          'required' => $procedure->OBL == "Y" ? 1 : 0,
          'repeatable' => $procedure->REP == "Y" ? 1 : 0,
          'repeatable_json' => '',
          'repeatable_jsonpath' => $procedure->JSONP,
          'order' => intval($procedure->ETAP),
        ]);

        foreach($procedure->OBJECTS as $object) {

          ModelField::create([
            'procedure_id' => $modelProcedure->id,
            'name' => $object->LIB,
            'identifier' => $object->CHAMP,
            'type' => $object->NATURE,
            'format' => $configFields[$object->FORMAT]['identifier'],
            'default_value' => $object->VALEUR,
            'boby' => $object->BOBY,
            'jsonpath' => '',
            'example' => $object->EXEMPLE,
            'required' => $object->OBL == "Y" ? 1 : 0,
            'configurable' => $object->CONF == "Y" ? 1 : 0,
            'visible' => $object->VIS == "Y" ? 1 : 0
          ]);

        }

      }

      return $elementModel;

    }
}
