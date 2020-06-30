<?php

namespace Modules\Extranet\Services\ElementTemplate\Fields\Types;

use Modules\Extranet\Services\ElementTemplate\Fields\Field;
use Modules\Extranet\Services\ElementTemplate\Fields\FieldInterface;

class Icon extends Field implements FieldInterface
{
    public $type = 'icon';
    public $icon = 'fas fa-icons';
    public $name = 'ICON';

    public $rules = [
        'required',
        'unique',
        'maxCharacters',
        'minCharacters',
    ];

    public $settings = [
        'htmlId',
        'htmlClass',
    ];
}
