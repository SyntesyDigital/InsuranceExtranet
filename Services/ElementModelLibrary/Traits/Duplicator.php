<?php

namespace Modules\Extranet\Services\ElementModelLibrary\Traits;

trait Duplicator
{
    public function duplicate()
    {
        return (new $this->duplicator($this))->handle();
    }
}
