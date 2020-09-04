<?php

namespace Modules\Extranet\Jobs\User;

use Config;
use Modules\Extranet\Http\Requests\User\UpdateSessionRequest;
use Modules\Extranet\Repositories\BobyRepository;
use Modules\Extranet\Repositories\UserRepository;
use Session;
use Modules\Extranet\Extensions\VeosWsUrl;
use Modules\Extranet\Jobs\User\GetAllowedPages;
use Auth;

class SessionUpdate
{
    public function __construct(array $attributes)
    {
        $this->attributes = array_only($attributes, [
            'session_id',
        ]);
    }

    public static function fromRequest(UpdateSessionRequest $request)
    {
        return new SessionUpdate($request->all());
    }

    public function handle()
    {
        $userData = json_decode(Session::get('user'));

        $sessionInfo = $this->getSessionInfo($this->attributes['session_id']);

        if (!isset($sessionInfo)) {
            return null;
        }

        $userData->session_id = $this->attributes['session_id'];
        

        //update role for session role
        $userData->role = $this->processMainRole($sessionInfo);

        // Call RolesPermissions service
        $service = resolve('Services/RolesPermissions');

        // Ask Permissions to service
        $userData->permissions = $service->getPermissionsFromRoleId($userData->role);

        $userRepository = new UserRepository();
        
        $veosRoleAndPermissions = $userRepository->getRoleAndPermissions(
            Auth::user()->token,
            Auth::user()->env,
            $this->attributes['session_id']
        );
        
        $userData->veos_role = $veosRoleAndPermissions['role'];
        $userData->veos_roles = $veosRoleAndPermissions['roles'];
        $userData->veos_permissions = $veosRoleAndPermissions['permissions'];

        //get allowed pages rights
        $userData->allowed_pages = (new GetAllowedPages(
            $this->attributes['session_id'],
            $userData->pages,
            $sessionInfo,
            $userData->veos_role,
            $userData->veos_permissions
        ))->handle();

        //update session info, to know info of this user
        $userData->session_info = $sessionInfo;

        Session::put('user', json_encode($userData));

        return true;
    }

    /**
     * This method dones't work because allowed pages can be null if not defined. 
     * And home can be accessible a part from being or not into allowed pages.
     */
    private function getRedirectPage($role, $allowedPages)
    {
        //if user
        if ($role == ROLE_USER) {
            //return first allowed page
            reset($allowedPages);
            $firstSlug = key($allowedPages);

            return '/'.$firstSlug;
        } else {
            //go home
            return '/';
        }
    }

    private function getSessionInfo($currentSession)
    {
        $bobyRepository = new BobyRepository();
        $data = $bobyRepository->getModelValuesQuery('WS_EXT2_DEF_OPTIONS_SESSION?SES='.$currentSession)['modelValues'];

        if (sizeof($data) > 0 && isset($data[0])) {
            return $data[0];
        }

        return null;
    }

    private function processMainRole($userext)
    {
        if (in_array($userext->{'USEREXT.login_per'}, Config::get('admin'))) {
            return ROLE_SYSTEM;
        }

        if (isset($userext->{'USEREXT.admin'}) && $userext->{'USEREXT.admin'} == 'Y') {
            return ROLE_ADMIN;
        }

        return ROLE_USER;
    }
}
