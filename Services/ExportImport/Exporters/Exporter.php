<?php

namespace Modules\Extranet\Services\ExportImport\Exporters;

use Illuminate\Database\Eloquent\Collection;

abstract class Exporter
{
    public $structure = [];

    /**
     * __construct.
     *
     * @param mixed $model to export
     *
     * @return void
     */
    public function __construct($model)
    {
        $this->model = $model;
    }

    /**
     * getModelAttributes.
     *
     * @param mixed $model
     *
     * @return void
     */
    private function getModelAttributes($model)
    {
        if ($model === null) {
            return null;
        }

        $attrs = collect($model->getFillable())
            ->filter(function ($field) {
                return $field != 'id' && substr($field, -3) != '_id';
            });

        $filters = isset($this->modelsFilters[get_class($model)])
            ? $this->modelsFilters[get_class($model)]
            : null;

        $model = $model->toArray();

        // Filter model
        if ($filters) {
            foreach ($filters as $field => $class) {
                if (is_array($class)) {
                    foreach ($class as $filter) {
                        $model = $filter::apply($model, $field);
                    }
                } else {
                    $model = $class::apply($model, $field);
                }
            }
        }

        return collect($model)
            ->only($attrs->toArray())
            ->map(function ($v) {
                return $v;
            })
            ->toArray();
    }

    /**
     * export.
     *
     * Get structure with data
     *
     * @return void
     */
    public function export()
    {
        $payload = [
            'model' => $this->structure['model'],
            'attributes' => $this->getModelAttributes($this->model),
        ];

        return $this->iterator($this->structure, $this->model);
    }

    /**
     * iterator.
     *
     *  Iterate structure array for retrieve model relations and attributes
     *
     * @param mixed $node  (array)
     * @param mixed $model
     *
     * @return void
     */
    public function iterator(&$node, $model = null)
    {
        if ($model) {
            $node['attributes'] = $this->getModelAttributes($model);
        }

        if (isset($node['relations'])) {
            foreach ($node['relations'] as $k => $relation) {
                if ($model) {
                    if (get_class($model->$k) == Collection::class) { // If Many relations
                        $node['relations'][$k] = $model->$k->map(function ($m) use ($relation) {
                            return is_array($relation)
                                ? $this->iterator($relation, $m)
                                : $this->getModelAttributes($m);
                        })->toArray();
                    } else { // If single relations
                        $node['relations'][$k] = is_array($relation)
                            ? $this->iterator($relation, $model->$k)
                            : $this->getModelAttributes($model->$k);
                    }
                } else {
                    return [];
                }
            }
        }

        return $node;
    }
}
