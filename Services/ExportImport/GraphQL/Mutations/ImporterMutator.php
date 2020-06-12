<?php

namespace Modules\Extranet\Services\ExportImport\GraphQL\Mutations;

use GraphQL\Type\Definition\ResolveInfo;
use Modules\Extranet\Entities\Element;
use Modules\Extranet\Services\ElementModelLibrary\Entities\ElementModel;
use Modules\Extranet\Services\ExportImport\Importers\ElementImporter;
use Modules\Extranet\Services\ExportImport\Importers\ElementModelImporter;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class ImporterMutator
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
        $payload = mb_convert_encoding($args['payload'], 'ISO-8859-1', 'UTF-8');
        $payload = json_decode($payload);
        $payload = is_array($payload) ? $payload : [$payload];
        $result = [];

        foreach ($payload as $p) {
            switch ($p->model) {
                case Element::class:
                    $importer = new ElementImporter(json_encode($p));
                    $importer->import();
                    $result[] = $importer->getReport();
                    break;
                case ElementModel::class:
                    $importer = new ElementModelImporter(json_encode($p));
                    $importer->import();
                    $result[] = $importer->getReport();
                    break;
            }
        }

        return [
            'payload' => json_encode($result),
        ];
    }
}
