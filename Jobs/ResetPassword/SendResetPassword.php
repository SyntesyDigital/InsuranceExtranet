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

    public function __construct(array $attributes)
    {
        $this->attributes = array_only($attributes, [
            'email',
            'env'
        ]);

        $this->env = isset($this->attributes['env']) 
          ? $this->attributes['env'] 
          : VeosWsUrl::PROD;        
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

        $urlEnv = $this->env == VeosWsUrl::PROD ? "" : $this->env;

        $json = [
          'uid' => $this->attributes['email'],
          'url' => route('change-password',$urlEnv),
          'idMail' => null,
        ];

        $result = $client->post($WsUrl.'login/reset/request', [
            'json' => $json,
        ]);
        return true;
        
      }
      catch (\Exception $ex) {
        throw $ex;
      }

      return false;
    }
}
