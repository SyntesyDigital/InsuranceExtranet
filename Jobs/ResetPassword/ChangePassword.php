<?php

namespace Modules\Extranet\Jobs\ResetPassword;

use Modules\Extranet\Http\Requests\ResetPassword\ChangePasswordRequest;

use GuzzleHttp\Exception\GuzzleException;
use Modules\Extranet\Extensions\VeosWsUrl;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Cache;

use Session;
use Lang;
use Config;

class ChangePassword
{

    private $env;

    public function __construct(array $attributes)
    {
        $this->attributes = array_only($attributes, [
            'password',
            'token',
            'env'
        ]);

        $this->env = isset($this->attributes['env']) 
          ? $this->attributes['env'] 
          : VeosWsUrl::PROD;        
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

        $json = [
          'passwd' => $this->attributes['password'],
          'token' => $this->attributes['token'],
        ];

        $result = $client->post($WsUrl.'login/reset/apply', [
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
