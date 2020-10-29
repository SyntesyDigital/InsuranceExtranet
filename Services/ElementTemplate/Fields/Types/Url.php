<?php

namespace Modules\Extranet\Services\ElementTemplate\Fields\Types;

use Modules\Extranet\Services\ElementTemplate\Fields\Field;
use Modules\Extranet\Services\ElementTemplate\Fields\FieldInterface;

use Modules\Architect\Entities\Content;
use Modules\Extranet\Services\ElementTemplate\Entities\ElementTemplate;
use Modules\Extranet\Services\ElementTemplate\Entities\ElementTemplateField;
use Modules\Architect\Entities\Language;


class Url extends Field implements FieldInterface
{
    public $type = 'url';
    public $icon = 'fas fa-external-link-alt';
    public $name = 'URL';

    public $rules = [
        'required'
    ];

    public $settings = [
      'htmlId',
      'htmlClass'
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
            'content_id' => $template->id
        ]);

        if(!$field) {
            return false;
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
        else {

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
        }

        return true;
    }
}
