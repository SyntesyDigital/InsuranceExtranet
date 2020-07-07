<?php

namespace Modules\Extranet\Services\RolesPermissions\Middleware;

use Auth;
use Closure;
use Modules\Extranet\Entities\User;

class Permissions
{
    // /**
    //  * Handle an incoming request.
    //  *
    //  * @param \Illuminate\Http\Request $request
    //  *
    //  * @return mixed
    //  */
    // public function handle($request, Closure $next, $permission)
    // {
    //     if (!has_permission($permission, $request->user())) {
    //         abort(403, 'Unauthorized action.');
    //     }

    //     return $next($request);
    // }

    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return mixed
     */
    public function handle($request, Closure $next, $permissions)
    {
        if (!Auth::user()) {
            abort(403, 'Unauthorized action.');
        }

        $identifiers = explode(',', $permissions);

        $userPermissions = isset(Auth::user()->permissions) ? Auth::user()->permissions : [];

        $userPermissions = collect($userPermissions)
            ->filter(function ($permission) use ($identifiers) {
                return in_array($permission->identifier, $identifiers);
            });

        if (!$userPermissions->count() > 0 ? true : false) {
            abort(403, 'Unauthorized action.');
        }

        return $next($request);
    }
}
