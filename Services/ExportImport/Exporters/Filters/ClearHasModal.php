<?php

namespace Modules\Extranet\Services\ExportImport\Exporters\Filters;

class ClearHasModal
{
    public static function apply($model, $fields)
    {
        $fields = is_array($fields) ? $fields : [$fields];

        foreach ($fields as $field) {
            if (isset($model[$field]['hasModal'])) {
                $model[$field]['hasModal'] = null;
            }
        }

        return $model;
    }
}
