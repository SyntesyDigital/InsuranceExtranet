<?php

namespace Modules\Extranet\Repositories;

use Modules\Extranet\Entities\Element;
use Modules\Architect\Entities\Error;
use Modules\Extranet\Entities\ElementField;
use Modules\Architect\Entities\Content;
use Datatables;
use Prettus\Repository\Eloquent\BaseRepository;
use Lang;
use GuzzleHttp\Client;
use Auth;
use Config;
use Modules\Extranet\Services\ElementModelLibrary\Entities\ElementModel;

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
        return Element::where('type', $element_type)->get();
    }

    /*
    *   Récupération models
    *   API : [POST] /boBy/list
    *
    *   @return Models List
    */
    public function getModelsByType($type)
    {
        $beans = [];

        if ($type == Element::FORM_V2) {
            $models = ElementModel::where('type', $type)->get();

            foreach ($models as $model) {
                $beans[] = (object) [
              'ID' => trim($model->id),
              'ICONE' => $model->icon,
              'TITRE' => $model->name,
            ];
            }
        } else {
            $allBeans = $this->boby->postQuery(Element::TYPES[$type]['WS_NAME']);

            foreach ($allBeans as $bean) {
                if ($bean->FORMAT == Element::TYPES[$type]['FORMAT']) {
                    $beans[] = $bean;
                }
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
            $beans[trim($bean->ID)] = $bean;
        }

        return $beans;
    }

    /*
    *   Return fields from all field definition and filter by WS
    */
    public function getFieldsByElement($WS)
    {
        $beans = $this->boby->postQuery('WS_EXT2_DEF_CHAMPS');

        $fields = [];
        foreach ($beans as $bean) {
            if ($bean->WS == $WS) {
                $fields[] = $this->formatField($bean);
            }
        }

        return $fields;
    }

    private function mapFieldType($wsType)
    {
        $fields = Config('models.fields');

        $mapping = [];

        foreach ($fields as $field) {
            $mapping[$field['mapping']] = $field['identifier'];
        }

        return isset($mapping[$wsType]) ?
          $mapping[$wsType] : '';
    }

    private function mapIcons($wsType)
    {
        $fields = Config('models.fields');

        $icons = [];

        foreach ($fields as $field) {
            $icons[$field['mapping']] = $field['icon'];
        }

        return isset($icons[$wsType]) ?
          $icons[$wsType] : '';
    }

    private function getFieldType($parameters)
    {
        $fields = Config('models.fields');

        if (isset($parameters['format']) && $parameters['format'] != null && $parameters['format'] != '') {
            foreach ($fields as $field) {
                if ($field['mapping'] == $parameters['format']) {
                    return $field;
                }
            }
        }

        return $fields['text'];
    }

    private function formatField($field)
    {
        $identifier = $field->REF;
        $definition = explode(',', $field->DEF);
        $parameters = [];
        foreach ($definition as $parameter) {
            $parameter = explode(':', $parameter);
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
          'settings' => $fieldType['settings'],
        ];
    }

    public function getModelValuesFromElement($element, $parameters)
    {
        //dd($element->model_exemple);
        $params = "?SES=".Auth::user()->session_id;

        if (isset($parameters) && sizeof($parameters) > 0) {
            foreach ($parameters as $key => $value) {
                $params .= '&'.$key.'='.$value;
            }
        }

        return $this->boby->getModelValuesQuery($element->model_ws.$params);
    }

    public function getFormFields($modelId)
    {
        $procedures = $this->getProcedures($modelId);

        $allObjects = $this->boby->getModelValuesQuery('WS_EXT2_DEF_OBJETS?perPage=500');
        $allObjects = $allObjects['modelValues'];

        //obtain the fields from procedures
        $fields = [];

        //foreach procedures
        foreach ($procedures as $procedure) {
            if ($procedure->CONF == 'Y' && $procedure->REP == 'N') {
                //normal procedure, add field directly

                $resultFields = $this->getFieldsFromProcedure($procedure, $allObjects);
                $fields = array_merge($fields, $resultFields);
            } elseif ($procedure->CONF == 'Y' && $procedure->REP == 'Y') {
                //internal array like assure contact

                //add speceific field to define a internal array
                $fields[] = $this->processArrayListField($procedure, $allObjects);
            } elseif ($procedure->CONF == 'N' && $procedure->REP == 'Y') {
                //list with external model like documents

              //TODO añadir un modelo externo
            } else {
                //nothing to do
            }
        }

        return $fields;
    }

    public function getFieldsFromProcedure($procedure, $allObjects)
    {
        $fields = [];

        //get all fields configurable
        foreach ($allObjects as $object) {
            if ($procedure->OBJID == $object->OBJ_ID) {
                if ($object->CONF == 'Y') {
                    //process field

                    $fields[] = $this->processFormField($object);
                }
            }
        }

        return $fields;
    }

    public function getObjectsFromProcedure($procedure, $allObjects)
    {
        $fields = [];

        //get all fields configurable
        foreach ($allObjects as $object) {
            if ($procedure->OBJID == $object->OBJ_ID) {
                $fields[] = $object;
            }
        }

        return $fields;
    }

    public function processFormField($object)
    {
        $identifier = $object->CHAMP;

        $fieldType = $this->getFieldType([
        'format' => $object->BOBY != '' ?
          'select' : //if has boby is a select
          $object->FORMAT,
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
        'required' => $object->OBL == 'Y' ? true : false,
        'formats' => $fieldType['formats'],
        'rules' => $fieldType['rules'],
        'settings' => array_diff($fieldType['settings'],['hasRoute'])
      ];
    }

    public function processArrayListField($procedure, $allObjects)
    {
        $fields = $this->getFieldsFromProcedure($procedure, $allObjects);

        //dd($procedure);

        $fieldType = $this->getFieldType([
        'format' => 'list',
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
        'fields' => $fields,
      ];
    }

    public function getProcedures($modelId)
    {
        $procedures = $this->boby->getModelValuesQuery('WS_EXT2_DEF_PROCEDURES?perPage=100');

        $modelProcedures = [];

        foreach ($procedures['modelValues'] as $index => $procedure) {
            if ($procedure->MODELE == $modelId) {
                $modelProcedures[] = $procedure;
            }
        }

        usort($modelProcedures, function ($a, $b) {
            return intval($a->ETAP) > intval($b->ETAP);
        });

        return $modelProcedures;
    }

    public function getVariables()
    {
        $variables = $this->boby->getModelValuesQuery('WS_EXT2_DEF_PARAMPAGES?perPage=100');

        $result = [];

        //sort by p1
        usort($variables['modelValues'], function ($a, $b) {
            return intval($a->P1) > intval($b->P1);
        });

        foreach ($variables['modelValues'] as $index => $variable) {
            $result[$variable->PARAM] = $variable;
        }

        return $result;
    }

    public function getFilterVariables()
    {
        $variables = $this->boby->getModelValuesQuery('WS_EXT2_DEF_PARAMPAGES?perPage=100');

        $result = [];

        //sort by p1
        usort($variables['modelValues'], function ($a, $b) {
            return intval($a->P1) > intval($b->P1);
        });

        foreach ($variables['modelValues'] as $index => $variable) {
            if ($variable->P2 == 'filtre') {
                $values = $this->boby->getModelValuesQuery($variable->BOBY.'?perPage=100')['modelValues'];

                //dd($values);

                $result[] = [
                'name' => $variable->PARAM,
                'label' => $variable->LIB,
                'values' => $values,
              ];
            }
        }

        return $result;
    }

    public function getRouteParametersCheckData()
    {
        $data = [
        'columns' => [
          'icon' => 'Message',
          'name' => 'Element',
        ],
        'rows' => [],
      ];

        $elements = Element::whereHas('fields', function ($query) {
            return $query->whereNotNull('errors');
        })->get();

        foreach ($elements as $element) {
            foreach ($element->fields as $field) {
                $errors = json_decode($field->errors);
                if ((isset($errors->type)) && $errors->type == 'pageRoute') {
                    $hasRoute = isset($field->settings['hasRoute']) ? $field->settings['hasRoute'] : null;
                    $page = isset($hasRoute['id']) ? Content::find($hasRoute['id']) : null;

                    $data['rows'][] = [
                'icon' => $page
                  ? '<i class="fas fa-exclamation-triangle text-danger"></i> La route vers la page <strong>'.$page->title.'</strong>, sur le champ <strong>'.$field->name.'</strong> est mal configurée.'
                  : '<i class="fas fa-exclamation-triangle text-danger"></i> La route pour le champs <strong>'.$field->name.'</strong> est mal configurée',
                'name' => '<a href="'.route('extranet.elements.show', $element).'">'.$element->name.'</a>',
              ];
                }
            }
        }

        return $data;
    }

    public function getErrors()
    {
        return [
        'columns' => [
          'icon' => 'Message',
          'name' => 'Element',
        ],
        'rows' => Error::where('errorable_type', ElementField::class)
          ->get()
          ->map(function ($error) {
              return [
              'icon' => '<i class="fas fa-exclamation-triangle text-danger"></i> '.$error->getErrorObject()->getMessage(),
              'name' => '<a href="'.route('extranet.elements.show', $error->errorable->element).'">'.$error->errorable->element->name.'</a>',
            ];
          }),
      ];
    }

    public function getDatatable()
    {
        $results = Element::all();

        return Datatables::of($results)
            ->addColumn('title', function ($item) {
                return '<i class="'.$item->icon.'"></i>&nbsp;'.$item->name;
            })
            ->addColumn('type', function ($item) {
                return Element::TYPES[$item->type]['name'];
            })
            ->addColumn('action', function ($item) {
                return '<a href="" id="item-'.$item->id.'" data-content="'.base64_encode($item->toJson()).'" class="btn btn-link add-item" data-type="'.$item->type.'" data-name="'.$item->name.'" data-id="'.$item->id.'"><i class="fa fa-plus"></i> '.Lang::get('architect::fields.add').'</a> &nbsp;';
            })
            ->rawColumns(['title', 'action'])
            ->make(true);
    }
}
