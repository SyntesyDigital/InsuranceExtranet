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
            $login = dispatch_now(new TokenLoginConnectorHandler($token, $provider ? $provider : 'april'))
                ->getLogin();

            if ($login) {
                $veosToken = dispatch_now(new LoginToken($login, 'extranet - veos2 - RECETTE - OLEA', 'Fp.423GKOr2[;9gR^x-S6mplKJUAb{Gb'));

                dd($veosToken);
            }
        }

        return $next($request);
    }
}
