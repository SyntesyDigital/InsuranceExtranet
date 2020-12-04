<?php

namespace Modules\Extranet\Services\Autosave\Jobs;

use Modules\Extranet\Services\Autosave\Codecs\FormCodec;
use Modules\Extranet\Services\Autosave\Traits\AutosaveQuery;

class CreateAutosave
{
    use AutosaveQuery;

    public function __construct($attributes)
    {
        $this->attributes = array_only($attributes, [
            'codec',
            'payload'
        ]);
    }

    public function handle()
    {
        // Create ID
        $this->attributes['payload']['key'] = uniqid();

        switch($this->attributes['codec']) {
            case 'form':
                    $payload = FormCodec::encode($this->attributes['payload']);
                break;
        }

        return $this->save('create', $payload);
    }
}
