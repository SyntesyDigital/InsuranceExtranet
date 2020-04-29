<?php

namespace Modules\Extranet\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Modules\Architect\Traits\HasUrl;
use Modules\Extranet\Services\ElementModelLibrary\Entities\ElementModel;
use Modules\Extranet\Services\ElementTemplate\Entities\ElementTemplate;

class Element extends Model
{
    use HasUrl;

    const FORM = 'form';
    const FILE = 'file';
    const TABLE = 'table';
    const FORM_V2 = 'form-v2';

    const TYPES = [
        Element::TABLE => [
            'name' => 'Tableau',
            'identifier' => 'table',
            'icon' => 'fa fa-table',
            'WS_NAME' => 'WS_EXT2_DEF_MODELES',
            'FORMAT' => 'TB',
        ],
        Element::FILE => [
            'name' => 'Fiche',
            'identifier' => 'file',
            'icon' => 'fa fa-columns',
            'WS_NAME' => 'WS_EXT2_DEF_MODELES',
            'FORMAT' => 'FC',
        ],
        Element::FORM => [
            'name' => 'Formulaire v1.0',
            'identifier' => 'form',
            'icon' => 'fa fa-list-alt',
            'WS_NAME' => 'WS_EXT2_DEF_MODELES',
            'FORMAT' => 'CR',
        ],
        Element::FORM_V2 => [
            'name' => 'Formulaire v2.0',
            'identifier' => 'form-v2',
            'icon' => 'fa fa-list-alt',
            'WS_NAME' => '',
            'FORMAT' => '',
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
        'has_parameters',
        'has_error',
    ];

    /**
     * The attributes that are hidden from serialization.
     *
     * @var array
     */
    protected $hidden = [
        'deleted_at',
    ];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    public function fields(): HasMany
    {
        return $this->hasMany('\Modules\Extranet\Entities\ElementField');
    }

    public function attrs(): HasMany
    {
        return $this->hasMany('\Modules\Extranet\Entities\ElementAttribute');
    }

    public function templates(): HasMany
    {
        return $this->hasMany(ElementTemplate::class, 'element_id', 'id');
    }

    public function elementModel()
    {
        if ($this->type == 'form-v2') {
            return $this->hasOne(ElementModel::class, 'id', 'model_identifier');
        }

        return $this->hasOne(ElementModel::class, 'id', 'model_identifier')->where('id', 0);
    }

    public static function whereAttribute($name, $value)
    {
        return self::whereHas('attrs', function ($q) use ($name, $value) {
            $q->where('name', $name);
            $q->where('value', $value);
        });
    }

    /**
     * Get all route parameters contained in attributes with settings included.
     */
    public function getParameters()
    {
        //get ids from attributes that are parameters
        $parametersArray = $this->attrs->where('name', 'parameter')->keyBy('value')->toArray();
        $idsArray = [];
        foreach ($parametersArray as $id => $paramter) {
            $idsArray[] = $id;
        }

        //get all route parameters with this ids
        $routeParameters = RouteParameter::whereIn('id', $idsArray)->get()->toArray();
        //add settings info to parameter
        foreach ($routeParameters as $index => $routeParameter) {
            $routeParameters[$index]['settings'] = json_decode($parametersArray[$routeParameter['id']]['settings']);
        }

        return $routeParameters;
    }

    public function getSlug($languageId)
    {
        if (!$this->has_slug) {
            return false;
        }

        $attr = $this->attrs
            ->where('name', 'slug')
            ->where('language_id', $languageId)
            ->first();

        return $attr ? $attr->value : null;
    }
}
