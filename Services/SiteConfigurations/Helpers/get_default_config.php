<?php

if (!function_exists('get_default_config')) {
    function get_default_config($identifier)
    {
        if(isset(config('siteConfigurations.default')[$identifier]))
            return config('siteConfigurations.default')[$identifier];
        else 
            return null;
    }
}
