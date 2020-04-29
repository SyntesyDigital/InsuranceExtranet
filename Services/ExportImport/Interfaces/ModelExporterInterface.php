<?php

namespace Modules\Extranet\Services\ExportImport\Interfaces;

interface ModelExporterInterface
{
    public function export();

    public function __construct($model);
}
