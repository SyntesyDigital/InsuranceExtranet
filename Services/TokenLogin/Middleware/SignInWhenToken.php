<?php

namespace Modules\Extranet\Services\TokenLogin\Middleware;

use Closure;
use Modules\Extranet\Services\TokenLogin\Connectors\TokenLoginConnectorHandler;

class SignInWhenToken
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
        $token = $request->get('token');
        $provider = $request->get('provider') ?: 'veos';

        if ($request->get('jeton')) {
            $provider = 'april';
            $token = $request->get('j') ?: $request->get('jeton');
        }

        if ($token) {
            // Handle SSO provider connector
            $connector = dispatch_now(new TokenLoginConnectorHandler($token, $provider));
        }

        return $next($request);
    }
}
