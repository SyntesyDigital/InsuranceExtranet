<?php

if (!function_exists('has_roles')) {
    function has_roles($roles, $user = null)
    {
        $user = $user ? $user : Auth::user();
        $roles = !is_array($roles) ? [$roles] : $roles;

        return in_array($user->role, $roles);
    }
}

// Alias
if (!function_exists('has_role')) {
    function has_role($roles, $user = null)
    {
        return has_roles($roles, $user);
    }
}
