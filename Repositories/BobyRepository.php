<?php

namespace Modules\Extranet\Repositories;

use Auth;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Cache;
use Modules\Extranet\Extensions\VeosWsUrl;

class BobyRepository
{
    public function __construct()
    {
        $this->client = new Client();
    }

    public function getQuery($name)
    {
        $cacheKey = md5('getQuery_'.$name);

        if (Cache::has($cacheKey) && false) {
            $beans = Cache::get($cacheKey);
        } else {
            $response = $this->client->get(VeosWsUrl::get().'boBy/v2/'.$name, [
                'headers' => [
                    'Authorization' => 'Bearer '.Auth::user()->token,
                ],
            ]);

            return json_decode($response->getBody());

            // if (isset($result->responses[0])) {
            //     if ((isset($result->responses[0]->statusCode)) && $result->responses[0]->statusCode == 1) {
            //         throw new \Exception($result->responses[0]->statusMessage);
            //     }
            // }

            // $beans = isset($result->responses[0]->beans) ? $result->responses[0]->beans : null;

            Cache::put($cacheKey, $beans, config('cache.time'));
        }

        return $beans;
    }

    public function getModelValuesQuery($name)
    {
        $cacheKey = md5('getQuery_'.$name);

        if (Cache::has($cacheKey) && false) {
            $beans = Cache::get($cacheKey);
        } else {
            $response = $this->client->get(VeosWsUrl::get().'boBy/v2/'.$name, [
                'headers' => [
                    'Authorization' => 'Bearer '.Auth::user()->token,
                ],
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
        $cacheKey = md5('postQuery_'.$name.json_encode($params));

        if (Cache::has($cacheKey) && false) {
            $beans = Cache::get($cacheKey);
        } else {
            $response = $this->client->post(VeosWsUrl::get().'boBy/list', [
                'json' => ['requests' => [[
                    'name' => $name,
                    'params' => $params,
                ]]],
                'headers' => [
                    'Authorization' => 'Bearer '.Auth::user()->token,
                ],
            ]);

            $result = json_decode($response->getBody());
            if (isset($result->responses[0])) {
                if ((isset($result->responses[0]->statusCode)) && $result->responses[0]->statusCode == 1) {
                    throw new \Exception($result->responses[0]->statusMessage);
                }
            }
            $beans = isset($result->responses[0]->beans) ? $result->responses[0]->beans : null;

            Cache::put($cacheKey, $beans, config('cache.time'));
        }

        return $beans;
    }

    public function processService($method, $url, $data, $isArray)
    {
        if ($isArray) {
            //is array ( example documents ) process every item
            foreach ($data as $item) {
                $result = $this->processMethod($method, $url, $item);
            }
            //FIXME get a response that represents all items
            return $result;
        } else if(is_array($url)){
            //process every post of array
            foreach($url as $currentUrl){
                $result = $this->processMethod($method, $currentUrl, $data);
            }
            return $result;
        } else {
            return $this->processMethod($method, $url, $data);
        }
    }

    private function processMethod($method, $url, $data)
    {
        $params = [
          'json' => $data,
          'headers' => [
              'Authorization' => 'Bearer '.Auth::user()->token,
          ],
      ];

        switch ($method) {
         case 'POST':
            $response = $this->client->post(VeosWsUrl::get().$url, $params);
            break;
         case 'PUT':
            $response = $this->client->put(VeosWsUrl::get().$url, $params);
            break;
        case 'PUT*':  //FIXME to delete when not used
        case 'PUT_2':
           $response = $this->client->put(VeosWsUrl::get().$url, $params);
           break;
         case 'GET':
           $response = $this->client->get(VeosWsUrl::get().$url.$this->params2url($url,$params['json']), $params);
           break;
         //case "DELETE":
            //return $this->client->delete(VeosWsUrl::get() . $url, $params);
         default:
           return null;
      }

        return json_decode($response->getBody());
    }

    private function params2url($baseUrl, $params){

        //if base url already contains ? continue url with &
        $firstChar = strpos($baseUrl, "?") === false ? "?" : "&";
        $first = true;
        $url = "";
        if(!isset($params))
            return $url;
            
        foreach($params as $key => $value){
            if($value != "" && $value != null){
                $url .= ($first? $firstChar :'&').$key."=".$value;
                $first = false;
            }
        }
        return $url;
    }

    public function checkDocumentAvailable($id)
    {
        $response = $this->client->get(VeosWsUrl::get().'boBy/v2/WS_EXT2_DEF_PERMISDOC?id_doc='.$id, [
          'headers' => [
              'Authorization' => 'Bearer '.Auth::user()->token,
          ],
      ]);

        $result = json_decode($response->getBody());

        if (isset($result->data[0])) {
            if ($result->data[0]->PERMIS == 'yes') {
                return true;
            }
        }

        return false;
    }
}
