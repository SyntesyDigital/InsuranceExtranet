<?php

namespace Modules\Extranet\Services\TokenLogin\Middleware;
use Closure;
use Modules\Extranet\Services\TokenLogin\Connectors\TokenLoginConnectorHandler;

class SignInWhenToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next, ...$roles)
    {
        $token = $request->get('j') ?: $request->get('token');
        $provider = $request->get('j') ? 'april' : $request->get('provider');

        if($token && $provider) {
            $handler = new TokenLoginConnectorHandler($token, $provider);
            $handler->handle();
        }
        
        return $next($request);
    }
}
