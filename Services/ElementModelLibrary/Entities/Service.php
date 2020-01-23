<?php

namespace Modules\Extranet\Services\ElementModelLibrary\Entities;

use Modules\Extranet\Services\ElementModelLibrary\Entities\ModelProcedure;
use Modules\Extranet\Services\ElementModelLibrary\Entities\Service;
use Modules\Extranet\Services\ElementModelLibrary\Entities\ElementModel;

use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Service extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'services';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
        'identifier',
        'name',
        'httpMethod',
        'url',
        'boby',
        'response',
        'comment'
    ];

    public function procedures(): HasMany
    {
        return $this->hasMany(ModelProcedure::class, 'service_id', 'id');
    }
}
