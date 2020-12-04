<?php

namespace Modules\Extranet\Services\Autosave\Jobs;

use Modules\Extranet\Services\Autosave\Codecs\FormCodec;
use Modules\Extranet\Services\Autosave\Traits\AutosaveQuery;

class ReadAutosave
{
    use AutosaveQuery;

    public function __construct($attributes)
    {
        $this->attributes = array_only($attributes, [
            'codec',
            'id'
        ]);
    }

    public function handle()
    {
        $response = $this->save('create', $this->attributes['id']);

        switch($this->attributes['codec']) {
            case 'form':
                    return FormCodec::decode($response);
                break;
        }

        return null;
    }
}
