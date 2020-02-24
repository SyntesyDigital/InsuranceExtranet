<?php

namespace Modules\Extranet\Services\ElementModelLibrary\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Modules\Extranet\Services\ElementModelLibrary\Duplicators\ModelProcedureDuplicator;
use Modules\Extranet\Services\ElementModelLibrary\Traits\Duplicator;

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
        'model_id',
        'name',
        'configurable',
        'required',
        'repeatable',
        'repeatable_json',
        'repeatable_jsonpath'
    ];

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class, 'service_id', 'id');
    }

    public function elementModel(): BelongsTo
    {
        return $this->belongsTo(ElementModel::class, 'model_id', 'id');
    }

    public function fields(): HasMany
    {
        return $this->hasMany(ModelField::class, 'procedure_id', 'id');
    }
}
