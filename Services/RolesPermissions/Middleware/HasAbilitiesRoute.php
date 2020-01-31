<?php

namespace Modules\Extranet\Services\RolesPermissions\Middleware;

use Auth;
use Closure;
use Modules\Extranet\Entities\User;

class HasAbilitiesRoute
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return mixed
     */
    public function handle($request, Closure $next, $permissions)
    {
        $identifiers = explode(',', $permissions);

        if (get_class(Auth::user()) == 'stdClass') {
            $user = User::where('id_per', Auth::user()->id)->first();

            if (!$user->hasPermissions($identifiers)) {
                abort(403, 'Unauthorized action.');
            }

            return $next($request);
        }

        if (!Auth::user()->hasPermissions($identifiers)) {
            abort(403, 'Unauthorized action.');
        }

        return $next($request);
    }
}
