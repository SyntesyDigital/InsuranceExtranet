<?php

namespace Modules\Extranet\Rules\String;

class ContainLowerCaseChar
{
    public static function satisfy($string)
    {
        return (bool) preg_match('/[a-z]/', $string);
    }
}
