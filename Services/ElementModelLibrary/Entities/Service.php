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
        'json',
        'response',
        'comment',
        'response_json'
    ];

    public function procedures(): HasMany
    {
        return $this->hasMany(ModelProcedure::class, 'id', 'service_id');
    }

    public function getObject() {
        return (object)[
            "ID"=> $this->id,
            "SERVICE"=> $this->name,
            "METHODE"=> $this->http_method,
            "URL"=> $this->url,
            "REPONSE"=> $this->response,
            "REPONSE_JSON"=> $this->response_json,
            "COMMENTAIRE"=> $this->comment,
            "P1"=> null,
            "P2"=> null,
            "JSON" => $this->json,
        ];
    }
}
