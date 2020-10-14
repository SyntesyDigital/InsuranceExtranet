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
        'response_json',
        'is_old_url_ws',
        'body',
        'example',
        'has_session_id'
    ];

    public function procedures(): HasMany
    {
        return $this->hasMany(ModelProcedure::class, 'id', 'service_id');
    }

    public function getObject()
    {
        return (object) [
            'ID' => $this->id,
            'SERVICE' => $this->name,
            'METHODE' => $this->http_method,
            'URL' => $this->url,
            'IS_OLD_URL' => $this->is_old_url_ws,
            'REPONSE' => $this->response,
            'REPONSE_JSON' => $this->response_json,
            'COMMENTAIRE' => $this->comment,
            'P1' => null,
            'P2' => null,
            'JSON' => $this->json,
            'BODY' => $this->body,
            'EXAMPLE' => $this->example,
            'HAS_SESSION_ID' => $this->has_session_id
        ];
    }
}
