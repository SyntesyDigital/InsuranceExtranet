<?php

namespace Modules\Extranet\GraphQL\Mutations\Users;

use GraphQL\Type\Definition\ResolveInfo;
use Modules\Extranet\Entities\User;
use Modules\Extranet\Services\RolesPermissions\Entities\Permission;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class UpdateUserPermission
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
        $user = User::find($args['user_id']);

        $permission = $args['permission_id']
            ? Permission::find($args['permission_id'])
            : null;

        if (isset($args['identifier'])) {
            $permission = Permission::where('identifier', $args['identifier'])->first();
        }

        if (!$user || !$permission) {
            return false;
        }

        $user->savePermission(
            $permission->identifier,
            isset($args['enabled']) ? $args['enabled'] : true
        );

        return $user->getPermissions();
    }
}
