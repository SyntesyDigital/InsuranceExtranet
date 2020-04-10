<?php

namespace Modules\Extranet\Services\ElementModelLibrary\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Modules\Extranet\Services\ElementModelLibrary\Duplicators\ElementModelDuplicator;
use Modules\Extranet\Services\ElementModelLibrary\Traits\Duplicator;

class ElementModel extends Model
{
    use Duplicator;

    protected $duplicator = ElementModelDuplicator::class;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'elements_models';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
        'identifier',
        'name',
        'description',
        'icon',
        'type',
        'ws',
        'ws_format',
        'filtres',
        'example',
        'def1',
        'def2'
    ];

    public function procedures(): HasMany
    {
        return $this->hasMany(ModelProcedure::class, 'model_id', 'id');
    }

    public function getObject() {
        
        return (object)[
            'ID' => $this->id,
            'TITRE' => $this->name,
            'COMMENTAIRE' => $this->description,
            'ICONE' => $this->icon
        ];
    }

    public function getFields() {

        $procedures = $this->procedures()->get();
        $procedures->load('fields');
        
        $fields = [];

        foreach($procedures as $procedure) {

            if($procedure->configurable && !$procedure->repeatable){
                //normal procedure, add field directly
  
                $fields = array_merge(
                    $fields,
                    $procedure->getFieldsConfig()
                );
  
            }
            else if($procedure->configurable && $procedure->repeatable){
                //internal array like assure contact

                //add speceific field to define a internal array
                $fields[] = $procedure->getListFieldObject();

            }
            else if(!$procedure->configurable && $procedure->repeatable){
                //list with external model like documents

                //TODO añadir un modelo externo
            }
            else {
                //nothing to do
            }
        }

        return $fields;
        
    }

    public function getProcedures($allVariables)
    {
        $procedures = $this->procedures()->get();
        $procedures->load('fields','service');
        $proceduresObjects = [];
        $variables = [];

        foreach($procedures as $procedure) {
            $systemVars = [];
            $fieldsObject = $procedure->getFieldsObject();

            //process objects to values
            foreach($fieldsObject as $index => $object){
                if ($object->NATURE == 'SYSTEM') {
                    $systemVars[$object->VALEUR] = true;
                }
            }

            $service = $procedure->service->getObject();

            $variables = self::checkNecessaryVariables(
                $variables,
                $allVariables,
                $systemVars,
                $service,
                $fieldsObject
            );

            //process procedure as object

            $currentProcedure = $procedure->getObject();
            $currentProcedure->{'OBJECTS'} = $fieldsObject;
            $currentProcedure->{'SERVICE'} = $procedure->service->getObject();
            $currentProcedure->{'JSONP'} = $procedure->repeatable_jsonpath;
            $currentProcedure->{'PARAMS'} = $systemVars;

            $proceduresObjects[] = $currentProcedure;
        }

        $variables = self::checkInnerDependces($variables, $allVariables);
        $variables = self::processAndSortVariables($variables);

        usort($proceduresObjects, function ($a, $b) {
            return intval($a->ETAP) > intval($b->ETAP);
        });

        return [
            "procedures" => $proceduresObjects,
            "variables" => $variables
        ];

    }

    /**
     *   Function that check if variables are necessary for this procedure.
     */
    public static function checkNecessaryVariables($variables, $allVariables, $systemVars, $procedureServices, $objects)
    {
        foreach ($allVariables as $variableId => $variable) {
            if (isset($systemVars['_'.$variableId])) {
                //variable is nedeed as a system var
                $variables[$variableId] = $variable;
            }

            if (isset($procedureServices->URL)) {
                //if variable exist in the URL
                $urlArray = explode('/', $procedureServices->URL);

                $variableSlashes = '_'.$variableId;
                foreach ($urlArray as $urlVariable) {
                    if ($urlVariable == $variableSlashes) {
                        $variables[$variableId] = $variable;
                    }
                }
            }

            //if variable exist in an object WS
            foreach ($objects as $object) {
                if (isset($object->BOBY)) {
                    $urlArray = explode('?', $object->BOBY);
                    if (sizeof($urlArray) > 1) {
                        $urlArray = self::parameters2Array($urlArray[1]);
                        foreach ($urlArray as $key => $urlVariable) {
                            if ($key == $variableId) {
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
     *   If exist BOBYPAR in the selected varaibles, add also this variable, because
     *   that means there is a inner dependance.
     */
    public static function checkInnerDependces($variables, $allVariables)
    {

        $result = [];

        foreach ($variables as $variableId => $variable) {
            $result = self::iterateVariables(
                $variable,
                $result,
                $allVariables
            );
        }

        return $result;
    }

    /**
     * Iterate recursively all variables, until no more dependences
     */
    private static function iterateVariables($variable, $result,$allVariables) {
        if(isset($result[$variable->PARAM])){
            //already added
            return $result;
        }

        //add variable 
        $result[$variable->PARAM] = $variable;
        
        //continue with next
        if (isset($variable->BOBYPAR) && $variable->BOBYPAR != '') {
            //start iteration
            if(isset($allVariables[$variable->BOBYPAR])){
                $result = self::iterateVariables(
                    $allVariables[$variable->BOBYPAR],
                    $result,
                    $allVariables
                );
            }
        }
        return $result;
    }

    /**
     * Convert variables to key value and sort by order.
     */
    public static function processAndSortVariables($variables)
    {
        $result = [];

        usort($variables, function ($a, $b) {
            return intval($a->P1) > intval($b->P1);
        });

        foreach ($variables as $index => $variable) {
            $result[$variable->PARAM] = $variable;
        }

        return $result;
    }

    /**
     *   Convert parameters string to array of key value.
     */
    public static function parameters2Array($paramString)
    {
        $result = [];

        if (!isset($paramString) || $paramString == '') {
            return $result;
        }

        $paramsArray = explode('&', $paramString);
        for ($i = 0; $i < sizeof($paramsArray); ++$i) {
            $paramsSubArray = explode('=', $paramsArray[$i]);
            $result[$paramsSubArray[0]] = $paramsSubArray[1];
        }

        return $result;
    }

    
}
