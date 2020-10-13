<?php

namespace Modules\Extranet\Services\ElementModelLibrary\GraphQL\Queries;

use Auth;
use GraphQL\Type\Definition\ResolveInfo;
use Modules\Extranet\Repositories\BobyRepository;
use Modules\Extranet\Services\ElementModelLibrary\Entities\Service;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class ServiceBody
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
        $service = Service::find($args['id']);

        if (!$service) {
            abort(500, 'Bad request');
        }

        $boby = new BobyRepository();

        $sessionParameter = get_session_parameter();

        $url = strpos($service->example, '?') === false
            ? $service->example.'?'.$sessionParameter
            : $service->example.'&'.$sessionParameter;

        $response = $boby->processMethod(
            strtoupper($service->http_method),
            $url,
            []
        );

        return [
            'body' => json_encode($response),
        ];
    }
}
