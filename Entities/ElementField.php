<?php

namespace Modules\Extranet\Entities;

use Illuminate\Database\Eloquent\Model;
use Modules\Architect\Core\EntityError\HasEntityError;

class ElementField extends Model
{
    use HasEntityError;
    
    protected $casts = [
      'rules' => 'array',
      'settings' => 'array'
    ];

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'elements_fields';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'type',
        'identifier',
        'element_id',
        'boby',
        'icon',
        'rules',
        'settings',
        // 'errors'
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

    public function element()
    {
        return $this->hasOne('\Modules\Extranet\Entities\Element', "id", "element_id");
    }
}
