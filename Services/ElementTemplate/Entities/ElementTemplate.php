<?php

namespace Modules\Extranet\Services\ElementTemplate\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Modules\Extranet\Entities\Element;

class ElementTemplate extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'elements_templates';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
        'name',
        'layout',
        'element_id',
    ];

    public function fields(): HasMany
    {
        return $this->hasMany(ElementTemplate::class, 'template_id', 'id');
    }

    public function element(): HasOne
    {
        return $this->hasMany(Element::class, 'id', 'element_id');
    }
}
