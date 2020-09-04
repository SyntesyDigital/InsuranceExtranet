<?php

namespace Modules\Extranet\Services\SiteConfigurations\Jobs;

use Cache;
use Illuminate\Http\Request;
use Modules\Extranet\Services\SiteConfigurations\Entities\SiteConfiguration;
use Modules\Extranet\Services\SiteConfigurations\Transformers\SiteConfigurationsFormTransformer;

class UpdateSiteConfiguration
{
    public function __construct(SiteConfiguration $siteConfiguration, $attributes)
    {
        $this->siteConfiguration = $siteConfiguration;
        $this->attributes = array_only($attributes, [
             'fields',
         ]);
    }

    public static function fromRequest(SiteConfiguration $siteConfiguration, Request $request)
    {
        return new self($siteConfiguration, $request->all());
    }

    public function handle()
    {
        $this->saveFields();

        $seconds = 24 * 3600;
        $storedSiteConfigurations = (new SiteConfigurationsFormTransformer($this->siteConfiguration))->toArray();
        Cache::put($this->siteConfiguration->identifier.'SiteConfigurations', $storedSiteConfigurations, $seconds);

        return $this->siteConfiguration;
    }

    public function saveFields()
    {
        $this->siteConfiguration->fields()->delete();

        foreach ($this->attributes['fields'] as $key => $field) {
            $info = [];
            $identifier = $key;
            $info['type'] = isset($field['type']) ? $field['type'] : null;
            if ($info['type'] == 'image') {
                $info['value'] = isset($field['value']) && isset($field['value']['id']) ? $field['value']['id'] : null;
            } else {
                $info['value'] = isset($field['value']) ? $field['value'] : null;
            }

            $this->siteConfiguration->fields()->create([
              'language_id' => 1,
              'name' => $identifier,
              'value' => json_encode($info),
            ]);
        }
    }
}
