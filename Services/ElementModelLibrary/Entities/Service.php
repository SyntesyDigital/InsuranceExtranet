<?php

namespace Modules\Extranet\Services\ElementModelLibrary\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Modules\Extranet\Services\ElementModelLibrary\Duplicators\ServiceDuplicator;
use Modules\Extranet\Services\ElementModelLibrary\Traits\Duplicator;

class Service extends Model
{
    use Duplicator;

    protected $duplicator = ServiceDuplicator::class;

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
        'http_method',
        'url',
        'boby',
        'response',
        'comment',
    ];

    public function procedures(): HasMany
    {
        return $this->hasMany(ModelProcedure::class, 'id', 'service_id');
    }
}
