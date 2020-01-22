<?php

namespace Modules\Extranet\Services\RolesPermissions\Helpers;

use Auth;

class Abilities
{
    public function __invoke($identifiers)
    {
        $user = Auth::user();
    }
}
