<?php

if (!function_exists('get_config_object')) {
    function get_config_object($group = 'general')
    {
        $storedSiteConfigurations = \Cache::get($group.'SiteConfigurations');
        
        if (!$storedSiteConfigurations) {
            $seconds = 24 * 3600;
            $siteConfiguration = \Modules\Extranet\Services\SiteConfigurations\Entities\SiteConfiguration::where('identifier', $group)->first();
            $storedSiteConfigurations = (new \Modules\Extranet\Services\SiteConfigurations\Transformers\SiteConfigurationsFormTransformer($siteConfiguration))->toArray();
            \Cache::put($group.'SiteConfigurations', $storedSiteConfigurations, $seconds);
        }
        
        return $storedSiteConfigurations;
    }
}
