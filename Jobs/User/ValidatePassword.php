<?php

namespace Modules\Extranet\Jobs\User;

class ValidatePassword
{
    public function __construct(array $attributes)
    {
        $this->attributes = array_only($attributes, [
            'password',
        ]);
    }

    public static function fromRequest(Request $request)
    {
        return new self($request->all());
    }

    public function handle()
    {
        
    }
}
