<?php

namespace Modules\Extranet\Jobs\ResetPassword;

use GuzzleHttp\Client;
use Modules\Extranet\Entities\LoginAttempt;
use Modules\Extranet\Extensions\VeosWsUrl;
use Modules\Extranet\Http\Requests\ResetPassword\SendEmailRequest;

class SendResetPassword
{
    private $env;

    public function __construct(array $attributes)
    {
        $this->attributes = array_only($attributes, [
            'email',
            'env',
        ]);

        $this->env = isset($this->attributes['env'])
          ? $this->attributes['env']
          : VeosWsUrl::PROD;

        $this->client = new Client();
    }

    public static function fromRequest(SendEmailRequest $request)
    {
        return new SendResetPassword($request->all());
    }

    public function handle()
    {

        try {
            $WsUrl = VeosWsUrl::getEnvironmentUrl($this->env);

            $result = $this->client->post($WsUrl.'login/reset/request', [
                'json' => [
                    'uid' => $this->attributes['email'],
                    'url' => route('change-password', $this->env == VeosWsUrl::PROD ? '' : $this->env),
                    'idMail' => null,
                ],
            ]);

            $response = json_decode($result->getBody()->getContents());

            return isset($response->token) ? true : false;
        } catch (\Exception $ex) {
            throw $ex;
        }

        return false;
    }

    
}
