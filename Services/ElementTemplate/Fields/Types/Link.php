<?php

namespace Modules\Extranet\Services\ElementTemplate\Fields\Types;

use Modules\Extranet\Services\ElementTemplate\Fields\Field;
use Modules\Extranet\Services\ElementTemplate\Fields\FieldInterface;

use Modules\Architect\Entities\Content;
use Modules\Extranet\Services\ElementTemplate\Entities\ElementTemplate;
use Modules\Extranet\Services\ElementTemplate\Entities\ElementTemplateField;
use Modules\Architect\Entities\Language;

class Link extends Field implements FieldInterface
{
    public $type = 'link';
    public $icon = 'fas fa-link';
    public $name = 'LINK';

    public $rules = [
        'required'
    ];

    public $settings = [
      'htmlId',
      'htmlClass',
      'buttonType',
      'stageOperation'
    ];

    public function validate($request)
    {}

    public function save(ElementTemplate $template, $identifier, $values, $languages = null)
    {
        $languages = Language::getAllCached();

        // Save father field
        $field = ElementTemplateField::create([
            'name' => $identifier,
            'value' => '',
            'template_id' => $template->id
        ]);

        if(!$field) {
            return false;
        }

        // Save TITLE child fields
        if(isset($values['title'])) {
            foreach($values['title'] as $iso => $value) {
                $language = $this->getLanguageFromIso($iso, $languages);

                $template->fields()->save(new ElementTemplateField([
                    'name' => $identifier . '.title',
                    'value' => $value,
                    'language_id' => isset($language->id) ? $language->id : null,
                    'parent_id' => $field->id
                ]));
            }
        }

        // Save URL child fields
        if(isset($values['url'])) {
            foreach($values['url'] as $iso => $value) {
                $language = $this->getLanguageFromIso($iso, $languages);

                $template->fields()->save(new ElementTemplateField([
                    'name' => $identifier . '.url',
                    'value' => $value,
                    'language_id' => isset($language->id) ? $language->id : null,
                    'parent_id' => $field->id
                ]));
            }
        }

        // Save CONTENT child field
        $contentId = (isset($values['content'])) && isset($values['content']['id'])
            ? $values['content']['id']
            : null;

        if($contentId) {
            $template->fields()->save(new ElementTemplateField([
                'name' => $identifier . '.content',
                'value' => $contentId,
                'parent_id' => $field->id,
                'relations' => 'contents'
            ]));
        }

        return true;
    }

}
?>
