<?php

namespace Modules\Extranet\Services\Currency\Tests\Feature;

use Modules\Extranet\Services\Currency\Entities\Currency;
use Modules\Extranet\Services\Currency\Jobs\CreateCurrency;
use Modules\Extranet\Services\Currency\Tests\TestCase;

class CurrencyTest extends TestCase
{
    public function testIfPhpUnitIsWorking()
    {
        return $this->assertTrue(true);
    }

    public function testCreating()
    {

        $fields = [
            'code' => 'usd',
            'label' => 'US Dollar',
            'symbole' => '$',
            'symbole_position' => 'R',
            'decimals' => 2,
            'decimals_separator' => '.',
            'thousands_separator' => null,
            'default' => false
        ];

        $currency = dispatch_now(new CreateCurrency($fields));

        $this->assertTrue($currency ? true : false);
    }

}
