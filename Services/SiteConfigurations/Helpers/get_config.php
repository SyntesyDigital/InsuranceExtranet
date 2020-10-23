<?php

if (!function_exists('get_config')) {
    function get_config($identifier, $group = 'general')
    {
        $storedSiteConfigurations = get_config_object($group);
        //if has config defined
        if (has_config($identifier, $group)) {
            return $storedSiteConfigurations[$identifier]->value;
        }
        //if has default config
        if (has_default_config($identifier)) {
            return get_default_config($identifier);
        }
        //return env variable if exist
        return env($identifier, '');
    }
}
