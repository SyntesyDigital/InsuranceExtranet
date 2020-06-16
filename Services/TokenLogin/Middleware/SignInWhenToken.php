<?php

namespace Modules\Extranet\Services\TokenLogin\Middleware;

use Closure;
use Modules\Extranet\Services\TokenLogin\Connectors\TokenLoginConnectorHandler;
use Modules\Extranet\Services\TokenLogin\Veos\LoginToken;

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
        $token = $request->get('j') ?: $request->get('jeton');
        $provider = $request->get('j') ? 'april' : $request->get('provider');

        if ($token) {
            // Handle SSO provider connector
            $connector = dispatch_now(new TokenLoginConnectorHandler($token, $provider ? $provider : 'april'));

            // Open VEOS session and get token
            $veosToken = dispatch_now(new LoginToken($connector->getLogin()));

            // Init user session if VEOS token exist
            if ($veosToken) {
                dispatch_now(new SessionCreate($veosToken));
            }
        }

        return $next($request);
    }
}
