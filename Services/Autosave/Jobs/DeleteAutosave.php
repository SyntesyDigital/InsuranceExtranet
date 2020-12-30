<?php

namespace Modules\Extranet\Services\Autosave\Jobs;

use Modules\Extranet\Services\Autosave\Codecs\FormCodec;
use Modules\Extranet\Services\Autosave\Traits\AutosaveVeosQuery;

class DeleteAutosave
{
    use AutosaveVeosQuery;

    public function __construct($attributes)
    {
        $this->attributes = array_only($attributes, [
            'key'
        ]);
    }

    public function handle()
    {
        return $this->attributes['key']
            ? $this->delete($this->attributes['key'])
            : false;
    }
}
