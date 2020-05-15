<?php

namespace Modules\Extranet\Services\ExportImport\Exporters;

use Modules\Extranet\Services\ElementModelLibrary\Entities\Service;
use Modules\Extranet\Services\ExportImport\Interfaces\ModelExporterInterface;

use Modules\Extranet\Entities\Element;
use Modules\Extranet\Entities\ElementAttribute;
use Modules\Extranet\Entities\ElementField;
use Modules\Extranet\Services\ElementModelLibrary\Entities\ElementModel;
use Modules\Extranet\Services\ElementModelLibrary\Entities\ModelField;
use Modules\Extranet\Services\ElementModelLibrary\Entities\ModelProcedure;
use Modules\Extranet\Services\ElementTemplate\Entities\ElementTemplate;
use Modules\Extranet\Services\ElementTemplate\Entities\ElementTemplateField;
use Modules\Extranet\Services\ExportImport\Exporters\Filters\ClearHasModal;
use Modules\Extranet\Services\ExportImport\Exporters\Filters\ClearHasRoute;


class ElementModelExporter extends Exporter implements ModelExporterInterface
{
    public $structure = [
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
    ];
}
