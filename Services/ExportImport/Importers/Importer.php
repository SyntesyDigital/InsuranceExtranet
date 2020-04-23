<?php

namespace Modules\Extranet\Services\ExportImport\Importers;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

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

    /**
     * import.
     *
     * @return void
     */
    public function import()
    {
        $node = json_decode($this->payload, true);

        $entity = $this->createModel($node);

        $this->iterator($node['relations'], $entity);
    }

    /**
     * iterator.
     *
     * @param mixed $nodes
     * @param mixed $entity
     *
     * @return void
     */
    public function iterator($nodes, $entity)
    {
        foreach ($nodes as $name => $node) {
            $class = get_class($entity->$name()->getRelated());

            if (isset($node[0])) { // IF multi array relations
                if (isset($node[0]['attributes'])) { // IF attributes we create the model and start new iteration
                    foreach ($node as $n) {
                        $_entity = $this->saveRelation($entity, $name, new $class($n['attributes']));

                        if (isset($n['relations'])) {
                            $this->iterator($n['relations'], $_entity);
                        }
                    }
                } else { // IF no model to create, we save relations data
                    foreach ($node as $n) {
                        $this->saveRelation($entity, $name, new $class($n));
                    }
                }
            } elseif (isset($node['relations'])) {
                $this->iterator(
                    $node['relations'],
                    $this->saveRelation($entity, $name, new $class($node['attributes']))
                );
            } else {
                $this->saveRelation($entity, $name, new $class($node));
            }
        }
    }

    private function getObjectPayload($object)
    {
        $class = get_class($object);

        return collect($object->toArray())
            ->filter(function ($value, $field) use ($class) {
                return substr($field, -3) != '_id' && !in_array($field, ['id', 'created_at', 'updated_at', $this->duplicateIfNotExists[$class]]);
            });
    }

    /**
     * Checksum comparation for check if similar object exist.
     *
     * @param mixed $relation
     * @param mixed $object
     *
     * @return void
     */
    private function checkIfObjectExist($relation, $object)
    {
        $class = get_class($object);
        $source = $class::where('identifier', $object->identifier)->first();

        if ($source) {
            $sourcePayload = $this->getObjectPayload($source)->toJson();
            $objectPayload = $this->getObjectPayload($object)->toJson();

            return md5($sourcePayload) == md5($objectPayload) ? $source : false;
        }

        return false;
    }

    /**
     * Save relation betwen model en object.
     *
     * @param mixed $model
     * @param mixed $relation
     * @param mixed $object
     *
     * @return void
     */
    private function saveRelation($model, $relation, $object)
    {
        $class = get_class($object);
        $source = null;

        if ($class == "Modules\Extranet\Services\ElementModelLibrary\Entities\ElementModel") {
            $object->save();

            return $object;
        }

        if (isset($object->identifier)) {
            if (isset($this->duplicateIfNotExists[$class])) {
                $source = $this->checkIfObjectExist($relation, $object);
            }
        }

        switch (get_class($model->{$relation}())) {
            case BelongsTo::class:
                if ($source) {
                    $model->{$relation}()->associate($source);
                } else {
                    $object->save();
                    $model->{$relation}()->associate($object);
                }

                return $model->save();
            break;

            default:
                return $source
                    ? $model->{$relation}()->attach($source->id)
                    : $model->{$relation}()->save($object);
            break;
        }
    }

    /**
     * createModel.
     *
     * @param mixed $node
     *
     * @return void
     */
    public function createModel($node)
    {
        $model = isset($node['model']) ? $node['model'] : null;
        $attributes = isset($node['attributes']) ? $node['attributes'] : null;
        $identifier = isset($attributes['identifier']) ? $attributes['identifier'] : null;

        $entity = $identifier ? $model::where('identifier', $identifier)->first() : null;

        if (!$attributes) {
            return false;
        }

        // If identifier exist we create another one
        if ($entity && $identifier) {
            $attributes['identifier'] .= '_'.date('Ymdhis');
        }

        // Create entity (model)
        return $model::create($attributes);
    }
}
