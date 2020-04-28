<?php

namespace Modules\Extranet\Services\ExportImport\Exporters;

use Modules\Extranet\Entities\Element;
use Modules\Extranet\Entities\ElementAttribute;
use Modules\Extranet\Entities\ElementField;
use Modules\Extranet\Services\ElementModelLibrary\Entities\ElementModel;
use Modules\Extranet\Services\ElementModelLibrary\Entities\ModelField;
use Modules\Extranet\Services\ElementModelLibrary\Entities\ModelProcedure;
use Modules\Extranet\Services\ElementModelLibrary\Entities\Service;
use Modules\Extranet\Services\ElementTemplate\Entities\ElementTemplate;
use Modules\Extranet\Services\ElementTemplate\Entities\ElementTemplateField;
use Modules\Extranet\Services\ExportImport\Exporters\Filters\ClearHasModal;
use Modules\Extranet\Services\ExportImport\Exporters\Filters\ClearHasRoute;
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

            'elementModel' => [
                'model' => ElementModel::class,
                'relations' => [
                    'procedures' => [
                        'model' => ModelProcedure::class,
                        'relations' => [
                            'fields' => ModelField::class,
                            'service' => Service::class,
                        ],
                    ],
                ],
            ],
        ],
    ];

    public $modelsFilters = [
        ElementField::class => [
            'settings' => [
                ClearHasRoute::class,
                ClearHasModal::class,
            ],
        ],
    ];
}
