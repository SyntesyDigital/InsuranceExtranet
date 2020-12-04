<?php

if (!function_exists('is_creatic_enable')) {
    function is_creatic_enable()
    {
        if (has_config('CREATIC_LIB_IS_ACTIVE')) {
            return get_config('CREATIC_LIB_IS_ACTIVE');
        } else {
            return false;
        }
    }
}
