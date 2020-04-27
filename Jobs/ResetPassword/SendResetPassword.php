<?php

namespace Modules\Extranet\Jobs\ResetPassword;

use Modules\Extranet\Http\Requests\ResetPassword\SendEmailRequest;

use GuzzleHttp\Exception\GuzzleException;
use Modules\Extranet\Extensions\VeosWsUrl;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Cache;

use Session;
use Lang;
use Config;

class SendResetPassword
{

    private $env;

    public function __construct(array $attributes,$env = null)
    {
        $this->attributes = array_only($attributes, [
            'email'
        ]);
        $this->env = $env != null ? $env : VeosWsUrl::PROD;
    }

    public static function fromRequest(SendEmailRequest $request)
    {
        return new SendResetPassword($request->all());
    }

    public function handle()
    {
      try {
        $client = new Client();

        $WsUrl = VeosWsUrl::getEnvironmentUrl($this->env);

        $json = [
          'uid' => $this->attributes['email'],
          'passwd' => route('change-password'),
          'idMail' => '222',
        ];

        $result = $client->post($WsUrl.'login/reset/request', [
            'json' => $json,
        ]);

        $result = $result->getBody()->getContents();

        if ($result->statusCode == 0) {
          Cache::put(
            $this->attributes['email'], 
            $result->token, 
            120 // 2 minutes
          );
        }
        else {
          //trhow exception
        }
        
      }
      catch (\Exception $ex) {
        throw $ex;
      }

      return true;
    }
}
