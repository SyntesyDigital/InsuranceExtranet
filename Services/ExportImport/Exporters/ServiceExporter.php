<?php

namespace Modules\Extranet\Services\ExportImport\Exporters;

use Modules\Extranet\Services\ElementModelLibrary\Entities\Service;
use Modules\Extranet\Services\ExportImport\Interfaces\ModelExporterInterface;

class ServiceExporter extends Exporter implements ModelExporterInterface
{
    public $structure = [
        'model' => Service::class,
    ];
}
