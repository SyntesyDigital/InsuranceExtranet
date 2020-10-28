<?php

namespace Modules\Extranet\Rules\String;

class ContainNumberChar
{
    public static function satisfy($string)
    {
        return (bool) preg_match('/[0-9]/', $string);
    }
}
