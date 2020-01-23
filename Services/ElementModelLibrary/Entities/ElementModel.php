<?php

namespace Modules\Extranet\Services\ElementModelLibrary\Entities;

use Modules\Extranet\Services\ElementModelLibrary\Entities\ModelProcedure;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class ElementModel extends Model
{
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
        'icon'
    ];

    public function procedures(): BelongsToMany
    {
        return $this->hasMany(ModelProcedure::class, 'model_id', 'id');
    }

}
