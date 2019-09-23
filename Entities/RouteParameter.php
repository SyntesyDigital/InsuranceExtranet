<?php

namespace Modules\Extranet\Entities;

use Illuminate\Database\Eloquent\Model;


class RouteParameter extends Model
{

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'routes_parameters';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'identifier'
    ];

    /**
     * The attributes that are hidden from serialization.
     *
     * @var array
     */
    protected $hidden = [
        'deleted_at'
    ];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at'
    ];

    public function contents()
    {
        return $this->belongsToMany('\Modules\Architect\Entities\Content', 'contents_routes_parameters', 'route_parameter_id', 'content_id');
    }


}
