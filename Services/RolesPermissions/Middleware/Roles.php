<?php

namespace Modules\Extranet\Services\RolesPermissions\Middleware;

use Closure;

class Roles
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return mixed
     */
    public function handle($request, Closure $next, ...$roles)
    {
        $roles = array_map(function ($role) {
            return constant(trim($role));
        }, $roles);

        if (!has_roles($roles, $request->user())) {
            abort(403, 'Unauthorized action.');
        }

        return $next($request);
    }
}
