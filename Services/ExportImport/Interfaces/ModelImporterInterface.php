<?php

namespace Modules\Extranet\Services\ExportImport\Interfaces;

interface ModelImporterInterface
{
    public function import();

    public function __construct($payload);
}
