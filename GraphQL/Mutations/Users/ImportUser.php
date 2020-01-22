<?php

namespace Modules\Extranet\GraphQL\Mutations\Users;

use App\User;
use GraphQL\Type\Definition\ResolveInfo;
use Modules\Extranet\Repositories\PersonneRepository;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class ImportUser
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
        $user = User::where('id_per', $args['id_per'])->first();

        if ($user) {
            return $user;
        }

        $payload = (new PersonneRepository())->find($args['id_per']);

        if (isset($payload->id)) {
            return User::create([
                'id_per' => $payload->id,
                'firstname' => $payload->prenom,
                'lastname' => $payload->nom,
                'email' => $payload->mail,
                'phone' => $payload->tel,
            ]);
        }

        return null;
    }
}
