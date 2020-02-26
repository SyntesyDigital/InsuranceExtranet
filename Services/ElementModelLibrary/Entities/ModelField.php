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

    public function getObject() 
    {
        if($this->configurable) {

            $fieldConfig = $this->getFieldType();

            return [
                'type' => $fieldConfig['identifier'],
                'identifier' => $this->identifier,
                'name' => $this->name,
                'icon' => $fieldConfig['icon'],
                'help' => '',
                'default' => $this->default_value,
                'boby' => $this->boby,
                'added' => false,
                'required' => $this->required == 1,
                'formats' => $fieldConfig['formats'],
                'rules' => ['required'],
                'settings' => array_diff($fieldConfig['settings'],['hasRoute'])
              ];
        }

        return null;
    }

    public function getFieldType()
    {
        $configFields = Config('models.fields');

        return $configFields[$this->format];
    }

}
