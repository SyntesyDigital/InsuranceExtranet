<?php

namespace Modules\Extranet\GraphQL\Queries;

use GraphQL\Type\Definition\ResolveInfo;
use Modules\Extranet\Entities\User;
use Modules\Extranet\Repositories\BobyRepository;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class Users
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
        $payload = (new BobyRepository())->getQuery('WS_EXT2_USE');
        $users = User::all();

        return [
            'total' => $payload->total,
            'perPage' => $payload->perPage,
            'page' => $payload->page,
            'totalPage' => $payload->totalPage,
            'from' => $payload->from,
            'to' => $payload->to,
            'users' => collect($payload->data)->map(function ($u) use ($users) {
                $user = $users->where('id_per', $u->{'USEREXT.id_per'})->first();

                if ($user) {
                    return $user;
                }

                $user = new User();
                $user->id_per = $u->{'USEREXT.id_per'};
                $user->firstname = $u->{'USEREXT.prenom_per'};
                $user->lastname = $u->{'USEREXT.nom_per'};
                $user->phone = $u->{'USEREXT.telprinc_per'};
                $user->email = $u->{'USEREXT.mail_per'};

                return $user;
            }),
        ];
    }
}
