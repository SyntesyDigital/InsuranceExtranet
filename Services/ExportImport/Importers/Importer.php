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
            if ($entity && $identifier) {
                $attributes['identifier'] .= '_'.date('Ymdhis');
            }

            // Create entity (model)
            $entity = $model::create($attributes);

            if ($relations) {
                foreach ($relations as $relation => $node) {
                    if (isset($node['model'])) {
                        $this->iterator($node);
                    } else {
                        // foreach ($node as $values) {
                        //     $class = get_class($entity->$relation()->getRelated());
                        //     $entity->$relation()->save(new $class($values));
                        // }
                    }
                }
            }
        }

        return $node;
    }
}
