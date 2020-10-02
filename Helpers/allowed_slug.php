<?php

if (!function_exists('allowed_slug')) {
    function allowed_slug($slug)
    {
        if (has_roles([ROLE_USER])) {
            $pages = Auth::user()->allowed_pages;

            if (empty($pages)) {
                return true;
            }

            if (isset($pages->{$slug})) {    
                return $pages->{$slug};
            }
        }

        return true;
    }
}