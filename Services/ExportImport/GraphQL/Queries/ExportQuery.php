<?php

namespace Modules\Extranet\Services\ExportImport\GraphQL\Queries;

use GraphQL\Type\Definition\ResolveInfo;
use Modules\Extranet\Entities\Element;
use Modules\Extranet\Services\ElementModelLibrary\Entities\ElementModel;
use Modules\Extranet\Services\ExportImport\Exporters\ElementExporter;
use Modules\Extranet\Services\ExportImport\Exporters\ElementModelExporter;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class ExportQuery
{
    /**
     * Return a value for the field.
     *
     * @param null                                                $rootValue   Usually contains the result returned from the parent field. In this case, it is always `null`.
     * @param mixed[]                                             $args        the arguments that were passed into the field
     * @param \Nuwave\Lighthouse\Support\Contracts\GraphQLContext $context     arbitrary data that is shared between all fields of a single query
     * @param \GraphQL\Type\Definition\ResolveInfo                $resolveInfo information about the query itself, such as the execution state, the field name, path to the field from the root, and more
     *
     * @return mixed
     */
    public function __invoke($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        $class = $args['class'];
        $object = $class::find($args['id']);

        switch ($class) {
            case Element::class:
                $exporter = new ElementExporter($object);
            break;

            case ElementModel::class:
                $exporter = new ElementModelExporter($object);
            break;
        }

        return [
            'payload' => isset($exporter) ? json_encode($exporter->export()) : null,
        ];
    }
}
