<?php

namespace Modules\Extranet\Repositories;

use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;
use Auth;
use Session;
use App\Extensions\VeosWsUrl;
use Config;

class SinistreRepository
{

    public function __construct()
    {
        $this->client = new Client();
    }

    /*
    *   Récupération sinistre
    *   API : [GET] /sinistre/{id}
    *
    *   @return Sinister Object
    */
    public function find($id)
    {
        $response = $this->client->get(VeosWsUrl::get() . 'sinistre/' . $id, [
            'headers' => [
                'Authorization' => "Bearer " . Session::get('iga_token')
            ]
        ]);

        return json_decode($response->getBody());
    }

    /*
    *   Création sinistre
    *   API : [POST] /sinistre/
    *
    *   @return stdClass
    */
    public function create($data)
    {
        $response = $this->client->post(VeosWsUrl::get() . 'sinistre/', [
            'json' => $data,
            'headers' => [
                'Authorization' => "Bearer " . Session::get('iga_token'),
            ]
        ]);

        return json_decode($response->getBody());
    }

    /*
    *   Edit sinistre
    *   API : [PUT] /sinistre/id
    *
    *   @return Sinister Object
    */
    public function update($id,$data)
    {
        $response = $this->client->put(VeosWsUrl::get() . 'sinistre/'.$id, [
            'json' => $data,
            'headers' => [
                'Authorization' => "Bearer " . Session::get('iga_token'),
            ]
        ]);

        return json_decode($response->getBody());
    }


    /**********************************************************************
    *   Transformer to implement comunication between JSON from VEOS
    *   and html form data.
    */
    public function processGet($sinister)
    {
      $fields = Config::get('models.sinister.fields');

      $formValues = (object)[];
      foreach($fields as $field) {

        $key = $field["identifier"];

        if(str_contains($key,'listInfos')){
          //is a listInfo
          $formValues->{$field['name']} = $this->getListInfoValue(
            $field['identifier'],$sinister->listInfos);
        }
        else {
          $formValues->{$field['name']} = $sinister->{$key};
        }
      }

      return $formValues;

    }

    private function getListInfoValue($identifier,$listInfos){
      $key = explode('.',$identifier)[1];

      foreach($listInfos as $info){
        if($info->key == $key){
          return $info->value;
        }
      }
      return '';
    }


}
