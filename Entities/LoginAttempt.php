<?php

namespace Modules\Extranet\Entities;

use Illuminate\Database\Eloquent\Model;

class LoginAttempt extends Model
{
    protected $fillable = [
        'login',
        'ip_address',
        'user_agent',
        'count',
        'env',
    ];

    protected $table = 'login_attempts';
}
