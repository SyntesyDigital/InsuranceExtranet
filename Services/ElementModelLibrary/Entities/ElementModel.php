<?php

namespace Modules\Extranet\Services\ElementModelLibrary\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Modules\Extranet\Services\ElementModelLibrary\Duplicators\ElementModelDuplicator;

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
    ];

    public function procedures(): BelongsToMany
    {
        return $this->hasMany(ModelProcedure::class, 'model_id', 'id');
    }
}
