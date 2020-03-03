<?php

namespace Modules\Extranet\Services\ElementTemplate\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Modules\Architect\Entities\Language;

class ElementTemplateField extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'elements_templates_fields';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
        'template_id',
        'language_id',
        'name',
        'value',
        'relation',
        'parent_id',
    ];

    public function template(): HasOne
    {
        return $this->hasOne(ElementTemplate::class, 'id', 'template_id');
    }

    public function language(): HasOne
    {
        return $this->hasOne(Language::class, 'id', 'language_id');
    }
}
