<?php

namespace Modules\Extranet\Services\Currency\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;


class Currency extends Model
{

    const RIGHT_SYMBOLE_POSITION = 'R';
    const LEFT_SYMBOLE_POSITION = 'L';

    const POSITIONS = [
        Currency::RIGHT_SYMBOLE_POSITION => 'Droit',
        Currency::LEFT_SYMBOLE_POSITION => 'Left'
    ];
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'currencies';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
        'code',
        'label',
        'symbole',
        'symbole_position',
        'decimals',
        'decimals_separator',
        'thousands_separator',
        'default'
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
    
}
