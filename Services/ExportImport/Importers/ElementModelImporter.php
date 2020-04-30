<?php

namespace Modules\Extranet\Services\ExportImport\Importers;

use Modules\Extranet\Services\ElementModelLibrary\Entities\ElementModel;
use Modules\Extranet\Services\ExportImport\Interfaces\ModelImporterInterface;

class ElementModelImporter extends Importer implements ModelImporterInterface
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
}
