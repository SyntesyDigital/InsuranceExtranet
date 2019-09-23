<?php

namespace Modules\Extranet\Jobs\Tools\FileList;

use Modules\Extranet\Http\Requests\Admin\Tools\SiteList\UpdateSiteListRequest;
use Modules\Extranet\Entities\Tools\SiteList;

class UpdateFileList
{
    private $fields = [
            'identifier',
            'name',
            'type',
            'value',
    ];

    public function __construct(SiteList $sitelist, array $attributes = [])
    {
        $this->attributes = array_only($attributes, $this->fields);
        $this->sitelist = $sitelist;
    }

    public static function fromRequest($sitelist, UpdateSiteListRequest $request)
    {
        return new self($sitelist, $request->all());
    }

    public static function fromSort($sitelist, $value)
    {
        $attr = [
                'identifier' => $sitelist->identifier,
                'name' => $sitelist->name,
                'type' => $sitelist->type,
                'value' => $value,
                ];

        return new self($sitelist, $attr);
    }

    public function handle()
    {
        $this->sitelist->update($this->attributes);

        return true;
    }
}
