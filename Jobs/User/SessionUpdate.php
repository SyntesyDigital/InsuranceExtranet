<?php

namespace Modules\Extranet\Jobs\User;

use Config;
use Modules\Extranet\Http\Requests\User\UpdateSessionRequest;
use Modules\Extranet\Repositories\BobyRepository;
use Session;

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

        //get allowed pages rights
        $userData->session_id = $this->attributes['session_id'];

        $userData->allowed_pages = $this->getAllowedPages($sessionInfo, $userData->pages);

        //update role for session role
        $userData->role = $this->processMainRole($sessionInfo);

        // Call RolesPermissions service
        $service = resolve('Services/RolesPermissions');

        // Ask Permissions to service
        $userData->permissions = $service->getPermissionsFromRoleId($userData->role);

        //update session info, to know info of this user
        $userData->session_info = $sessionInfo;

        Session::put('user', json_encode($userData));

        return $this->getRedirectPage($userData->role, $userData->allowed_pages);
    }

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

    private function getAllowedPages($sessionInfo, $pages)
    {
        $allowedPages = [];

        foreach ($pages as $index => $page) {
            //if this option exist in user info, and is Y
            if (isset($sessionInfo->{$page->option}) && $sessionInfo->{$page->option} == 'Y') {
                //add page
                $allowedPages[$page->PAGE] = true;
            } else {
                $allowedPages[$page->PAGE] = false;
            }
        }

        return $allowedPages;
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
