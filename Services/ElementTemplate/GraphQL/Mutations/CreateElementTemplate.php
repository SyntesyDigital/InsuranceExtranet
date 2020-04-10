<?php

namespace Modules\Extranet\Services\ElementTemplate\GraphQL\Mutations;

use GraphQL\Type\Definition\ResolveInfo;
use Modules\Architect\Entities\Language;
use Modules\Extranet\Services\ElementTemplate\Entities\ElementTemplate;
use Modules\Extranet\Services\ElementTemplate\Fields\Adapters\LayoutAdapter;
use Modules\Extranet\Services\ElementTemplate\GraphQL\Mutations\Traits\PageBuilderFields;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class CreateElementTemplate
{
    use PageBuilderFields;

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
        $elementTemplate = ElementTemplate::create([
            'name' => $args['name'],
            'element_id' => $args['element_id'],
            'layout' => null,
        ]);
        
        return $elementTemplate;
    }
}
