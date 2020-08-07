<?php

namespace Modules\Extranet\Services\Currency\Jobs;

use Modules\Extranet\Http\Requests\Currency\UpdateCurrencyRequest;

use Modules\Extranet\Services\Currency\Entities\Currency;


class UpdateCurrency
{
    public function __construct(Currency $currency, $attributes)
    {
        $this->currency = $currency;

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

    public static function fromRequest(Currency $currency, UpdateCurrencyRequest $request)
    {
        return new self($currency, $request->all());
    }

    public function handle()
    {
        $this->currency->update($attributes);

        return $this->currency;
    }
}
