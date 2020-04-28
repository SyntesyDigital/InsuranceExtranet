<?php

namespace Modules\Extranet\Services\ExportImport\GraphQL\Mutations;

use Modules\Extranet\Entities\Element;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use Modules\Extranet\Services\ExportImport\Importers\ElementImporter;

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
        $payload = json_decode($args["payload"]);
        $payload = is_array($payload) ? $payload : [$payload];
        
        foreach($payload as $p) {
            switch($p->model) {
                case Element::class: 
                    $importer = new ElementImporter(json_encode($p));
                    $importer->import();
                    return [
                        'payload' => json_encode($importer->getReport())
                    ];
                break;
            }
        }

        return null;
    }
}
