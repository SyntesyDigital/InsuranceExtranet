<?php

namespace Modules\Extranet\Services\ExportImport\Exporters\Filters;

class Forget
{
    public static function apply($model, $fields)
    {
        $fields = is_array($fields) ? $fields : [$fields];
        $model = collect($model);

        foreach ($fields as $field) {
            $model->forget($field);
        }

        return $model->toArray();
    }
}
