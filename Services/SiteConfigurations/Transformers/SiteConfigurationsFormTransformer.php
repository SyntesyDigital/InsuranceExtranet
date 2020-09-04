<?php

namespace Modules\Extranet\Services\SiteConfigurations\Transformers;

use Illuminate\Http\Resources\Json\Resource;

class SiteConfigurationsFormTransformer extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     *
     * @return array
     */
    public function toArray($request = null)
    {
        return $this->resource ? $this->getSiteConfigurationsFieldsArray($this->resource->fields()->pluck('value', 'name')) : null;
    }

    public function toJson($request = null)
    {
        return json_encode($this->toArray($request));
    }

    public function getSiteConfigurationsFieldsArray($fields)
    {
        $info = [];
        foreach ($fields as $key => $value) {
            $siteConfigurationField = json_decode($value);
            $info[$key] = $siteConfigurationField;
            if ($siteConfigurationField->type == 'image') {
                $info[$key]->value = Media::find($siteConfigurationField->value);
            }
        }

        return $info;
    }
}
