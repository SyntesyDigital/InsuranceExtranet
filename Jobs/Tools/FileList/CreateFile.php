<?php

namespace Modules\Extranet\Jobs\Tools\FileList;

use Modules\Extranet\Http\Requests\Admin\Tools\FileList\CreateFileRequest;

class CreateFile
{
    public function __construct($file)
    {
        $this->file = $file;
    }

    public static function fromRequest(CreateFileRequest $request)
    {
        return new self($request->file('file'));
    }

    public function handle()
    {
        $filePath = $this->file->store('public/filelist');

        if ($filePath) {
            return ['path' => str_replace('public/filelist/', '', $filePath),
                         'date' => date('Y-m-d'), ];
        } else {
            return false;
        }
    }
}
