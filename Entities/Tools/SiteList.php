<?php

namespace Modules\Extranet\Entities\Tools;

use Illuminate\Database\Eloquent\Model;

class SiteList extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'site_lists';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
        'identifier',
        'name',
        'type',
        'value',
    ];

    public $timestamps = false;

    public static function getListValue($name = null, $identifier)
    {
        if (! $name) {
            return null;
        }

        $list = self::where('identifier', $identifier)->first();
        $values = collect(json_decode($list->value, true))->mapWithKeys(function ($item, $key) {
            return [$item['value'] => $item['name']];
        })->toArray();

        if (is_array($name)) {
            $_values = [];
            foreach ($name as $k => $v) {
                $_values[$v] = $values[$v];
            }
            $values = $_values;
        }

        $value = is_array($name) ? $_values : null;

        if (! $value) {
            $value = isset($values[$name]) ? $values[$name] : null;
        }

        return $value;
    }
}
