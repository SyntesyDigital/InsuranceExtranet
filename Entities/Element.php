<?php

namespace Modules\Extranet\Entities;

use Illuminate\Database\Eloquent\Model;

use Modules\Architect\Traits\HasUrl;

use Modules\Extranet\Entities\RouteParameter;

class Element extends Model
{
    use HasUrl;

    const TYPES = [
        'form' => [
            'name' => 'Formulaire',
            'identifier' => 'form',
            'icon' => 'fa fa-list-alt',
            'WS_NAME' => 'WS_EXT2_DEF_MODELES',
            'FORMAT' =>  'CR'
        ],
        'table' => [
            'name' => 'Tableau',
            'identifier' => 'table',
            'icon' => 'fa fa-table',
            'WS_NAME' => 'WS_EXT2_DEF_MODELES',
            'FORMAT' =>  'TB'
        ],
        'file' => [
            'name' => 'Fiche',
            'identifier' => 'file',
            'icon' => 'fa fa-columns',
            'WS_NAME' => 'WS_EXT2_DEF_MODELES',
            'FORMAT' =>  'FC'
        ],
    ];


    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'elements';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'icon',
        'identifier',
        'model_ws',
        'model_identifier',
        'model_format',
        'model_exemple',
        'type',
        'has_parameters'
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

    public function fields()
    {
        return $this->hasMany('\Modules\Extranet\Entities\ElementField');
    }

    public function attrs()
    {
        return $this->hasMany('\Modules\Extranet\Entities\ElementAttribute');
    }

    public static function whereAttribute($name, $value)
    {
        return self::whereHas('attrs', function ($q) use ($name, $value) {
            $q->where('name', $name);
            $q->where('value', $value);
        });
    }

    public function getParameters()
    {
        $parametersArray = $this->attrs->where('name', 'parameter')->pluck('value');
        return  RouteParameter::whereIn('id', $parametersArray)->get();
    }

    public function getSlug($languageId)
    {
        if(!$this->has_slug) {
            return false;
        }

        $attr = $this->attrs
            ->where('name', 'slug')
            ->where('language_id', $languageId)
            ->first();

        return $attr ? $attr->value : null;
    }


}
