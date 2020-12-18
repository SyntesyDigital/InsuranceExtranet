<?php

if (!function_exists('is_creatic_icon')) {
    function is_creatic_icon($icon)
    {
        if (isset($icon) && $icon != '' && strpos($icon, 'creatic') !== false) {
            return true;
        } else {
            return false;
        }
    }
}
