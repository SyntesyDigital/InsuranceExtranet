<?php

namespace Modules\Extranet\Rules\String;

class ContainUpperCaseChar
{
    public static function satisfy($string)
    {
        return (bool) preg_match('/[A-Z]/', $string);
    }
}
