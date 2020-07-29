<?php

if (!function_exists('get_page_link')) {
    function get_page_link($url, $parameters)
    {
        $page = Modules\Architect\Entities\Content::findByUrl($url);

        if ($page) {
            if ($page->routesParameters) {
                $params = [];
            } else {
                parse_str($parameters, $params);
            }

            foreach ($page->routesParameters as $param) {
                if (isset($_GET[$param->identifier])) {
                    $params[$param->identifier] = $_GET[$param->identifier];
                }
            }

            return sprintf('%s?%s', $page->url, http_build_query($params));
        }

        return $url.'?'.$parameters;
    }
}
