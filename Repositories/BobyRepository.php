<?php

namespace Modules\Extranet\Repositories;

use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;
use Auth;
use Session;

use App\Extensions\VeosWsUrl;
use Illuminate\Support\Facades\Cache;

class BobyRepository
{

    public function __construct()
    {
        $this->client = new Client();
    }

    public function getQuery($name)
    {
        $cacheKey = md5("getQuery_" . $name);

        if (Cache::has($cacheKey) && false) {
            $beans = Cache::get($cacheKey);
        } else {
            $response = $this->client->get(VeosWsUrl::get() . 'boBy/v2/'.$name, [
                'headers' => [
                    'Authorization' => "Bearer " . Auth::user()->token
                ]
            ]);

            $result = json_decode($response->getBody());
            if(isset($result->responses[0])) {
                if((isset($result->responses[0]->statusCode)) && $result->responses[0]->statusCode == 1) {
                    throw new \Exception($result->responses[0]->statusMessage);
                }
            }
            $beans = isset($result->responses[0]->beans) ? $result->responses[0]->beans : null;

            Cache::put($cacheKey, $beans, config('cache.time'));
        }

        return $beans;
    }

    public function getModelValuesQuery($name)
    {
        $cacheKey = md5("getQuery_" . $name);

        if (Cache::has($cacheKey)) {
            $beans = Cache::get($cacheKey);
        } else {
            $response = $this->client->get(VeosWsUrl::get() . 'boBy/v2/'.$name, [
                'headers' => [
                    'Authorization' => "Bearer " . Auth::user()->token
                ]
            ]);

            $result = json_decode($response->getBody());
            $beans['modelValues'] = $result->data;
            $beans['completeObject'] = $result;

            Cache::put($cacheKey, $beans, config('cache.time'));
        }

        return $beans;
    }

    public function postQuery($name, $params = null)
    {
        $cacheKey = md5("postQuery_" . $name . json_encode($params));

        if (Cache::has($cacheKey)) {
            $beans = Cache::get($cacheKey);
        } else {
            $response = $this->client->post(VeosWsUrl::get() . 'boBy/list', [
                'json' => ["requests" =>[[
                    "name" => $name,
                    "params" => $params
                ]]],
                'headers' => [
                    'Authorization' => "Bearer " . Auth::user()->token
                ]
            ]);

            $result = json_decode($response->getBody());
            if(isset($result->responses[0])) {
                if((isset($result->responses[0]->statusCode)) && $result->responses[0]->statusCode == 1) {
                    throw new \Exception($result->responses[0]->statusMessage);
                }
            }
            $beans = isset($result->responses[0]->beans) ? $result->responses[0]->beans : null;

            Cache::put($cacheKey, $beans, config('cache.time'));
        }

        return $beans;
    }

    public function processService($method,$url,$data,$isArray)
    {
        if($isArray){
          //is array ( example documents ) process every item
          foreach($data as $item){
            $result = $this->processMethod($method,$url,$item);
          }
          //FIXME get a response that represents all items
          return $result;
        }
        else {
          return $this->processMethod($method,$url,$data);
        }

    }

    private function processMethod($method,$url,$data)
    {
      $params = [
          'json' => $data,
          'headers' => [
              'Authorization' => "Bearer " . Auth::user()->token
          ]
      ];

      switch($method){
         case "POST":
            $response = $this->client->post(VeosWsUrl::get() . $url, $params);
            break;
         case "PUT":
            $response = $this->client->put(VeosWsUrl::get() . $url, $params);
            break;
         case "GET":
           $response = $this->client->get(VeosWsUrl::get() . $url, $params);
           break;
         //case "DELETE":
            //return $this->client->delete(VeosWsUrl::get() . $url, $params);
         default:
           return null;
      }

      return json_decode($response->getBody());
    }



    public function checkDocumentAvailable($id)
    {
      $response = $this->client->get(VeosWsUrl::get() . 'boBy/v2/WS_EXT2_DEF_PERMISDOC?id_doc='.$id, [
          'headers' => [
              'Authorization' => "Bearer " . Auth::user()->token
          ]
      ]);

      $result = json_decode($response->getBody());

      if(isset($result->data[0])){
        if($result->data[0]->PERMIS == "yes"){
          return true;
        }
      }

      return false;
    }


}
