<?php

namespace Modules\Extranet\Services\Autosave\Traits;

use stdClass;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ServerException;
use Modules\Extranet\Extensions\VeosWsUrl;

trait AutosaveVeosQuery
{
           
    /**
     * read
     *
     * @param  mixed $id
     * @param  mixed $name
     * @return void
     */
    public function read($id, $name) 
    {
        $this->url = str_replace('/rsExtranet2/', '/', VeosWsUrl::get());
        $this->url .= 'rsUpdateBoByTrs/json';

        // Init guzzle client
        $this->client = new Client();

        

        // Build request
        $request = new stdClass();
        $request->name = 'SEL_APP_PARAM';
        $request->params = json_decode(json_encode([
            'CLE_PARAM' => $id,
            'NOM_PARAM' => $name,
        ]));

        
        
        // Build payload with credentials
        $payload = new stdClass();
        $payload->uid = 'WS';
        $payload->passwd = 'WS1234';
        $payload->requests = [];

        $payload->requests[] = $request;

        try {

            $response = $this->client->post($this->url, [
                'json' => $payload
            ]);

            $result = json_decode($response->getBody());

            //dd($this->url,$payload,$result);

            return $result;

        } catch (ServerException $ex) {            
            //abort(500, $ex->getResponse()->getBody());
        }

        return false;
    }

        
    /**
     * delete
     *
     * @param  mixed $key
     * @return void
     */
    public function delete($key, $name = "BASKET") 
    {
        // Build WS URL
        $this->url = str_replace('/rsExtranet2/', '/', VeosWsUrl::get());
        $this->url .= 'rsUpdateBoByTrs/json';

        // Init guzzle client
        $this->client = new Client();

        // Build request
        $request = new stdClass();
        $request->params = json_decode(json_encode([
            'CLE_PARAM' => $key,
            'NOM_PARAM' => $name,
        ]));
        $request->name = 'DEL_APP_PARAM';

        // Build payload with credentials
        $payload = new stdClass();
        $payload->uid = 'WS';
        $payload->passwd = 'WS1234';
        $payload->requests = [];

        // Inject request into payload
        $payload->requests[] = $request;

        // Query the WS
        try {
            $this->client->post($this->url, [
                'json' => $payload
            ]);

            return true;
        } catch (ServerException $ex) {            
            abort(500, $ex->getResponse()->getBody());
        }

        return false;
    }


    /**
     * save
     *
     * @param  mixed $action
     * @param  mixed $params
     * @return void
     */
    public function save($action, $params) 
    {
        // Build WS URL
        $this->url = str_replace('/rsExtranet2/', '/', VeosWsUrl::get());
        $this->url .= 'rsUpdateBoByTrs/json';

        // Init guzzle client
        $this->client = new Client();

        // Build request
        $request = new stdClass();
        $request->params = json_decode(json_encode($params));
        $request->name = $action == 'create' 
            ? 'ADD_APP_PARAM' 
            : 'UPDT_APP_PARAM';

        // Build payload with credentials
        $payload = new stdClass();
        $payload->uid = 'WS';
        $payload->passwd = 'WS1234';
        $payload->requests = [];

        // Inject request into payload
        $payload->requests[] = $request;

        // Query the WS
        // try {
            $result = $this->client->post($this->url, [
                'json' => $payload
            ]);

            //dd($this->url,$payload,$result);

            return $params['CLE_PARAM'];
        // } catch (ServerException $ex) {            
        //     //abort(500, $ex->getResponse()->getBody());
        // }

        return false;
    }
}
