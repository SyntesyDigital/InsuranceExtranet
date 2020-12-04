<?php

if (!function_exists('is_font_awesome_enable')) {
    function is_font_awesome_enable()
    {
        if (has_config('FONTAWESOME_IS_ACTIVE')) {
            return !get_config('FONTAWESOME_IS_ACTIVE');
        } else {
            return true;
        }
    }
}
