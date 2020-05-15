<?php

namespace Modules\Extranet\Services\ExportImport\Exporters\Filters;

class Clear
{
    public static function apply($model, $fields)
    {
        $fields = is_array($fields) ? $fields : [$fields];

        foreach ($fields as $field) {
            $model[$field] = null;
        }

        return $model;
    }
}
