<?php

namespace Modules\Extranet\Services\ExportImport\Importers;

abstract class Importer
{
    /**
     * __construct.
     *
     * @param mixed $model to export
     *
     * @return void
     */
    public function __construct($payload)
    {
        $this->payload = $payload;
    }

    public function import()
    {
        $payload = json_decode($this->payload, true);

        $this->iterator($payload);
    }

    public function iterator(&$node)
    {
        $model = isset($node['model']) ? $node['model'] : null;
        $attributes = isset($node['attributes']) ? $node['attributes'] : null;
        $relations = isset($node['relations']) ? $node['relations'] : null;

        if ($model && $attributes) {
            // Check identifier
            $identifier = isset($attributes['identifier']) ? $attributes['identifier'] : null;
            $entity = $identifier ? $model::where('identifier', $identifier)->first() : null;

            // If identifier exist we create another one
            if ($entity) {
                $attributes['identifier'] .= '_'.date('Y_m_d_h_i_s');
            }

            // Create entity (model)
            $entity = $model::create($attributes);

            // Save relations of the model
            if ($relations) {
                foreach ($relations as $relation => $entities) {
                    $class = get_class($entity->$relation()->getRelated());

                    foreach ($entities as $attr) {
                        $entity->$relation()->save(new $class($attr));
                    }
                }
            }
        }
        // if (isset($node['relations'])) {
        //     foreach ($node['relations'] as $k => $relation) {
        //         $node['relations'][$k] = $this->model->$k->map(function ($model) use ($relation) {
        //             return is_array($relation)
        //                 ? $this->iterator($relation, $model)
        //                 : $this->getModelAttributes($model);
        //         })->toArray();
        //     }
        // }

        return $node;
    }
}
