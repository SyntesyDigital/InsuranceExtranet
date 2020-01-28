<?php

namespace Modules\Extranet\Services\ElementModelLibrary\Duplicators;

use Illuminate\Database\Eloquent\Model;

interface ModelDuplicatorInterface
{
    public function __construct(Model $model);

    public function handle();
}
