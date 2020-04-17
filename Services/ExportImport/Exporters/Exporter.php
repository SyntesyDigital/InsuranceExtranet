<?php

namespace Modules\Extranet\Services\ExportImport\Exporters;

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
        $attrs = collect($model->getFillable())
            ->filter(function ($field) {
                return $field != 'id' && substr($field, -3) != '_id';
            });

        return collect($model->toArray())
            ->only($attrs->toArray())
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
                $node['relations'][$k] = $this->model->$k->map(function ($model) use ($relation) {
                    return is_array($relation)
                        ? $this->iterator($relation, $model)
                        : $this->getModelAttributes($model);
                })->toArray();
            }
        }

        return $node;
    }
}
