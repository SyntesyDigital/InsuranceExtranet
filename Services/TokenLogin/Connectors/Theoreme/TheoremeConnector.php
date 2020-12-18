<?php

namespace Modules\Extranet\Services\TokenLogin\Connectors\Theoreme;

use Exception;
use Illuminate\Http\Request;
use Modules\Extranet\Extensions\VeosWsUrl;
use Modules\Extranet\Jobs\User\SessionCreate;
use Modules\Extranet\Jobs\User\Session\SessionTokenLink;
use Modules\Extranet\Services\TokenLogin\Veos\LoginToken;
use Modules\Extranet\Services\TokenLogin\Connectors\Interfaces\TokenLoginConnectorInterface;
use Modules\Extranet\Entities\Session as UserSession;
use Modules\Extranet\Entities\User;
use Session;

class TheoremeConnector implements TokenLoginConnectorInterface
{
    /**
     * __construct.
     *
     * @param mixed $token
     * @param mixed $caller
     *
     * @return void
     */
    public function __construct($token)
    {
        $this->token = $token;
        $this->test = isset($params['test']) && $params['test'] == 1 ? true : false;
        $this->env = request()->get('env') ? request()->get('env') : VeosWsUrl::PROD;
    }

    /**
     * handle.
     *
     * @return void
     */
    public function handle()
    {        
        $obj = json_decode(base64_decode(str_replace('_', '/', str_replace('-', '+', explode('.', $this->token)[1]))));

        // Open VEOS session and return token
        $veosToken = dispatch_now(new LoginToken($obj->login));

        $payload = [
            'env' => $this->env,
            'test' => $this->test,
            'token' => $this->token,
            'id' => $obj->idPer,
            'id_per' => $obj->idPer,
            'token' => $veosToken,
            'api_token' => $this->getSessionApiToken($obj->idPer),
            'exp' => $obj->exp,
            'role' => ROLE_ANONYMOUS,
            'supervue' => false,
            'firstname' => '',
            'lastname' => '',
            'email' => '',
            'phone' => '',
            'language' => $obj->language,
            'sessions' => null,
            'jailed' => true,
        ];

        $this->createUserSession($payload);

        Session::put('user', json_encode($payload));

        return $payload;
    }

    /**
     * setToken.
     *
     * @param mixed $token
     *
     * @return void
     */
    public function setToken($token)
    {
        $this->token = $token;
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
        $user = User::where('id_per', $userData['id_per'])->first();

        if (!$user) {
            $user = User::create([
                'id_per' => $userData['id_per'],
                'firstname' => $userData['firstname'],
                'lastname' => $userData['lastname'],
                'email' => $userData['email'],
                'phone' => $userData['phone'],
            ]);
        }

        $userSession = UserSession::where('user_id', $user->id)->first();

        

        if (!$userSession) {
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
        } else {
            //update session
            $userSession->update([
                'id' => $userSession->id,
                'user_id' => $user->id,
                'ip_address' => request()->ip(),
                'user_agent' => request()->header('User-Agent'),
                'token' => $userData['token'],
                'api_token' => $this->getSessionApiToken($user->id_per),
                'env' => $this->env,
                'language' => 'fr',
                'payload' => json_encode($userData),
            ]);
        }

        return $userSession;
    }

        
    /**
     * getSessionApiToken
     *
     * @param  mixed $idPer
     * @return void
     */
    private function getSessionApiToken($idPer)
    {
        $user = User::where('id_per', $idPer)->first();

        if (isset($idPer) && isset($user)) {
            $userSession = $user->session()->first();
            if (isset($userSession) && isset($userSession->api_token)) {
                return $userSession->api_token;
            }
        }
        //else return a new token
        return bin2hex(random_bytes(64));
    }
}
