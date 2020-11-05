<?php

namespace Modules\Extranet\Services\ElementTemplate\Fields\Types;

use Modules\Extranet\Services\ElementTemplate\Fields\Field;
use Modules\Extranet\Services\ElementTemplate\Fields\FieldInterface;

class TextArea extends Field implements FieldInterface
{
    public $type = 'textarea';
    public $icon = 'fa-font';
    public $name = 'TEXTAREA';

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
        'conditionalVisibility',
    ];
}
