<?php

namespace Modules\Extranet\Services\Autosave\Jobs;

use Modules\Extranet\Services\Autosave\Codecs\FormCodec;
use Modules\Extranet\Services\Autosave\Traits\AutosaveVeosQuery;

class ReadAutosave
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
        $response = $this->read($this->attributes['payload']['key'], 'BASKET');
        $beans = isset($response->responses) && isset($response->responses[0]) && $response->responses[0]->beans 
            ? $response->responses[0]->beans[0] 
            : [];

        if(!$beans) {
            return [];
        } 

        switch($this->attributes['codec']) {
            case 'form':
                    return FormCodec::decode($beans, $this->attributes['payload']['key']);
                break;
        }

        return [];
    }
}
