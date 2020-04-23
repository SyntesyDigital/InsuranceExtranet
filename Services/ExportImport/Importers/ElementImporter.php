<?php

namespace Modules\Extranet\Services\ExportImport\Importers;

use Modules\Extranet\Services\ElementModelLibrary\Entities\ElementModel;
use Modules\Extranet\Services\ElementModelLibrary\Entities\ModelProcedure;
use Modules\Extranet\Services\ElementModelLibrary\Entities\Service;
use Modules\Extranet\Services\ExportImport\Interfaces\ModelImporterInterface;

class ElementImporter extends Importer implements ModelImporterInterface
{
    public $duplicateIfNotExists = [
        ElementModel::class => 'identifier',
        ModelProcedure::class => 'identifier',
        Service::class => 'identifier',
    ];
}
