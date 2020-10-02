<?php

namespace Modules\Extranet\Jobs\User;

use Config;
use GuzzleHttp\Client;
use Modules\Extranet\Entities\Session as UserSession;
use Modules\Extranet\Entities\User;
use Modules\Extranet\Extensions\VeosWsUrl;
use Modules\Extranet\Repositories\UserRepository;
use Modules\Extranet\Jobs\User\GetAllowedPages;

class SessionCreate
{
    private $login;
    private $password;
    private $test;

    public function __construct($veosToken, $env = null, $test = false, $params = [])
    {
        $this->veosToken = $veosToken;
        $this->params = $params;
        $this->test = $test;
        $this->env = $env != null ? $env : VeosWsUrl::PROD;
        $this->client = new Client();
    }

    public function handle()
    {
        $user = $this->getUser($this->veosToken);
        $user->env = $this->env;

        if (!$user) {
            return false;
        }

        // check if has multiple sessions
        $isSupervue = isset($user->{'USEREXT.supervue'}) && $user->{'USEREXT.supervue'} == 'Y' ? true : false;

        // get user sessions available
        $sessions = $this->getSessions($this->veosToken);
        $currentSession = null;

        // if no sessions exit
        if (sizeof($sessions) == 0) {
            return false;
        } elseif (sizeof($sessions) == 1) {
            //if only one session take this one
            $currentSession = isset($sessions[0]->session)
                ? $sessions[0]->session
                : null;
        }
        // else need a modal to select from all sessions

        // get new session info depending on the current session
        $sessionInfo = $this->getSessionInfo($currentSession, $this->veosToken);

        // Check pages rights
        // get all pages so store in cache and no need to process again
        $pages = $this->getPages($this->veosToken);

        $role = $this->processMainRole($sessionInfo);

        //get veos roles
        $userRepository = new UserRepository();
        $veosRoleAndPermissions = $userRepository->getRoleAndPermissions(
            $this->veosToken,
            $this->env,
            $currentSession
        );

        // check if possible to get allowed pages
        $allowedPages = (new GetAllowedPages(
            $currentSession,
            $pages,
            $sessionInfo,
            $veosRoleAndPermissions['role'],
            $veosRoleAndPermissions['permissions']
        ))->handle();
        
        $service = resolve('Services/RolesPermissions');
        $idPer = isset($user->{'USEREXT.id_per'}) ? $user->{'USEREXT.id_per'} : null;

        $sessionData = [
            'id' => $idPer,
            'firstname' => isset($user->{'USEREXT.nom_per'}) ? $user->{'USEREXT.nom_per'} : '',
            'lastname' => isset($user->{'USEREXT.nom2_per'}) ? $user->{'USEREXT.nom2_per'} : '',
            'email' => isset($user->{'USEREXT.email_per'}) ? $user->{'USEREXT.email_per'} : '',
            'phone' => isset($user->{'USEREXT.telprinc_per'}) ? $user->{'USEREXT.telprinc_per'} : '',
            'must_reset_password' => isset($user->{'USEREXT.resetmdp'}) && $user->{'USEREXT.resetmdp'} == '1' ? true : false,
            'supervue' => $isSupervue,
            'token' => $this->veosToken,
            'api_token' => $this->getSessionApiToken($idPer),
            'env' => $this->env,
            'test' => $this->test,
            'pages' => $pages,
            'allowed_pages' => $allowedPages,  //can be null if no session defined
            'language' => 'fr',
            'sessions' => $sessions,
            'session_id' => $currentSession,
            'session_info' => $sessionInfo,
            'role' => $role,
            'permissions' => $service->getPermissionsFromRoleId($role),
            'veos_role' => $veosRoleAndPermissions['role'],
            'veos_roles' => $veosRoleAndPermissions['roles'],
            'veos_permissions' => $veosRoleAndPermissions['permissions'],
        ];

        // Merge constructor passed parameters to session
        if ($this->params) {
            $sessionData = array_merge($sessionData, $this->params);
        }

        \Session::put('user', json_encode($sessionData));

        return $this->createUserSession($sessionData);
    }

    /**
     * getSessions.
     *
     * @param mixed $WsUrl
     * @param mixed $token
     *
     * @return void
     */
    private function getSessions($token)
    {
        $WsUrl = VeosWsUrl::getEnvironmentUrl($this->env);

        $query = $this->client->get($WsUrl.'boBy/v2/WS_EXT2_SESSIONS?perPage=500', [
            'headers' => [
                'Authorization' => 'Bearer '.$token,
            ],
        ]);

        $payload = json_decode($query->getBody());

        return isset($payload->data) ? $payload->data : null;
    }

    /**
     * Retunrs session api_token for GraphQL depending on User BBDD id.
     */
    private function getSessionApiToken($idPer)
    {
        
        $user = User::where('id_per', $idPer)->first();

        if(isset($idPer) && isset($user)){
            
            $userSession = $user->session()->first();
            if(isset($userSession) && isset($userSession->api_token)){
                return $userSession->api_token;
            }   
        }
        //else return a new token
        return bin2hex(random_bytes(64));
    }

    /**
     * createUserSession.
     *
     * @param mixed $userData
     *
     * @return void
     */
    public function createUserSession($userData)
    {
        // Create user if not exist
        $user = User::where('id_per', $userData['id'])->first();

        if (!$user) {
            $user = User::create([
                'id_per' => $userData['id'],
                'firstname' => $userData['firstname'],
                'lastname' => $userData['lastname'],
                'email' => $userData['email'],
                'phone' => $userData['phone'],
            ]);
        }

        $userSession = UserSession::where('user_id', $user->id)->first();
        if(!$userSession) {
            //create session

            $userSession = UserSession::create([
                'user_id' => $user->id,
                'ip_address' => request()->ip(),
                'user_agent' => request()->header('User-Agent'),
                'token' => $userData['token'],
                'api_token' => $userData['api_token'],
                'env' => $this->env,
                'language' => 'fr',
                'payload' => json_encode($userData),
            ]);
        }
        else {
            //update session
            $userSession->update([
                'id' => $userSession->id,
                'user_id' => $user->id,
                'ip_address' => request()->ip(),
                'user_agent' => request()->header('User-Agent'),
                'token' => $userData['token'],
                'api_token' => $userData['api_token'],
                'env' => $this->env,
                'language' => 'fr',
                'payload' => json_encode($userData),
            ]);
        }
        
        return $userSession;
    }

    /**
     * Call Veos WS and get User data.
     *
     * @param mixed $token
     *
     * @return void
     */
    public function getUser($token)
    {
        $WsUrl = VeosWsUrl::getEnvironmentUrl($this->env);

        $query = $this->client->get($WsUrl.'personne', [
            'headers' => [
                'Authorization' => 'Bearer '.$token,
            ],
        ]);
        $payload = json_decode($query->getBody()->getContents());

        $query = $this->client->get($WsUrl.'boBy/v2/WS_EXT2_USE?id_per_user='.$payload->id, [
            'headers' => [
                'Authorization' => 'Bearer '.$token,
            ],
        ]);
        $payload = json_decode($query->getBody()->getContents());

        return $payload->total > 0 && isset($payload->data[0])
            ? $payload->data[0]
            : null;
    }

    /**
     * processMainRole.
     *
     * @param mixed $userext
     *
     * @return void
     */
    private function processMainRole($userext)
    {
        if (!isset($userext)) {
            return ROLE_USER;
        }

        //check if user is in admin array
        if (in_array($userext->{'USEREXT.login_per'}, Config::get('architect::admin'))) {
            //return admin
            return ROLE_SYSTEM;
        }

        if (isset($userext->{'USEREXT.admin'}) && $userext->{'USEREXT.admin'} == 'Y') {
            return ROLE_ADMIN;
        }

        return ROLE_USER;
    }

    /**
     * getPages.
     *
     * @param mixed $token
     *
     * @return void
     */
    private function getPages($token)
    {
        $WsUrl = VeosWsUrl::getEnvironmentUrl($this->env);

        $result = $this->client->get($WsUrl.'boBy/v2/WS_EXT2_DEF_PAGES?perPage=100', [
            'headers' => [
                'Authorization' => 'Bearer '.$token,
            ],
        ]);

        $payload = json_decode($result->getBody()->getContents());

        return $payload->total > 0 && isset($payload->data)
            ? $payload->data
            : [];
    }

    /**
     * getSessionInfo.
     *
     * @param mixed $currentSession
     * @param mixed $token
     *
     * @return void
     */
    private function getSessionInfo($currentSession, $token)
    {
        if ($currentSession == null) {
            return null;
        }

        $WsUrl = VeosWsUrl::getEnvironmentUrl($this->env);

        $result = $this->client->get($WsUrl.'boBy/v2/WS_EXT2_DEF_OPTIONS_SESSION?SES='.$currentSession, [
            'headers' => [
                'Authorization' => 'Bearer '.$token,
            ],
        ]);

        $payload = json_decode($result->getBody()->getContents());

        return $payload->total > 0 && isset($payload->data[0])
            ? $payload->data[0]
            : null;
    }
}
