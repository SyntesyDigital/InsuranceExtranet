<?php

namespace Modules\Extranet\Services\ElementTemplate\Fields\Types;

use Modules\Extranet\Services\ElementTemplate\Fields\Field;
use Modules\Extranet\Services\ElementTemplate\Fields\FieldInterface;

class Text extends Field implements FieldInterface
{
    public $type = 'text';
    public $icon = 'fa-font';
    public $name = 'TEXT';

    public $rules = [
        'required',
        'unique',
        'maxCharacters',
        'minCharacters',
    ];

    public $settings = [
        'entryTitle',
        'htmlId',
        'htmlClass',
    ];
}
