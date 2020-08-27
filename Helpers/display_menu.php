<?php

if (!function_exists('get_menu')) {
    function get_menu($key)
    {
        $cacheKey = sprintf('menu_%s', $key);

        if (Cache::has($cacheKey)) {
            return Cache::get($cacheKey);
        }

        $menu = Modules\Architect\Entities\Menu::hasName($key)->first();

        if (!isset($menu)) {
            return null;
        }

        if (!$menu) {
            return null;
        }

        $menuRepository = App::make('Modules\Architect\Repositories\MenuRepository');
        $menuTree = $menuRepository->getDisplayTree($menu);

        Cache::forever($cacheKey, $menuTree);

        return $menuTree;
    }
}

if (!function_exists('format_link')) {
    function format_link($menuElement)
    {
        if (!isset($menuElement['name'][App::getLocale()]) || $menuElement['name'][App::getLocale()] == '') {
            return null;
        }

        $target = null;
        $url = '';
        $icon = null;

        if (isset($menuElement['link']['url']) && isset($menuElement['link']['url'][App::getLocale()])) {
            $url = $menuElement['link']['url'][App::getLocale()];
            $target = '_blank';
        } elseif (isset($menuElement['link']['content'])) {
            $url = $menuElement['link']['content']->url;
        } else {
            return null;
        }

        if (isset($menuElement['settings']['icon'])) {
            $icon = $menuElement['settings']['icon'];
        }

        foreach ($menuElement['children'] as $index => $child) {
            $menuElement['children'][$index] = format_link($child);
        }

        return [
            'url' => $url,
            'request_url' => substr($url, 1),
            'name' => $menuElement['name'][App::getLocale()],
            'class' => isset($menuElement['settings']['htmlClass']) ? $menuElement['settings']['htmlClass'] : '',
            'id' => isset($menuElement['settings']['htmlId']) ? $menuElement['settings']['htmlId'] : '',
            'target' => $target,
            'icon' => $icon,
            'children' => $menuElement['children'],
            'active' => Request::is(substr($url, 1)) ? true : false,
        ];
    }
}