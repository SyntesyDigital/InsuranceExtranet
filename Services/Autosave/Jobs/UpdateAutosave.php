<?php

namespace Modules\Extranet\Services\Autosave\Jobs;

use Modules\Extranet\Services\Autosave\Codecs\FormCodec;
use Modules\Extranet\Services\Autosave\Traits\AutosaveVeosQuery;

class UpdateAutosave
{
    use AutosaveVeosQuery;

    public function __construct($attributes)
    {
        $this->attributes = array_only($attributes, [
            'codec',
            'payload'
        ]);
    }

    public function handle()
    {
        switch($this->attributes['codec']) {
            case 'form':
                    return $this->save('update', FormCodec::encode($this->attributes['payload']));
                break;
        }

        return false;
    }
}
