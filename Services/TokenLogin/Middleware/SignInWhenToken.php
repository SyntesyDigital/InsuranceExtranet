<?php

namespace Modules\Extranet\Services\TokenLogin\Middleware;

use Closure;
use Modules\Extranet\Services\TokenLogin\Connectors\TokenLoginConnectorHandler;
use Session;

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

        if ($request->get('jeton') || $request->get('j')) {
            $provider = 'april';
            $token = $request->get('j') ?: $request->get('jeton');
        }

        if ($token) {
            if ($request->get('debug')) {
                $connector = dispatch_now(new TokenLoginConnectorHandler($token, $provider));
            } else {
                // Handle SSO provider connector
                try {
                    $connector = dispatch_now(new TokenLoginConnectorHandler($token, $provider));
                } catch (\Exception $ex) {
                    switch ($ex->getCode()) {
                        case 800: // Expired token
                            return redirect(route('error.expired-token'));
                        break;
                    }
                }
            }
        }
        
        return $next($request);
    }
}
