<?php

if (!function_exists('allowed_link')) {
    function allowed_link($link)
    {
        if (has_roles([ROLE_USER])) {
            $pages = Auth::user()->allowed_pages;

            if (empty($pages)) {
                return true;
            }

            $content = isset($link['link']['content'])
                ? $link['link']['content']
                : null;

            if ($content) {
                $slug = $content->getField('slug');

                if (isset($pages->{$slug})) {
                    return $pages->{$slug};
                }

                if (isset($pages->{$content->url})) {
                    return $pages->{$content->url};
                }
            }
        }

        return true;
    }
}