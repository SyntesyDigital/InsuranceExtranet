<?php

namespace Modules\Extranet\Services\ElementModelLibrary\Tests\Feature;

use Modules\Extranet\Services\ElementModelLibrary\Entities\ElementModel;
use Modules\Extranet\Services\ElementModelLibrary\Entities\ModelProcedure;
use Modules\Extranet\Services\ElementModelLibrary\Entities\Service;
use Modules\Extranet\Services\ElementModelLibrary\Tests\TestCase;

class ElementModelLibraryTest extends TestCase
{
    public function testIfPhpUnitIsWorking()
    {
        return $this->assertTrue(true);
    }

    public function testDuplicationStrategy()
    {
        $service = Service::create([
            'identifier' => 'service-1',
            'name' => 'Service 1',
            'http_method' => 'POST',
            'url' => 'http://..',
            'boby' => 'LE_BOBY',
            'json' => '{}',
            'response' => 'response',
            'comment' => '...',
        ]);

        $this->assertTrue($service ? true : false);
        $this->assertTrue($service->duplicate());
    }

    public function testRelations()
    {
        $service = Service::create([
            'identifier' => 'service-1',
            'name' => 'Service 1',
            'http_method' => 'POST',
            'url' => 'http://..',
            'boby' => 'LE_BOBY',
            'json' => '{}',
            'response' => 'response',
            'comment' => '...',
        ]);

        $elementModel = ElementModel::create([
            'identifier' => 'element-model',
            'name' => 'Element model',
            'description' => '',
            'icon' => '',
            'type' => '',
        ]);

        $modelProcedure = ModelProcedure::create([
            'service_id' => $service->id,
            'model_id' => $elementModel->id,
            'name' => 'procedure 1',
            'configurable' => 1,
            'required' => 1,
            'repeatable' => 0,
            'repeatable_json' => '',
        ]);

        $this->assertEquals($service->name, $modelProcedure->service->name);
        $this->assertEquals($elementModel->name, $modelProcedure->elementModel->name);
        $this->assertEquals(ElementModel::first()->procedures()->first()->name, $modelProcedure->name);
    }
}
