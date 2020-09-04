<?php

if (!function_exists('has_config')) {
    function has_config($identifier, $group = 'general')
    {
        $storedSiteConfigurations = get_config_object($group);

        if(isset($storedSiteConfigurations[$identifier]) 
            && isset($storedSiteConfigurations[$identifier]->value)
            && $storedSiteConfigurations[$identifier]->value != ''){
            return true;
        }

        return false;
    }
}
