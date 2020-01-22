<?php

namespace Modules\Extranet\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Session extends Model
{
    protected $fillable = [
        'user_id',
        'ip_address',
        'user_agent',
        'token',
        'env',
        'language',
        'payload',
    ];

    public function user(): HasOne
    {
        return $this->hasOne('App\User', 'id', 'user_id');
    }
}
