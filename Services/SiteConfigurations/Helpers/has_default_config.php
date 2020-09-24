<?php

if (!function_exists('has_default_config')) {
    function has_default_config($identifier)
    {
        $defaultConfig = get_default_config($identifier);

        if(isset($defaultConfig) && $defaultConfig != ''){
            return true;
        }

        return false;
    }
}
