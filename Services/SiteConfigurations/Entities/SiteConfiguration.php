<?php

namespace Modules\Extranet\Services\SiteConfigurations\Entities;

use Illuminate\Database\Eloquent\Model;
use Modules\Architect\Traits\HasFields;

class SiteConfiguration extends Model
{
    use HasFields;

    protected $fieldModel = 'Modules\Extranet\Services\SiteConfigurations\Entities\SiteConfigurationField';

    protected $table = 'site_configurations';

    protected $appends = ['name'];

    protected $fillable = [
        'identifier',
        'icon',
    ];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = [
        'created_at',
        'updated_at',
    ];

    public function getNameAttribute()
    {
        if ($this->fields) {
            foreach ($this->fields as $field) {
                if ($field->name == 'name') {
                    return $this->getFieldValue($field->name);
                }
            }
        }

        return null;
    }
}
