<?php

namespace Modules\Extranet\Services\Currency\Jobs;

use Modules\Extranet\Services\Currency\Entities\Currency;
use Modules\Extranet\Http\Requests\Currency\DeleteCurrencyRequest;

class DeleteCurrency
{
    public function __construct(Currency $currency)
    {
        $this->currency = $currency;
    }

    public static function fromRequest(Currency $currency, DeleteCurrencyRequest $request)
    {
        return new self($currency);
    }

    public function handle()
    {
        return $this->currency->delete() ? $this->currency : null;
    }
}
