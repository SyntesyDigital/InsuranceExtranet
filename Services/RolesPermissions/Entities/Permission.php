<?php

namespace Modules\Extranet\Services\RolesPermissions\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Permission extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'permissions';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'description',
        'identifier',
        'group_id',
    ];

    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class, 'roles_permissions', 'role_id', 'permission_id');
    }

    public function group(): HasOne
    {
        return $this->hasOne(PermissionGroup::class, 'id', 'group_id');
    }
}
