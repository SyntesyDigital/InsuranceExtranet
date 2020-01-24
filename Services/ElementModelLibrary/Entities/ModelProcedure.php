<?php

namespace Modules\Extranet\Services\ElementModelLibrary\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Modules\Extranet\Services\ElementModelLibrary\Duplicators\ModelProcedureDuplicator;

class ModelProcedure extends Model
{
    use Duplicator;

    protected $duplicator = ModelProcedureDuplicator::class;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'models_procedures';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
        'service_id',
        'element_id',
        'name',
        'configurable',
        'required',
        'repeatable',
        'repeatable_json',
    ];

    public function service(): HasOne
    {
        return $this->hasOne(Service::class, 'id', 'procedure_id');
    }

    public function elementModel(): HasOne
    {
        return $this->hasOne(Service::class, 'id', 'element_id');
    }
}
