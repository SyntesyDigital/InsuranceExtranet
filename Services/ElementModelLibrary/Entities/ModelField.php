<?php

namespace Modules\Extranet\Services\ElementModelLibrary\Entities;

use Modules\Extranet\Services\ElementModelLibrary\Entities\ModelProcedure;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Model;

use Config;

class ModelField extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'models_fields';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
        'procedure_id',
        'name',
        'identifier',
        'type',
        'format',
        'default_value',
        'boby',
        'jsonpath',
        'example',
        'required',
        'configurable',
        'visible'
    ];

    public function procedure(): HasOne
    {
        return $this->hasOne(ModelProcedure::class, 'id', 'procedure_id');
    }

    public function getConfig($prefix = '') 
    {
        if($this->configurable) {

            $fieldConfig = $this->getFieldType();

            //add the prefix if needed, example when two services same key

            return [
                'type' => $fieldConfig['identifier'],
                'identifier' => $prefix != '' ? $prefix.'.'.$this->identifier : $this->identifier,  //if prefix added alwyas added to elements
                'name' => $this->name,
                'icon' => $fieldConfig['icon'],
                'help' => '',
                'default' => $this->default_value,
                'boby' => $this->boby,
                'added' => false,
                'required' => $this->required == 1,
                'formats' => $fieldConfig['formats'],
                'rules' => $fieldConfig['rules'],
                //REMOVED because hasRoute is already filtered during JS, and thi is causing a bug, changin array to object.
                //'settings' => array_diff($fieldConfig['settings'],['hasRoute']),
                'settings' => $fieldConfig['settings'],
                'prefix' => $prefix // service identifier added if difference with same keys
              ];
        }

        

        return null;
    }

    public function getFieldType()
    {
        $configFields = Config('models.fields');

        return $configFields[$this->format];
    }

    /**
     * Transform field from entity to object
     * needed to compute form.
     */
    public function getObject($prefix = '')
    {
        return (object) [
            "ID" => $this->id,
            "OBJ_JSONP" => $this->jsonpath,
            "CHAMP" => $this->identifier,
            "LIB" => $this->name,
            "NATURE" => $this->type,
            "FORMAT" => $this->format,
            "VALEUR" => $this->default_value,
            "BOBY" => $this->boby,
            "OBL" => $this->required ? 'Y' : 'N',
            "VIS" => $this->attributes['visible'] ? 'Y' : 'N',
            "CONF" => $this->configurable ? 'Y' : 'N',
            "EXEMPLE" => $this->example,
            'PREFIX' => $prefix
        ];
    }

}
