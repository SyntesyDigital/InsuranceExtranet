<?php

namespace Modules\Extranet\Services\ElementModelLibrary\Tests\Feature;

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
            'response' => 'response',
            'comment' => '...',
        ]);

        $this->assertTrue($service ? true : false);
        $this->assertTrue($service->duplicate());
    }
}
