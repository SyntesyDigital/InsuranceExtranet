<?php

namespace Modules\Extranet\Jobs\ResetPassword;

use GuzzleHttp\Client;
use Modules\Extranet\Extensions\VeosWsUrl;
use Modules\Extranet\Http\Requests\ResetPassword\ChangePasswordRequest;
use Modules\Extranet\Repositories\PersonneRepository;

class ChangePassword
{
    private $env;

    public function __construct(array $attributes)
    {
        $this->attributes = array_only($attributes, [
            'password',
            'uid',
            'token',
            'env',
        ]);

        $this->env = isset($this->attributes['env'])
            ? $this->attributes['env']
            : VeosWsUrl::PROD;

        $this->repository = new PersonneRepository();
    }

    public static function fromRequest(ChangePasswordRequest $request)
    {
        return new ChangePassword($request->all());
    }

    public function handle()
    {
        try {
            $client = new Client();

            $WsUrl = VeosWsUrl::getEnvironmentUrl($this->env);

            $client->post($WsUrl.'login/reset/apply', [
                'json' => [
                    'passwd' => $this->attributes['password'],
                    'token' => $this->attributes['token'],
                ],
            ]);

            if (get_config('LOGIN_LIMIT_ATTEMPTS')) {
                $this->repository->flushLoginAttempt(trim($this->attributes['uid']), $this->env);
            }

            return true;
        } catch (\Exception $ex) {
            throw $ex;
        }

        return false;
    }
}
