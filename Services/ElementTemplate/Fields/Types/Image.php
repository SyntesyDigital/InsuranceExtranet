<?php

namespace Modules\Extranet\Services\ElementTemplate\Fields\Types;

use Modules\Extranet\Services\ElementTemplate\Fields\Field;
use Modules\Extranet\Services\ElementTemplate\Fields\FieldInterface;
use Modules\Extranet\Services\ElementTemplate\Entities\ElementTemplate;
use Modules\Extranet\Services\ElementTemplate\Entities\ElementTemplateField;

class Image extends Field implements FieldInterface
{
    public $type = 'image';
    public $icon = 'fa-image';
    public $name = 'IMAGE';

    public $rules = [
        'required'
    ];

    public $settings = [
        'cropsAllowed',
        'htmlId',
        'htmlClass'
    ];

    public function save(ElementTemplate $template, $identifier, $media, $languages = null)
    {
        $mediaId = isset($media['id']) ? $media['id'] : null;

        if($mediaId) {
            return $template->fields()->save(new ElementTemplateField([
                'name' => $identifier,
                'value' => $mediaId,
                'relation' => 'medias'
            ]));
        }

        return false;
    }

}
?>
