<?php

namespace Modules\Extranet\Rules\String;

class ContainNumberOfChars
{
    public static function satisfy($string, $length = 1)
    {
        return strlen($string) >= $length;
    }
}
