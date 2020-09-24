<?php

if (!function_exists('get_currencies')) {
    function get_currencies()
    {
     /*   $cacheKey = sprintf('currencies_%s', $key);

        if (Cache::has($cacheKey)) {
            return Cache::get($cacheKey);
        }*/

        $currencies = Modules\Extranet\Services\Currency\Entities\Currency::all()->keyBy('code')->toArray();
        //we add on key default the default currency to use it on js components
        $currencies['default']= Modules\Extranet\Services\Currency\Entities\Currency::where('default',1)->first();
        if (!isset($currencies) || !$currencies) {
            return null;
        }

     //   Cache::forever($cacheKey, $currenciesTree);

        return $currencies;
    }
}
