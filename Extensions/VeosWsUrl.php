<?php

namespace Modules\Extranet\Extensions;

use Auth;

class VeosWsUrl
{
    const PROD = 'prod';
    const DEV = 'dev';
    const REC = 'rec';

    public static function get()
    {
        if (isset(Auth::user()->env)) {
            return self::getEnvironmentUrl(Auth::user()->env);
        }

        if (get_class(Auth::user()) == 'Modules\\Extranet\\Entities\\User') {
            return self::getEnvironmentUrl(Auth::user()->env);
        }
    }

    public static function prod()
    {
        return env('WS_URL');
    }

    public static function test()
    {
        return env('WS_URL_TEST');
    }

    public static function rec()
    {
        return env('WS_URL_REC');
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
