<?php

namespace Modules\Extranet\Services\ExportImport\Exporters\Filters;

class ClearHasRoute
{
    public static function apply($model, $fields)
    {
        $fields = is_array($fields) ? $fields : [$fields];

        foreach ($fields as $field) {
            if (isset($model[$field]['hasRoute'])) {
                $model[$field]['hasModal'] = null;
            }
        }

        return $model;
    }
}
