<?php

namespace Modules\Extranet\Repositories;

use Auth;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Cache;
use Modules\Extranet\Extensions\VeosWsUrl;

class UserRepository
{
    public function __construct()
    {
        $this->client = new Client();
    }

    /*
    0 => {#584
        +"USEREXT.id_per": 11410125
        +"USEREXT.nom2_per": "MSN_CLIENT "
        +"USEREXT.num_per": "CONT14"
        +"USEREXT.dtcre_per": 1574377200000
        +"USEREXT.mail_per": null
        +"USEREXT.login_per": "MSN_CLIENT"
        +"USEREXT.admin": "N"
        +"USEREXT.supervue": "N"
        +"USEREXT.cdfbra1": null
        +"USEREXT.actif": "1"
        +"USEREXT.copros": null
    }
    */
    public function getUsers()
    {
        $name = 'WS_EXT2_DEF_USERS?perPage=100';

        $cacheKey = md5('getQuery_'.$name);

        if (Cache::has($cacheKey) && false) {
            $beans = Cache::get($cacheKey);
        } else {
            $response = $this->client->get(VeosWsUrl::get().'boBy/v2/'.$name, [
                'headers' => [
                    'Authorization' => 'Bearer '.Auth::user()->token,
                ],
            ]);

            $result = json_decode($response->getBody());
            $beans = $result->data;
            Cache::put($cacheKey, $beans, config('cache.time'));
        }

        return $beans;
    }

    /**
     * Function to return all user permissions.
     * WS came from parameters because is not defined yet.
     */
    public function getRoleAndPermissions($token,$env)
    {
        $name = "WS2_DEF_PERMIS";
        $roleAndPermissions = [
            'roles' => [],
            'permissions' => []
        ];

        try {
            $response = $this->client->get(VeosWsUrl::getEnvironmentUrl($env).'boBy/v2/'.$name, [
                'headers' => [
                    'Authorization' => 'Bearer '.$token,
                ],
            ]);

            $result = json_decode($response->getBody());
            $beans = $result->data;
            if(sizeof($beans) > 0){

                $permissions = $beans[0];

                //TO DO take roles from boby
                if(isset($permissions->role))
                    $roleAndPermissions['roles'] = [$permissions->role];

                unset($permissions->role);

                $roleAndPermissions['permissions'] = $permissions;
            }
            return $roleAndPermissions;
        }
        catch(\Exception $ex) {
            return $roleAndPermissions;
        }
    }
}
