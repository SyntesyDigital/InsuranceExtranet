<?php

namespace Modules\Extranet\Jobs\User;

use Config;
use GuzzleHttp\Client;
use Modules\Extranet\Entities\User;
use Modules\Extranet\Extensions\VeosWsUrl;

class LoginByEmail
{
    public function __construct($uid, $env = null)
    {
        $this->uid = $uid;
        $this->env = $env != null ? $env : VeosWsUrl::PROD;
    }

    /**
     * handle.
     *
     * @return void
     */
    public function handle()
    {
        $client = new Client();

        $this->testMode = substr(strtolower($this->uid), -4) == '-dev' ? true : false;
        $this->recMode = substr(strtolower($this->uid), -4) == '-rec' ? true : false;
        $this->devMode = substr(strtolower($this->uid), -5) == '-dev2' ? true : false;

        if ($this->testMode || $this->recMode) {
            $this->uid = substr($this->uid, 0, -4);
        } elseif ($this->devMode) {
            $this->uid = substr($this->uid, 0, -5);
        }

        // Get signin user to veos and get token
        $result = $client->post($this->getWsUrl().'login/token', [
            'json' => [
                'token' => JWT::encode([
                    'iss' => $provider->iss,
                    'iat' => time(),
                    'login' => $this->uid,
                ], $provider->encrypt_key),
            ],
        ]);

        $payload = json_decode($result->getBody()->getContents());
        $token = isset($payload->token) ? $payload->token : null;

        if (!$token) {
            return false;
        }

        $user = $this->getUser($token);
        $user->env = $this->env;

        if (!$user) {
            return false;
        }

        //check if has multiple sessions
        $isSupervue = isset($user->{'USEREXT.supervue'}) && $user->{'USEREXT.supervue'} == 'Y' ? true : false;

        //get user sessions available
        $sessions = $this->getSessions($WsUrl, $loginResult->token);
        $currentSession = null;

        //if no sessions exti
        if (sizeof($sessions) == 0) {
            return false;
        } elseif (sizeof($sessions) == 1) {
            //if only one session take this one
            $currentSession = $sessions[0]->session;
        }
        //else need a modal to select from all sessions

        //get new session info depending on the current session
        $sessionInfo = $this->getSessionInfo($currentSession, $loginResult->token);

        //Check pages rights
        //get all pages so store in cache and no need to process again
        $pages = $this->getPages($loginResult->token);

        //check if possible to get allowed pages
        $allowedPages = $this->getAllowedPages(
            $currentSession,
            $pages,
            $loginResult->token,
            $sessionInfo
        );

        $userData = [
            'id' => isset($user->{'USEREXT.id_per'}) ? $user->{'USEREXT.id_per'} : null,
            'firstname' => isset($user->{'USEREXT.nom_per'}) ? $user->{'USEREXT.nom_per'} : '',
            'lastname' => isset($user->{'USEREXT.nom2_per'}) ? $user->{'USEREXT.nom2_per'} : '',
            'email' => isset($user->{'USEREXT.email_per'}) ? $user->{'USEREXT.email_per'} : '',
            'phone' => isset($user->{'USEREXT.telprinc_per'}) ? $user->{'USEREXT.telprinc_per'} : '',
            'supervue' => $isSupervue,
            'token' => $loginResult->token,
            'env' => $this->env,
            'test' => $this->test,
            'role' => $this->processMainRole($sessionInfo),
            'pages' => $pages,
            'allowed_pages' => $allowedPages,  //can be null if no session defined
            'language' => 'fr',
            'sessions' => $sessions,
            'session_id' => $currentSession,
            'session_info' => $sessionInfo,
        ];

        \Session::put('user', json_encode($userData));

        return $this->createUserSession($userData);
    }

    /**
     * getWsUrl.
     *
     * @return void
     */
    public function getWsUrl()
    {
        return VeosWsUrl::getEnvironmentUrl($this->env);
    }

    /**
     * getUser.
     *
     * @param mixed $token
     *
     * @return void
     */
    public function getUser($token)
    {
        $client = new Client();
        $result = $client->get($this->getWsUrl().'personne', [
            'headers' => [
                'Authorization' => 'Bearer '.$token,
            ],
        ]);

        $personneInfo = json_decode($result->getBody()->getContents());

        //get user info
        $result = $client->get($WsUrl.'boBy/v2/WS_EXT2_USE?id_per_user='.$personneInfo->id, [
            'headers' => [
                'Authorization' => 'Bearer '.$token,
            ],
        ]);

        $userFile = json_decode($result->getBody()->getContents());

        $userInfo = null;
        if ($userFile->total > 0 && isset($userFile->data[0])) {
            $userInfo = $userFile->data[0];
        }

        return $userInfo;
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
        if (in_array($userext->{'USEREXT.login_per'}, Config::get('admin'))) {
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
        $client = new Client();
        $WsUrl = VeosWsUrl::getEnvironmentUrl($this->env);

        $result = $client->get($WsUrl.'boBy/v2/WS_EXT2_DEF_PAGES?perPage=100', [
          'headers' => [
              'Authorization' => 'Bearer '.$token,
          ],
      ]);

        $data = json_decode($result->getBody()->getContents());

        $pages = [];
        if ($data->total > 0 && isset($data->data)) {
            $pages = $data->data;
        }

        return $pages;
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

        $client = new Client();
        $WsUrl = VeosWsUrl::getEnvironmentUrl($this->env);

        $result = $client->get($WsUrl.'boBy/v2/WS_EXT2_DEF_OPTIONS_SESSION?SES='.$currentSession, [
            'headers' => [
                'Authorization' => 'Bearer '.$token,
            ],
        ]);

        $data = json_decode($result->getBody()->getContents());

        if ($data->total > 0 && isset($data->data[0])) {
            return $data->data[0];
        }

        return null;
    }

    /**
     *   Return allowed slugs for this user.
     */
    private function getAllowedPages($currentSession, $pages, $token, $sessionInfo)
    {
        if ($currentSession == null || $sessionInfo == null) {
            //not current session defined so, no pages info yet
            return null;
        }

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
}
