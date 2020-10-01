<?php

namespace Modules\Extranet\Http\Controllers;

use App\Http\Controllers\Controller;
use Auth;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Modules\Extranet\Entities\Element;
use Modules\Extranet\Entities\RouteParameter;
use Modules\Extranet\Http\Requests\Elements\CreateElementRequest;
use Modules\Extranet\Http\Requests\Elements\DeleteElementRequest;
use Modules\Extranet\Http\Requests\Elements\PostServiceRequest;
use Modules\Extranet\Http\Requests\Elements\UpdateElementRequest;
use Modules\Extranet\Jobs\Elements\CreateElement;
use Modules\Extranet\Jobs\Elements\DeleteElement;
use Modules\Extranet\Jobs\Elements\ProcessService;
use Modules\Extranet\Jobs\Elements\UpdateElement;
use Modules\Extranet\Repositories\BobyRepository;
use Modules\Extranet\Repositories\ElementRepository;
use Modules\Extranet\Services\ElementModelLibrary\Entities\ElementModel;
use Modules\Extranet\Services\ElementModelLibrary\Jobs\ImportElementModel;
use Modules\Extranet\Services\ElementTemplate\Entities\ElementTemplate;
use Modules\Extranet\Transformers\ModelValuesFormatTransformer;

class ElementController extends Controller
{
    public function __construct(ElementRepository $elements, BobyRepository $boby)
    {
        $this->elements = $elements;
        $this->boby = $boby;
    }

    public function index()
    {
        return view('extranet::elements.index');
    }

    public function getDataTable(Request $request)
    {
        return $this->elements->getDatatable();
    }

    public function data(Request $request)
    {
        switch ($request->get('q')) {
            case 'errors':
                return response()->json($this->elements->getErrors());
            break;
        }
    }

    public function typeIndex($element_type, Request $request)
    {
        $models = $this->elements->getModelsByType($element_type);

        return view('extranet::elements.type_index',
                [
                  'elements' => $this->elements->getElementsByType($element_type),
                  'models' => $models,
                  'element_type' => $element_type,
                ]);
    }

    private function getModelById($models, $modelId)
    {
        foreach ($models as $model) {
            if (trim($model->ID) == trim($modelId)) {
                return $model;
            }
        }

        return null;
    }

    public function create($element_type, $model_id, Request $request)
    {
        $procedures = null;
        //get model and fields
        if ($element_type == Element::FORM_V2) {
            $elementModel = ElementModel::where('id', $model_id)->first();
            $model = $elementModel->getObject();
        } else {
            $model = $this->getModelById(
                $this->elements->getModelsByType($element_type),
                $model_id
            );
        }

        if (!$model) {
            abort(500);
        }

        if ($element_type == Element::FORM) {
            $fields = $this->elements->getFormFields($model->ID);
            $procedures = $this->computeFormProcedures($model->ID);
        } elseif ($element_type == Element::FORM_V2) {
            $fields = $elementModel->getFields();
            $procedures = $elementModel->getProcedures(
                $this->elements->getVariables()
            );
        } else {
            $fields = $this->elements->getFieldsByElement($model->WS);
        }

        //dd($fields);

        $parametersList = RouteParameter::all();

        $data = [
            'element_type' => $element_type,
            'model' => $model,
            'fields' => $fields,
            'parametersList' => $parametersList,
            'procedures' => isset($procedures) ? $procedures['procedures'] : null,
            'variables' => isset($procedures) ? $procedures['variables'] : null,
        ];

        if ($request->has('debug')) {
            dd($data);
        }

        return view('extranet::elements.form', $data);
    }

    public function show(Element $element, Request $request)
    {

        if ($element->type == Element::FORM_V2) {
            $elementModel = ElementModel::where('id', $element->model_identifier)->first();
            $model = $elementModel->getObject();
        } else {
            $models = $this->elements->getModelsByType($element->type);
            $model = $this->getModelById($models, $element->model_identifier);
        }

        if ($element->type == Element::FORM) {
            $fields = $this->elements->getFormFields(trim($model->ID));
            $procedures = $this->computeFormProcedures(trim($model->ID));
        } elseif ($element->type == Element::FORM_V2) {
            $fields = $elementModel->getFields();
            $procedures = $elementModel->getProcedures(
                $this->elements->getVariables()
            );
        } else {
            $fields = $this->elements->getFieldsByElement($model->WS);
        }

        $parametersList = RouteParameter::all();

        $data = [
            'element_type' => $element->type,
            'model' => $model,
            'fields' => $fields,
            'element' => $element->load('fields', 'fields.errors', 'attrs'),
            'parametersList' => $parametersList,
            'parameters' => $element->getParameters(),
            'procedures' => isset($procedures) ? $procedures['procedures'] : null,
            'variables' => isset($procedures) ? $procedures['variables'] : null,
        ];

        if ($request->has('debug')) {
            dd($data);
        }

        return view('extranet::elements.form', $data);
    }

    public function createTemplate(Element $element, Request $request)
    {
        return view('extranet::elements.template', [
            'element' => $element->load('fields'),
        ]);
    }

    public function showTemplate(Element $element, ElementTemplate $template, Request $request)
    {
        return view('extranet::elements.template', [
            'element' => $element,
            'template' => $template,
        ]);
    }

    public function store(CreateElementRequest $request)
    {
        try {
            $element = $this->dispatchNow(CreateElement::fromRequest($request));

            return response()->json([
                      'success' => true,
                      'element' => $element,
                  ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Element $element, UpdateElementRequest $request)
    {
        try {
            $element = $this->dispatchNow(UpdateElement::fromRequest($element, $request));

            return response()->json([
                        'success' => true,
                        'element' => $element,
                    ]);
        } catch (\Exception $e) {
            return response()->json([
                  'success' => false,
                  'message' => $e->getMessage(),
              ], 500);
        }
    }

    public function delete(Element $element, DeleteElementRequest $request)
    {
        return dispatch_now(DeleteElement::fromRequest($element, $request)) ? response()->json([
                'success' => true,
            ]) : response()->json([
                'success' => false,
            ], 500);
    }

    public function getModelValues(Element $element, $limit = null, Request $request)
    {
        try {
            $result = $this->elements->getModelValuesFromElement($element, $request->all());

            if ($request->has('debug')) {
                dd($element->toArray(),$result);
            }

            return response()->json([
                'success' => true,
                'modelValues' => new ModelValuesFormatTransformer(
                    $result['modelValues'],
                    $element->fields()->get(),
                    $limit, $request->all(),
                    $element->type == Element::TYPES['table']['identifier'] ? true : false
                ),
                'totalPage' => $result['completeObject']->totalPage != null ? $result['completeObject']->totalPage : null,
                'total' => $result['completeObject']->totalPage != null ? $result['completeObject']->total : null,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function export(Element $element, $limit, $filename = '', Request $request)
    {
        //cronstuct file
        if ($filename == '') {
            //cronstuct file
            $filename = Carbon::now()->format('YmdHs').'_'.str_slug($element->name, '_').'.csv';
            $filepath = storage_path().'/app/'.$filename;
            $handle = fopen($filepath, 'w+');

            $titles = $element->fields()->pluck('name')->toArray();
            $row = [];
            foreach ($titles as $key => $value) {
                array_push($row, isset($value) ? mb_convert_encoding($value, 'ISO-8859-1', 'UTF-8') : '');
            }

            fputcsv($handle, $row, ';');
        } else {
            $filepath = storage_path().'/app/'.$filename;
            $handle = fopen($filepath, 'a+');
        }
        $columns = $element->fields()->pluck('name', 'identifier');

        $result = $this->elements->getModelValuesFromElement($element, $request->all());
        $modelValues = (new ModelValuesFormatTransformer(
        $result['modelValues'], $element->fields()->get(), false, null, false, true)
        )->toArray();

        foreach ($modelValues as $modelValue) {
            $row = [];
            foreach ($columns as $key => $value) {
                array_push($row, isset($modelValue[$key]) ? mb_convert_encoding($modelValue[$key], 'ISO-8859-1', 'UTF-8') : '');
            }

            fputcsv($handle, $row, ';');
        }
        fclose($handle);

        return response()->json([
            'success' => true,
            'filename' => $filename,
        ]);
    }

    public function downloadCSV($filename)
    {
        //Close and download

        $headers = [
            'Content-Type' => 'text/csv;',
        ];
        $filepath = storage_path().'/app/'.$filename;

        return response()->download($filepath, $filename, $headers)->deleteFileAfterSend(true);
    }

    public function getSelectData($name, Request $request)
    {
        $parameters = $request->all();

        $params = '?'
            .get_session_parameter()
            .'&perPage=10000';

        if (isset($parameters) && sizeof($parameters) > 0) {
            foreach ($parameters as $key => $value) {
                $params .= '&'.$key.'='.$value;
            }
        }

        try {
            $selectData = $this->boby->getModelValuesQuery(
              $name.$params
            )['modelValues'];

            $resultData = [];

            foreach ($selectData as $item) {
                $resultData[] = [
                'name' => $item->lib,
                'value' => $item->val,
                'value_preload' => isset($item->valpreload) ? $item->valpreload : null,
              ];
            }

            return response()->json([
                      'success' => true,
                      'data' => $resultData,
                  ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function postService(PostServiceRequest $request)
    {

        try {
            $result = $this->dispatchNow(ProcessService::fromRequest($request));

            return response()->json([
                      'success' => true,
                      'result' => $result,
                  ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function getFormProcedures($modelId, Request $request)
    {
        try {
            $validationWs = null;

            if (intval($modelId) != 0) {
                //ElementModel Form V2
                $elementModel = ElementModel::where('id', $modelId)->first();
                $data = $elementModel->getProcedures(
                    $this->elements->getVariables()
                );
                //if validation ws is defined add to array
                $validationWs = $elementModel->validation_ws;
            } else {
                //$modelId is an string, so Form V1
                $data = $this->computeFormProcedures($modelId);
            }

            $data = [
                'procedures' => $data['procedures'],
                'variables' => $data['variables'],
                'validation_ws' => $validationWs,
            ];

            if ($request->has('debug')) {
                dd($data);
            }

            return response()->json([
                      'success' => true,
                      'data' => $data,
                  ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    private function computeFormProcedures($modelId)
    {
        $procedures = $this->elements->getProcedures($modelId);

        $allObjects = $this->boby->getModelValuesQuery(
            'WS_EXT2_DEF_OBJETS?perPage=500'
        )['modelValues'];

        $allServices = $this->boby->getModelValuesQuery(
            'WS_EXT2_DEF_SERVICES?perPage=100'
        )['modelValues'];

        //get system variables processed
        $allVariables = $this->elements->getVariables();
        $variables = [];
        $services = [];

        foreach ($allServices as $service) {
            $services[$service->ID] = $service;
        }

        foreach ($procedures as $index => $procedure) {
            $objects = [];
            $procedureServices = [];
            $systemVars = [];
            $root = '';

            foreach ($allObjects as $object) {
                if ($procedure->OBJID == $object->OBJ_ID) {
                    if (strpos($object->OBJ_JSONP, 'listPer') !== false) {
                        //if is listPer add []
                        //FIXME remove [] when added directly
                        $object->OBJ_JSONP = $object->OBJ_JSONP.'[]';
                    }

                    if (strpos($object->OBJ_JSONP, 'listInfos') !== false) {
                        //if is listPer add []
                        //FIXME remove [] when added directly
                        $object->OBJ_JSONP = $object->OBJ_JSONP.'[]';
                    }

                    $objects[] = $object;

                    if ($object->NATURE == 'SYSTEM') {
                        $systemVars[$object->VALEUR] = true;
                    }

                    if ($object->OBJ_ID == 'DOC01') {
                        //FIXME remove [] when added to procedure
                        $object->OBJ_JSONP = $object->OBJ_JSONP.'[]';
                    }

                    /*
                    FIXME not necessary Service linked to procedure
                    if(!isset($procedureServices[$object->SERV_ID])){
                      $procedureServices[$object->SERV_ID] = $services[$object->SERV_ID];
                    }
                    */
                    //conclusion only one service per procedure
                    if (isset($services[$object->SERV_ID])) {
                        $procedureServices = $services[$object->SERV_ID];
                    }

                    $root = $object->OBJ_JSONP;
                }
            }

            //filter wich variables are necessary for this procedure
            $variables = ElementModel::checkNecessaryVariables(
                $variables,
                $allVariables,
                $systemVars,
                $procedureServices,
                $objects
            );

            if ($procedure->OBJID == 'SIN05') {
                $procedures[$index]->{'CONF'} = 'N';
                $procedures[$index]->{'REP'} = 'N';
            }

            $procedures[$index]->{'OBJECTS'} = $objects;
            $procedures[$index]->{'SERVICE'} = $procedureServices;
            $procedures[$index]->{'JSONP'} = $root;
            $procedures[$index]->{'PARAMS'} = $systemVars;
        }

        //dd($procedures);

        //check necessary variables between themselves
        $variables = ElementModel::checkInnerDependces($variables, $allVariables);
        $variables = ElementModel::processAndSortVariables($variables);

        return [
          'variables' => $variables,
          'procedures' => $procedures,
        ];
    }

    /**
     *  Get all variables that has filters, necessary to fill the settings,
     *  HiddenFilter.
     */
    public function getFilterVariables()
    {
        try {
            //get system variables processed
            $variables = $this->elements->getFilterVariables();

            return response()->json([
                      'success' => true,
                      'data' => $variables,
                  ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function getElementParameters(Element $element, Request $request)
    {
        $element->parameters = $element->getParameters();

        return response()->json($element);
    }

    public function getElementForModal(Element $element, Request $request)
    {
        $element->load('fields', 'attrs');
        $models = $this->elements->getModelsByType($element->type);
        $model = $this->getModelById($models, $element->model_identifier);

        $data = [
          'element' => $element,
          'model' => $model,
        ];

        return response()->json($data);
    }

    public function import($element_type, $model_id, Request $request)
    {
        $procedures = null;
        //get model and fields
        if ($element_type != Element::FORM) {
            return response()->json([
                'error' => true,
                'message' => 'Only form type available. Element of type '.$element_type,
            ], 422);
        }

        $model = $this->getModelById(
            $this->elements->getModelsByType($element_type),
            $model_id
        );

        if (!$model) {
            return response()->json([
                'error' => true,
                'message' => 'Model id does not exist in Models database. Id to find : '.$model_id,
            ], 422);
        }

        $procedures = $this->computeFormProcedures($model->ID);

        $data = [
          'elementType' => $element_type,
          'model' => $model,
          'procedures' => isset($procedures) ? $procedures['procedures'] : null,
          'variables' => isset($procedures) ? $procedures['variables'] : null,
        ];

        try {
            $elementModel = $this->dispatchNow(new ImportElementModel($data));
        } catch (\Exception $e) {
            return response()->json([
                'error' => true,
                'message' => $e->getMessage(),
            ], 422);
        }

        return response()->json([
            'error' => false,
            'message' => 'Model imported successfully',
            'model' => $elementModel,
        ]);
    }

    public function getModelsByType($elementType)
    {
        $models = $this->elements->getModelsByType($elementType);

        return response()->json($models);
    }

    public function getElements()
    {
        $elements = Element::all();
        $elements->load('attrs', 'templates');

        return $elements->toArray();
    }
}
