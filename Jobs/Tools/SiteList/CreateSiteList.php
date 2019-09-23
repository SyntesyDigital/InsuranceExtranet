<?php

namespace Modules\Extranet\Jobs\Tools\SiteList;

use Modules\Extranet\Http\Requests\Admin\Tools\SiteList\CreateSiteListRequest;
use Modules\Extranet\Entities\Tools\SiteList;

class CreateSiteList
{
    public function __construct(array $attributes = [])
    {
        $this->attributes = array_only($attributes, [
            'identifier',
            'name',
            'type',
            'value',
        ]);
    }

    public static function fromRequest(CreateSiteListRequest $request)
    {
        return new self($request->all());
    }

    public function handle()
    {
        return SiteList::create($this->attributes);
    }
}
