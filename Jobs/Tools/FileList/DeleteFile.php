<?php

namespace Modules\Extranet\Jobs\Tools\FileList;

use Storage;

class DeleteFile
{
    public function __construct($filename)
    {
        $this->filename = $filename;
    }

    public function handle()
    {
        return Storage::delete('public/filelist/'.$this->filename);
    }
}
