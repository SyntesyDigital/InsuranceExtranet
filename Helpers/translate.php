<?php

if (!function_exists('translate')) {
    function translate($key, $language = null)
    {
        $cacheKey = $language ? 'localization.' . $language->iso : 'localization.' .  App::getLocale();
        $values = cache($cacheKey);

        return isset($values[$key]) ? $values[$key] : null;
    }
}
