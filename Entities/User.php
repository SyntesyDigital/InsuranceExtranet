<?php

namespace Modules\Extranet\Entities;

use Auth;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Modules\Extranet\Services\RolesPermissions\Traits\HasPermissions;
use Modules\Extranet\Services\RolesPermissions\Traits\HasRoles;

class User extends Authenticatable
{
    use Notifiable;
    use HasPermissions;
    use HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
        'id_per',
        'firstname',
        'lastname',
        'email',
        'phone',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
    ];

    public function session()
    {
        return $this->hasOne(Session::class, 'user_id', 'id');
    }

    public function __get($name)
    {
        // Check in model
        if (in_array($name, $this->fillable)) {
            return parent::__get($name);
        }

        if (Auth::user()) {
            // Check in session
            $session = $this->session()->first()->toArray();

            if (isset($session[$name])) {
                return $session[$name];
            }

            // Check in session payload (from VEOS)
            $payload = isset($session['payload']) ? json_decode($session['payload']) : null;

            if (isset($payload->$name)) {
                return $payload->$name;
            }
        }
    }
}
