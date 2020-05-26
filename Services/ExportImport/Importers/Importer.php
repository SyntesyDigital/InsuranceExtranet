<?php

namespace Modules\Extranet\Services\ExportImport\Importers;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Modules\Extranet\Services\ElementModelLibrary\Entities\ElementModel;

abstract class Importer
{
    private $report = [];

    private $nodeAlreadySaved = false;

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
        if (!$entity) {
            return false;
        }

        foreach ($nodes as $name => $node) {
            $class = get_class($entity->$name()->getRelated());

            if (isset($node[0])) { // IF multi array relations
                if (isset($node[0]['attributes'])) { // IF attributes we create the model and start new iteration
                    foreach ($node as $n) {
                        $_entity = $this->saveRelation($entity, $name, new $class($n['attributes']), $n);

                        if (isset($n['relations']) && $_entity) {
                            $this->iterator($n['relations'], $_entity);
                        }
                    }
                } else { // IF no model to create, we save relations data
                    foreach ($node as $n) {
                        $this->saveRelation($entity, $name, new $class($n), $node);
                    }
                }
            } elseif (isset($node['relations'])) {
                $_entity = $this->saveRelation($entity, $name, new $class($node['attributes']), $node);

                if ($_entity) {
                    $this->iterator(
                        $node['relations'],
                        $_entity
                    );
                }
            } else {
                $this->saveRelation($entity, $name, new $class($node), $node);
            }
        }
    }

    /**
     * getObjectPayload.
     *
     * @param mixed $object
     *
     * @return void
     */
    private function getObjectPayload($object)
    {
        $class = get_class($object);

        return collect($object->toArray())
            ->filter(function ($value, $field) use ($class) {
                return substr($field, -3) != '_id' && !in_array($field, ['id', 'created_at', 'updated_at', $this->duplicateIfNotExists[$class]]);
            });
    }

    /**
     * buildArrayObjectWithRelations.
     *
     * @param mixed $node
     * @param mixed $arr
     *
     * @return void
     */
    private function buildArrayObjectWithRelations($node, $arr = [])
    {
        if (isset($node['attributes'])) {
            $arr = $node['attributes'];
        }

        if (isset($node['relations'])) {
            foreach ($node['relations'] as $relation => $v) {
                if (isset($v[0]['relations'])) {
                    foreach ($v as $k => $v2) {
                        $arr[$relation][$k] = $this->buildArrayObjectWithRelations($v2);
                    }
                } elseif (isset($v['relations'])) {
                    $arr[$relation] = $this->buildArrayObjectWithRelations($v);
                } else {
                    foreach ($v as $k => $v2) {
                        $arr[$relation][$k] = $v2;
                    }
                }
            }
        }

        return $arr;
    }

    /**
     * walkArrayAndRemoveDBFields.
     *
     * @param mixed $node
     * @param mixed $arr
     *
     * @return void
     */
    public function walkArrayAndRemoveDBFields($node, &$arr = [])
    {
        foreach ($node as $k => $n) {
            if (is_array($n)) {
                $arr[$k] = $this->walkArrayAndRemoveDBFields($n);
                continue;
            }

            if (substr($k, -3) != '_id' && !in_array($k, ['id', 'created_at', 'updated_at'])) {
                $arr[$k] = $n;
            }
        }

        return $arr;
    }

    /**
     * Checksum comparation for check if similar object exist.
     *
     * @param mixed $relation
     * @param mixed $object
     *
     * @return void
     */
    public function checkIfObjectExist($relation, $object, $node)
    {
        $class = get_class($object);

        $field = is_array($this->duplicateIfNotExists[$class])
            ? $this->duplicateIfNotExists[$class]['field']
            : $this->duplicateIfNotExists[$class];

        $sources = $class::where($field, $object->$field)->get();

        foreach ($sources as $source) {
            // Load relations
            if (isset($this->duplicateIfNotExists[$class]['relations'])) {
                $source->load($this->duplicateIfNotExists[$class]['relations']);
            }

            // Build array from imported JSON
            $arr1 = isset($node['relations'])
                ? $this->buildArrayObjectWithRelations($node)
                : $node;

            // Build array from DB object
            $arr2 = $this->walkArrayAndRemoveDBFields($source->toArray());

            if (md5(json_encode($arr1, JSON_NUMERIC_CHECK)) == md5(json_encode($arr2, JSON_NUMERIC_CHECK))) {
                return $source;
            }
        }

        return false;
    }

    public function getReport()
    {
        return $this->report;
    }

    public function reportCreatedObject($object)
    {
        $class = get_class($object);

        if (!isset($this->report[$class])) {
            $this->report[$class] = 0;
        }

        ++$this->report[$class];
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
    private function saveRelation($model, $relation, $object, $node = null)
    {
        $class = get_class($object);
        $source = isset($this->duplicateIfNotExists[$class])
            ? $this->checkIfObjectExist($relation, $object, $node)
            : null;

        if ($class == ElementModel::class) {
            if ($source) {
                return false;
            }

            $object->save();
            $this->reportCreatedObject($object);

            return $object;
        }

        if (!$source) {
            $this->reportCreatedObject($object);
        }

        switch (get_class($model->{$relation}())) {
            case BelongsTo::class:
                if ($source) {
                    $model->{$relation}()->associate($source);
                    $model->save();

                    return false;
                } else {
                    $object->save();
                    $model->{$relation}()->associate($object);
                }

                return $model->save();
            break;

            default:
                if ($source) {
                    $model->{$relation}()->attach($source->id);

                    return false;
                }

                return $model->{$relation}()->save($object);
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
        $object = $model::create($attributes);

        $this->reportCreatedObject($object);

        return $object;
    }
}
