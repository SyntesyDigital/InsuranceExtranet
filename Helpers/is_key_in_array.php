<?php

if (!function_exists('is_key_in_array')) {
    function is_key_in_array($key,$array)
    {
        if(is_array($array)){
            return isset($array[$key]);
        }else{
            return isset($array->{$key});
        }
    }
}
