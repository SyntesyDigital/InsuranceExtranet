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
                    $procedure->getFieldsObjects()
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

    private function processField() {
        
    }



    
}
