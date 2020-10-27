<?php

namespace Modules\Extranet\Extensions;

use Auth;
use Session;

class VeosWsUrl
{
    const PROD = 'prod';
    const DEV = 'preprod';
    const REC = 'rec';

    public static function get()
    {
        if (Auth::user()) {
            if (isset(Auth::user()->env)) {
                return self::getEnvironmentUrl(Auth::user()->env);
            }

            if (get_class(Auth::user()) == 'Modules\\Extranet\\Entities\\User') {
                return self::getEnvironmentUrl(Auth::user()->env);
            }
        } else {
            if (Session::get('user')) {
                $user = json_decode(Session::get('user'));

                return self::getEnvironmentUrl($user->env);
            }
        }

        return self::prod();
    }

    public static function prod()
    {
        return get_config('WS_URL');
    }

    public static function test()
    {
        return get_config('WS_URL_TEST');
    }

    public static function rec()
    {
        return get_config('WS_URL_REC');
    }

    public static function getEnvironmentUrl($env)
    {
        switch (strtolower($env)) {
            case self::DEV:
                return self::test();
            break;
            case self::REC:
                return self::rec();
            break;
            default:
                return self::prod();
            break;
        }
    }

    public static function getEnvironmentOptions()
    {
        return [
            self::DEV,
            self::REC,
            self::PROD,
        ];
    }
}
