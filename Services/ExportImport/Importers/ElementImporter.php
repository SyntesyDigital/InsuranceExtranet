<?php

namespace Modules\Extranet\Services\ExportImport\Importers;

use Modules\Extranet\Entities\ElementAttribute;
use Modules\Extranet\Entities\ElementField;
use Modules\Extranet\Services\ElementModelLibrary\Entities\ElementModel;
use Modules\Extranet\Services\ElementTemplate\Entities\ElementTemplate;
use Modules\Extranet\Services\ElementTemplate\Entities\ElementTemplateField;
use Modules\Extranet\Services\ExportImport\Interfaces\ModelImporterInterface;

class ElementImporter extends Importer implements ModelImporterInterface
{
    public $duplicateIfNotExists = [
        ElementModel::class => [
            'field' => 'identifier',
            'relations' => [
                'procedures',
                'procedures.fields',
                'procedures.service',
            ],
        ],
    ];

    /**
     * import.
     *
     * @return void
     */
    public function import()
    {
        $nodes = json_decode($this->payload, true);

        // Create Model
        $element = $this->createModel($nodes);

        // Save fields
        foreach ($nodes['relations']['fields'] as $node) {
            $element->fields()->save(new ElementField($node));

            $this->reportCreatedObject(new ElementField($node));
        }

        // Save attributes
        foreach ($nodes['relations']['attrs'] as $node) {
            $element->attrs()->save(new ElementAttribute($node));

            $this->reportCreatedObject(new ElementAttribute($node));
        }

        // Save templates
        foreach ($nodes['relations']['templates'] as $node) {
            $template = ElementTemplate::create(array_merge($node['attributes'], [
                'element_id' => $element->id,
            ]));

            $this->reportCreatedObject($template);

            foreach ($node['relations']['fields'] as $field) {
                $template->fields()->save(new ElementTemplateField($field));

                $this->reportCreatedObject(new ElementTemplateField($field));
            }
        }

        // Save Element Model
        $class = $nodes['relations']['elementModel']['model'];
        $attributes = $nodes['relations']['elementModel']['attributes'];
        $object = new $class($attributes);

        // Save element model if not exist
        if (!$this->checkIfObjectExist(true, $object, $nodes['relations']['elementModel'])) {
            $elementImporter = new ElementModelImporter(json_encode($nodes['relations']['elementModel'], JSON_NUMERIC_CHECK));
            $elementImporter->import();
        }
    }
}
