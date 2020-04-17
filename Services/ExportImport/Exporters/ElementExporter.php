<?php

namespace Modules\Extranet\Services\ExportImport\Exporters;

use Modules\Extranet\Entities\Element;
use Modules\Extranet\Entities\ElementAttribute;
use Modules\Extranet\Entities\ElementField;
use Modules\Extranet\Services\ElementTemplate\Entities\ElementTemplate;
use Modules\Extranet\Services\ElementTemplate\Entities\ElementTemplateField;
use Modules\Extranet\Services\ExportImport\Interfaces\ModelExporterInterface;

class ElementExporter extends Exporter implements ModelExporterInterface
{
    public $structure = [
        'model' => Element::class,
        'relations' => [
            'fields' => ElementField::class,
            'attrs' => ElementAttribute::class,
            'templates' => [
                'model' => ElementTemplate::class,
                'relations' => [
                    'fields' => ElementTemplateField::class,
                ],
            ],
        ],
    ];
}
