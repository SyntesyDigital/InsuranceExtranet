<?php

namespace Modules\Extranet\Rules\String;

class ContainSpecialChar
{
    public static function satisfy($string)
    {
        return (bool) preg_match('/[\'^£$%&*()}{@#~?><>,|=_+¬-]/', $string);
    }
}
