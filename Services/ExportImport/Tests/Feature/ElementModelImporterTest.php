<?php

namespace Modules\Extranet\Services\ExportImport\Tests\Feature;

use Modules\Extranet\Services\ElementModelLibrary\Entities\ElementModel;
use Modules\Extranet\Services\ElementModelLibrary\Entities\ModelField;
use Modules\Extranet\Services\ElementModelLibrary\Entities\ModelProcedure;
use Modules\Extranet\Services\ElementModelLibrary\Entities\Service;
use Modules\Extranet\Services\ExportImport\Exporters\ElementModelExporter;
use Modules\Extranet\Services\ExportImport\Importers\ElementModelImporter;
use Modules\Extranet\Services\ExportImport\Tests\TestCase;

class ElementModelImporterTest extends TestCase
{
    public function createModels()
    {
        $elementModel = ElementModel::create([
            'identifier' => 'TESTPHPUNIT',
            'name' => 'TESTPHPUNIT',
            'description' => 'PHPunit test',
            'icon' => 'fas fa-calculator',
            'type' => 'form-v2',
            'ws' => null,
            'ws_format' => null,
            'filtres' => null,
            'example' => null,
            'def1' => null,
            'def2' => null,
        ]);

        $service = Service::create([
            'identifier' => 'TARIFPOST',
            'name' => 'tarif',
            'http_method' => 'POST',
            'url' => 'tarif',
            'boby' => '',
            'json' => '',
            'response' => 'statusCode',
            'comment' => 'tarification',
            'response_json' => null,
        ]);

        $procedure = ModelProcedure::create([
            'service_id' => $service->id,
            'model_id' => $elementModel->id,
            'name' => 'recup infos personne connectée',
            'order' => 1,
            'configurable' => 0,
            'required' => 1,
            'repeatable' => 0,
            'repeatable_json' => null,
            'repeatable_jsonpath' => '$.',
            'preload' => 0,
        ]);

        ModelField::create([
            'procedure_id' => $procedure->id,
            'name' => 'Locataire 3 : statut',
            'identifier' => "['INFOPOL.LOC3STATUT']",
            'type' => 'CTE',
            'format' => 'text',
            'default_value' => null,
            'boby' => 'WS_EXT2_SEL_STATUTLOC',
            'jsonpath' => null,
            'example' => 'CDI',
            'required' => 0,
            'configurable' => 1,
            'visible' => 1,
        ]);
    }

    public function testExport()
    {
        $this->createModels();

        // Get clean procedure array
        $arr = ModelProcedure::first()->toArray();
        array_forget($arr, 'id');
        array_forget($arr, 'service_id');
        array_forget($arr, 'model_id');
        array_forget($arr, 'updated_at');
        array_forget($arr, 'created_at');

        // Export element
        $exporter = new ElementModelExporter(ElementModel::first());
        $export = $exporter->export();

        // Test Procedure created with exported
        $this->assertTrue(md5(json_encode($arr, JSON_NUMERIC_CHECK)) == md5(json_encode($export['relations']['procedures'][0]['attributes'], JSON_NUMERIC_CHECK)));
    }

    public function testImport()
    {
        $this->createModels();

        // Export element
        $exporter = new ElementModelExporter(ElementModel::first());
        $export = $exporter->export();

        // Import
        $importer = new ElementModelImporter(json_encode($export, JSON_NUMERIC_CHECK));
        $importer->import();

        $this->assertTrue(ElementModel::count() == 2);
    }

    public function testSameServiceImport()
    {
        $this->createModels();

        // Export element
        $exporter = new ElementModelExporter(ElementModel::first());
        $export = $exporter->export();

        // Import
        $importer = new ElementModelImporter(json_encode($export, JSON_NUMERIC_CHECK));
        $importer->import();

        $this->assertTrue(Service::count() == 1);
    }
}
