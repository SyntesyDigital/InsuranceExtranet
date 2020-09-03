<?php

if (!function_exists('get_site_configuration')) {
    function get_site_configuration($identifier, $group = 'general')
    {
        $storedSiteConfigurations = \Cache::get($group.'siteConfigurations');

        if (!$storedSiteConfigurations) {
            $seconds = 24 * 3600;
            $siteConfiguration = \Modules\Extranet\Services\SiteConfigurations\Entities\SiteConfiguration::where('identifier', $group)->first();
            $storedSiteConfigurations = (new \Modules\Extranet\Services\SiteConfigurations\Transformers\SiteConfigurationsFormTransformer($siteConfiguration))->toArray();
            \Cache::put($group.'siteConfigurations', $storedSiteConfigurations, $seconds);
        }

        return isset($storedSiteConfigurations[$identifier])
            ? $storedSiteConfigurations[$identifier]->value
            : config('siteConfigurations.default')[$identifier];
    }
}
