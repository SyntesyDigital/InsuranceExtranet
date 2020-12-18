<?php 

namespace Modules\Extranet\Services\Autosave\Codecs;

interface CodecInterface
{
    public static function encode($payload);

    public static function decode($payload);
}

