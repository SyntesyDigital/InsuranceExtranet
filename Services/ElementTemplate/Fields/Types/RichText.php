<?php

namespace Modules\Extranet\Services\ElementTemplate\Fields\Types;

use Modules\Extranet\Services\ElementTemplate\Fields\Field;
use Modules\Extranet\Services\ElementTemplate\Fields\FieldInterface;

class Richtext extends Field implements FieldInterface
{
    public $type = 'richtext';
    public $icon = 'fa-align-left';
    public $name = 'RICHTEXT';

    public $rules = [
        'required',
        'maxCharacters',
    ];

    public $settings = [
        'fieldHeight',
        'htmlId',
        'htmlClass'
    ];
}
?>
