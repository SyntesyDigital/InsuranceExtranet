<?php

namespace Modules\Extranet\Services\RolesPermissions\Helpers;

use Auth;
use Blade;
use Modules\Extranet\Entities\User;

class HasNotAbilitiesHelper
{
    public function __construct()
    {
        \Blade::if('HasNotAbilities', function ($permissions) {

            if(!is_array($permissions)) {
                $permissions = explode(',', str_replace(' ', '', $permissions));
            } 

            $user = Auth::user();
            
            if(get_class($user) == "stdClass") {
                $user = User::where('id_per', $user->id)->first();
            } 

            return !$user->hasPermissions($permissions);
        });
    }
}
