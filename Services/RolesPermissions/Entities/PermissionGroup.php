<?php

namespace Modules\Extranet\Services\RolesPermissions\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PermissionGroup extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'permissions_groups';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'identifier',
        'order',
    ];

    public function permissions(): HasMany
    {
        return $this->hasMany(Permission::class, 'group_id', 'id');
    }
}
