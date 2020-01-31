<?php

namespace Modules\Extranet\Services\ElementModelLibrary\Entities;

use Modules\Extranet\Services\ElementModelLibrary\Entities\ModelProcedure;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Model;

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
        'configurable',
        'visible'
    ];

    public function procedure(): HasOne
    {
        return $this->hasOne(ModelProcedure::class, 'id', 'procedure_id');
    }

}
