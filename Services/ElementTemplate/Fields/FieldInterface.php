<?php

namespace Modules\Extranet\Services\ElementTemplate\Fields;

use Modules\Extranet\Services\ElementTemplate\Entities\ElementTemplate;

interface FieldInterface
{
    public function save(ElementTemplate $template, $identifier, $values, $languages = null);

    public function getRules();
}

