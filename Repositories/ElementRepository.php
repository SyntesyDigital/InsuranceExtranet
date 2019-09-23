<?php

namespace Modules\Extranet\Repositories;

use Modules\Extranet\Entities\Element;
use Datatables;
use Prettus\Repository\Eloquent\BaseRepository;
use Lang;

use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;
use Auth;
use Session;
use App\Extensions\VeosWsUrl;
use Config;


class ElementRepository extends BaseRepository
{
    public function __construct(BobyRepository $boby)
    {
        $this->boby = $boby;
        $this->client = new Client();
    }

    public function model()
    {
        return "Modules\\Extranet\\Entities\Element";
    }

    public function getElementsByType($element_type)
    {
        return Element::where('type',$element_type)->get();
    }

    /*
    *   Récupération models
    *   API : [POST] /boBy/list
    *
    *   @return Models List
    */
    public function getModelsByType($type)
    {
        $allBeans = $this->boby->postQuery(Element::TYPES[$type]['WS_NAME']);
        $beans = [];
        foreach ($allBeans as $bean) {
          if($bean->FORMAT == Element::TYPES[$type]['FORMAT']){
            $beans[]=$bean;
          }
        }
        return $beans;
    }

    /*
    *   Get models sources info for widgets and componentes.
    *   Sorted by identifier
    *   API : [POST] /boBy/list
    *
    *   @return Models List
    */
    public function getModelsByIdentifier()
    {
        $allBeans = $this->boby->postQuery('WS_EXT2_DEF_MODELES');
        $beans = [];
        foreach ($allBeans as $bean) {
          $beans[$bean->ID] = $bean;
        }
        return $beans;
    }

    /*
    *   Return fields from all field definition and filter by WS
    */
    public function getFieldsByElement($WS)
    {
        $beans = $this->boby->postQuery("WS_EXT2_DEF_CHAMPS");

        $fields = [];
        foreach($beans as $bean){
          if($bean->WS == $WS){
            $fields[] = $this->formatField($bean);
          }
        }

        return $fields;
    }

    private function mapFieldType($wsType)
    {

        $fields = Config('models.fields');

        $mapping = [];

        foreach($fields as $field){
          $mapping[$field['mapping']] = $field['identifier'];
        }

        return isset($mapping[$wsType]) ?
          $mapping[$wsType] : '';
    }

    private function mapIcons($wsType)
    {
        $fields = Config('models.fields');

        $icons = [];

        foreach($fields as $field){
          $icons[$field['mapping']] = $field['icon'];
        }

        return isset($icons[$wsType]) ?
          $icons[$wsType] : '';
    }

    private function getFieldType($parameters)
    {

        $fields = Config('models.fields');

        if(isset($parameters['format']) && $parameters['format'] != null && $parameters['format'] != ''){
          foreach($fields as $field){
            if($field['mapping'] == $parameters['format']){
                return $field;
            }
          }
        }

        return $fields['text'];
    }

    private function formatField($field)
    {
        $identifier = $field->REF;
        $definition = explode(",",$field->DEF);
        $parameters = [];
        foreach($definition as $parameter){
          $parameter = explode(":",$parameter);
          $parameters[trim($parameter[0])] = isset($parameter[1]) ?
            trim($parameter[1]) : '';
        }

        $fieldType = $this->getFieldType($parameters);

        return [
          'type' => $fieldType['identifier'],
          'identifier' => $identifier,
          'name' => isset($parameters['lib']) ? $parameters['lib'] : '',
          'icon' => $fieldType['icon'],
          'help' => isset($parameters['tooltip']) ? $parameters['tooltip'] : '',
          'default' => '',
          'boby' => '',
          'added' => false,
          'formats' => $fieldType['formats'],
          'rules' => $fieldType['rules'],
          'settings' => $fieldType['settings']
        ];

    }


    public function getModelValuesFromElement($element,$parameters)
    {
        //dd($element->model_exemple);
        $params = "?SES=".Auth::user()->session_id;

        if(isset($parameters) && sizeof($parameters) > 0){
          foreach($parameters as $key => $value) {
            $params .= "&".$key."=".$value;
          }
        }

        return $this->boby->getModelValuesQuery($element->model_ws.$params);
    }

    public function getFormFields($modelId)
    {
        $procedures = $this->getProcedures($modelId);

        $allObjects = $this->boby->getModelValuesQuery('WS_EXT2_DEF_OBJETS?perPage=200');
        $allObjects = $allObjects['modelValues'];

        //obtain the fields from procedures
        $fields = [];

        //foreach procedures
        foreach($procedures as $procedure) {

            if($procedure->CONF == "Y" && $procedure->REP == "N"){
              //normal procedure, add field directly

              $resultFields = $this->getFieldsFromProcedure($procedure,$allObjects);
              $fields = array_merge($fields,$resultFields);

            }
            else if($procedure->CONF == "Y" && $procedure->REP == "Y"){
              //internal array like assure contact

              //add speceific field to define a internal array
              $fields[] = $this->processArrayListField($procedure,$allObjects);

            }
            else if($procedure->CONF == "N" && $procedure->REP == "Y"){
              //list with external model like documents

              //TODO añadir un modelo externo
            }
            else {
              //nothing to do
            }
        }

        return $fields;
    }

    public function getFieldsFromProcedure($procedure,$allObjects)
    {
        $fields = [];

        //get all fields configurable
        foreach($allObjects as $object) {
            if($procedure->OBJID == $object->OBJ_ID) {
              if($object->CONF == "Y"){

                //process field

                $fields[] = $this->processFormField($object);
              }
            }
        }

        return $fields;
    }

    public function getObjectsFromProcedure($procedure,$allObjects)
    {
        $fields = [];

        //get all fields configurable
        foreach($allObjects as $object) {
            if($procedure->OBJID == $object->OBJ_ID) {
              $fields[] = $object;
            }
        }

        return $fields;
    }

    public function processFormField($object){

      $identifier = $object->CHAMP;

      $fieldType = $this->getFieldType([
        'format' => $object->BOBY != '' ?
          'select' :  //if has boby is a select
          $object->FORMAT
      ]);

      //TODO Not using :
      //"VIS": "Y",
      //"CONT": null,
      //"COM": null,
      //"ACTIF": "Y",
      //"EXEMPLE": "CAUSES",
      //"P1": null,
      //"P2": null

      return [
        'type' => $fieldType['identifier'],
        'identifier' => $object->CHAMP,
        'name' => $object->LIB,
        'icon' => $fieldType['icon'],
        'help' => '',
        'default' => $object->VALEUR,
        'boby' => $object->BOBY,
        'added' => false,
        'required' => $object->OBL == "Y" ? true : false,
        'formats' => $fieldType['formats'],
        'rules' => ['required'],
        'settings' => array_diff($fieldType['settings'],['hasRoute'])
      ];

    }

    public function processArrayListField($procedure,$allObjects) {

      $fields = $this->getFieldsFromProcedure($procedure,$allObjects);

      //dd($procedure);

      $fieldType = $this->getFieldType([
        'format' => 'list'
      ]);

      return [
        'type' => $fieldType['identifier'],
        'identifier' => $procedure->OBJID,
        'name' => $procedure->LIB,
        'icon' => $fieldType['icon'],
        'help' => '',
        'default' => '',
        'boby' => '',
        'added' => false,
        'formats' => $fieldType['formats'],
        'rules' => $fieldType['rules'],
        'settings' => $fieldType['settings'],
        'fields' => $fields
      ];

    }


    public function getProcedures($modelId)
    {
        $procedures = $this->boby->getModelValuesQuery('WS_EXT2_DEF_PROCEDURES?perPage=100');

        $modelProcedures = [];

        foreach( $procedures['modelValues'] as $index => $procedure ) {
          if($procedure->MODELE == $modelId){
            $modelProcedures[] = $procedure;
          }
        }

        usort($modelProcedures, function($a, $b)
        {
            return intval($a->ETAP) > intval($b->ETAP);
        });

        return $modelProcedures;
    }

    public function getVariables()
    {
        $variables = $this->boby->getModelValuesQuery('WS_EXT2_DEF_PARAMPAGES?perPage=100');

        $result = [];

        //sort by p1
        usort($variables['modelValues'], function($a, $b)
        {
            return intval($a->P1) > intval($b->P1);
        });

        foreach( $variables['modelValues'] as $index => $variable ) {
          $result[$variable->PARAM] = $variable;

          //Boby Data not procesed here because needed parameters
          /*
          $data = $this->boby->getModelValuesQuery(
            $variable->BOBY."?SES=".Auth::user()->session_id.'&perPage=100');

          $modelValuesProcessed = [];
          foreach($data['modelValues'] as $modelValue){
            $modelValuesProcessed[] = [
              "text" => $modelValue->lib,
              "value" => $modelValue->val
            ];
          }

          $result[$variable->PARAM]->{'BOBY_DATA'} = $modelValuesProcessed;
          */
        }

        return $result;

    }



}
