<?php

namespace Modules\Extranet\Services\Currency\Jobs;

use Modules\Extranet\Services\Currency\Entities\Currency;
use Modules\Extranet\Http\Requests\Currency\CreateCurrencyRequest;

class CreateCurrency
{
    public function __construct($attributes)
    {
        $fields = [
            'code',
            'label',
            'symbole',
            'symbole_position',
            'decimals',
            'decimals_separator',
            'thousands_separator',
            'default'
        ];

        $this->attributes = array_only($attributes['fields'], $fields);
    }

    public static function fromRequest(CreateCurrencyRequest $request)
    {
        return new self($request->all());
    }

    public function handle()
    {
        $currency = Currency::create($this->attributes);

        return $currency;
    }
}
