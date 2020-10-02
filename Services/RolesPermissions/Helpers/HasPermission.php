<?php

if (!function_exists('has_permission')) {
    function has_permission($identifier, $user = null)
    {
        $user = $user ? $user : Auth::user();

        foreach ($user->permissions as $permission) {
            if ($permission->identifier == $identifier) {
                return true;
            }
        }

        return false;
    }
}

// Alias
if (!function_exists('can')) {
    function can($identifier, $user = null)
    {
        return has_permission($identifier, $user);
    }
}
