<?php

namespace Modules\Extranet\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Extranet\Repositories\ElementRepository;
use Modules\Extranet\Repositories\BobyRepository;

use Modules\Extranet\Entities\Element;
use Modules\Extranet\Entities\RouteParameter;

use Modules\Extranet\Http\Requests\Elements\CreateElementRequest;
use Modules\Extranet\Http\Requests\Elements\UpdateElementRequest;
use Modules\Extranet\Http\Requests\Elements\DeleteElementRequest;
use Modules\Extranet\Http\Requests\Elements\PostServiceRequest;

use Modules\Extranet\Jobs\Elements\ProcessService;
use Modules\Extranet\Jobs\Element\CreateElement;
use Modules\Extranet\Jobs\Element\UpdateElement;
use Modules\Extranet\Jobs\Element\DeleteElement;
//use Modules\Extranet\Jobs\Element\PostService;

use Modules\Extranet\Tasks\Elements\ValidateElementRouteParameters;
use Modules\Extranet\Transformers\ModelValuesFormatTransformer;

use Config;
use Illuminate\Http\Request;
use Session;
use Carbon\Carbon;
use Auth;

class ElementController extends Controller
{
    public function __construct(ElementRepository $elements, BobyRepository $boby) {
        $this->elements = $elements;
        $this->boby = $boby;
    }

    public function index()
    {
        return view('extranet::elements.index');
    }

    public function data(Request $request)
    {
      switch($request->get('q')) {
        case 'check_routes_parameters':
          return response()->json($this->elements->getRouteParametersCheckData());
        break;
      }
    }

    public function typeIndex($element_type,Request $request)
    {
        $models = $this->elements->getModelsByType($element_type);
        return view('extranet::elements.type_index',
                [
                  'elements' => $this->elements->getElementsByType($element_type),
                  'models' => $models,
                  'element_type' => $element_type
                ]);
    }

    private function getModelById($models,$modelId){

        foreach($models as $model){
          if($model->ID == $modelId){
            return $model;
          }
        }
        return null;
    }

    public function create($element_type, $model_id, Request $request)
    {

        //get model and fields
        $models = $this->elements->getModelsByType($element_type);
        $model = $this->getModelById($models,$model_id);

        if(!$model)
          abort(500);

        if($element_type == 'form'){
          $fields = $this->elements->getFormFields($model->ID);
        }
        else {
          $fields = $this->elements->getFieldsByElement($model->WS);
        }

        //dd($fields);

        $parametersList = RouteParameter::all();

        $data = [
          'element_type' => $element_type,
          'model' => $model,
          'fields' => $fields,
          'parametersList' => $parametersList
        ];

        if($request->has('debug')){
          dd($data);
        }

        return view('extranet::elements.form', $data);
    }

    public function show(Element $element, Request $request)
    {
      $models = $this->elements->getModelsByType($element->type);
      $model = $this->getModelById($models,$element->model_identifier);

      if($element->type == 'form'){
        $fields = $this->elements->getFormFields($model->ID);
      }
      else {
        $fields = $this->elements->getFieldsByElement($model->WS);
      }

      $parametersList = RouteParameter::all();

      $data = [
        'element_type' => $element->type,
        'model' => $model,
        'fields' => $fields,
        'element' => $element->load('fields','attrs'),
        'parametersList' => $parametersList,
        'parameters' => $element->getParameters()
      ];

        return view('extranet::elements.form',$data);
    }

    public function store(CreateElementRequest $request)
    {
      try {
            $element = $this->dispatchNow(CreateElement::fromRequest($request));
            return response()->json([
                      'success' => true,
                      'element' => $element
                  ]);
        } catch (\Exception $e) {

            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);

        }
    }

    public function update(Element $element, UpdateElementRequest $request)
    {
        try {
              $element = $this->dispatchNow(UpdateElement::fromRequest($element, $request));
              return response()->json([
                        'success' => true,
                        'element' => $element
                    ]);
          } catch (\Exception $e) {

              return response()->json([
                  'success' => false,
                  'message' => $e->getMessage()
              ], 500);
          }

    }

    public function delete(Element $element, DeleteElementRequest $request)
    {
      return dispatch_now(DeleteElement::fromRequest($element, $request)) ? response()->json([
                'success' => true
            ]) : response()->json([
                'success' => false
            ], 500);
    }


    public function getModelValues(Element $element, $limit = null,Request $request)
    {

      try {
            $result = $this->elements->getModelValuesFromElement($element,$request->all());
            return response()->json([
                      'success' => true,
                      'modelValues' => new ModelValuesFormatTransformer($result['modelValues'],$element->fields()->get(), $limit,$request->all()),
                      'totalPage' => $result['completeObject']->totalPage != null? $result['completeObject']->totalPage:null,
                      'total' => $result['completeObject']->totalPage != null? $result['completeObject']->total:null

                  ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function export(Element $element, $limit = null, Request $request)
    {
      $modelValues = (new ModelValuesFormatTransformer($this->elements->getModelValuesFromElement($element),$element->fields()->get(), $limit))->toArray();
      $filename =  Carbon::now()->format('YmdHs').'_'.str_slug($element->name, "_").".csv";
      $filepath = storage_path() . "/app/".$filename;
      $handle = fopen($filepath, 'w+');

      $titles = $element->fields()->pluck('name')->toArray();
      $colmuns = $element->fields()->pluck('name','identifier');
      fputcsv($handle, $titles);


      foreach($modelValues as $modelValue){
        $row = [];
        foreach($colmuns as $key => $value) {
          array_push($row,isset($modelValue[$key]) ? $modelValue[$key] : "" );
        }

        fputcsv($handle, $row);
      }

      fclose($handle);

        $headers = array(
            'Content-Type' => 'text/csv',
        );

      return response()->download($filepath, $filename, $headers);

    }

    public function getSelectData($name, Request $request)
    {

      $parameters = $request->all();

      $params = "?SES=".Auth::user()->session_id.'&perPage=100';
      //if the the session is the same of the user, don't filter by SES
      if(Auth::user()->session_id == Auth::user()->id){
        $params = "?perPage=100";
      }

      if(isset($parameters) && sizeof($parameters) > 0){
        foreach($parameters as $key => $value) {
          $params .= "&".$key."=".$value;
        }
      }

      try {
            $selectData = $this->boby->getModelValuesQuery(
              $name.$params
            )['modelValues'];

            $resultData = [];

            foreach($selectData as $item) {
              $resultData[] = [
                "name" => $item->lib,
                "value" => $item->val
              ];
            }

            return response()->json([
                      'success' => true,
                      'data' => $resultData
                  ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function postService(PostServiceRequest $request)
    {
        try {
            $result = $this->dispatchNow(ProcessService::fromRequest($request));
            return response()->json([
                      'success' => true,
                      'result' => $result
                  ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }



    public function getFormProcedures($modelId)
    {

      try {

            $procedures = $this->elements->getProcedures($modelId);

            $allObjects = $this->boby->getModelValuesQuery(
                'WS_EXT2_DEF_OBJETS?perPage=100'
              )["modelValues"];
            $allServices = $this->boby->getModelValuesQuery(
                'WS_EXT2_DEF_SERVICES?perPage=100'
              )["modelValues"];

            //get system variables processed
            $allVariables = $this->elements->getVariables();
            $variables = [];

            $services = [];

            foreach($allServices as $service){
              $services[$service->ID] = $service;
            }

            foreach($procedures as $index => $procedure) {

              $objects = [];
              $procedureServices = [];
              $systemVars = [];
              $root = "";

              foreach($allObjects as $object) {
                  if($procedure->OBJID == $object->OBJ_ID) {

                    if(strpos($object->OBJ_JSONP,'listPer') !== false ) {
                      //if is listPer add []
                      //FIXME remove [] when added directly
                      $object->OBJ_JSONP = $object->OBJ_JSONP."[]";
                    }

                    $objects[] = $object;

                    if($object->NATURE == "SYSTEM"){
                      $systemVars[$object->VALEUR] = true;
                    }

                    if($object->OBJ_ID == "DOC01"){
                      //FIXME remove [] when added to procedure
                      $object->OBJ_JSONP = $object->OBJ_JSONP."[]";
                    }

                    /*
                    FIXME not necessary Service linked to procedure
                    if(!isset($procedureServices[$object->SERV_ID])){
                      $procedureServices[$object->SERV_ID] = $services[$object->SERV_ID];
                    }
                    */
                    //conclusion only one service per procedure
                    if(isset($services[$object->SERV_ID])){
                      $procedureServices = $services[$object->SERV_ID];
                    }

                    $root = $object->OBJ_JSONP;

                  }
              }

              //filter wich variables are necessary for this procedure
              $variables = $this->checkNecessaryVariables(
                $variables,
                $allVariables,
                $systemVars,
                $procedureServices,
                $objects
              );

              $procedures[$index]->{'OBJECTS'} = $objects;
              $procedures[$index]->{'SERVICE'} = $procedureServices;
              $procedures[$index]->{'JSONP'} = $root;
              $procedures[$index]->{'PARAMS'} = $systemVars;
            }

            //dd($procedures);


            //check necessary variables between themselves
            $variables = $this->checkInnerDependces($variables,$allVariables);
            $variables = $this->processAndSortVariables($variables);

            return response()->json([
                      'success' => true,
                      'data' => [
                          'procedures' => $procedures,
                          'variables' => $variables
                        ]
                  ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
    *   Function that check if variables are necessary for this procedure
    */
    private function checkNecessaryVariables($variables,$allVariables,$systemVars,$procedureServices,$objects)
    {
      foreach($allVariables as $variableId => $variable) {
        if(isset($systemVars['_'.$variableId])){
          //variable is nedeed as a system var
          $variables[$variableId] = $variable;
        }

        //if variable exist in the URL
        $urlArray = explode("/",$procedureServices->URL);

        $variableSlashes = '_'.$variableId;
        foreach($urlArray as $urlVariable) {
          if($urlVariable == $variableSlashes){
            $variables[$variableId] = $variable;
          }
        }

        //if variable exist in an object WS
        foreach($objects as $object){
          if(isset($object->BOBY)){
            $urlArray = explode("?",$object->BOBY);
            if(sizeof($urlArray) > 1){
              $urlArray = $this->parameters2Array($urlArray[1]);
              foreach($urlArray as $key => $urlVariable) {
                if($key == $variableId){
                  $variables[$variableId] = $variable;
                }
              }
            }
          }
        }
      }

      return $variables;
    }

    /**
    *   Convert parameters string to array of key value
    */
    private function parameters2Array($paramString)
    {
        $result = [];

        if(!isset($paramString) || $paramString == '')
          return $result;

        $paramsArray = explode("&",$paramString);
        for($i=0;$i<sizeof($paramsArray);$i++){
          $paramsSubArray = explode("=",$paramsArray[$i]);
          $result[$paramsSubArray[0]] = $paramsSubArray[1];
        }

        return $result;
    }

    /**
    *   If exist BOBYPAR in the selected varaibles, add also this variable, because
    *   that means there is a inner dependance.
    */
    private function checkInnerDependces($variables,$allVariables)
    {

      foreach($variables as $variableId => $variable) {
        if(isset($variable->BOBYPAR) && $variable->BOBYPAR != ''){
          if(isset($allVariables[$variable->BOBYPAR])){
              $variables[$variable->BOBYPAR] = $allVariables[$variable->BOBYPAR];
          }
        }
      }

      return $variables;
    }

    /**
    * Convert variables to key value and sort by order.
    */
    private function processAndSortVariables($variables)
    {

      $result = [];

      usort($variables, function($a, $b)
      {
          return intval($a->P1) > intval($b->P1);
      });

      foreach( $variables as $index => $variable ) {
        $result[$variable->PARAM] = $variable;
      }

      return $result;
    }

    /**
    *  Get all variables that has filters, necessary to fill the settings,
    *  HiddenFilter
    */
    public function getFilterVariables()
    {

      try {

            //get system variables processed
            $variables = $this->elements->getFilterVariables();

            return response()->json([
                      'success' => true,
                      'data' => $variables
                  ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

}
