<?php

namespace Modules\Extranet\Services\ElementModelLibrary\Duplicators;

use Illuminate\Database\Eloquent\Model;

class ModelProcedureDuplicator implements ModelDuplicatorInterface
{
    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    public function handle()
    {
        return true;
    }
}
