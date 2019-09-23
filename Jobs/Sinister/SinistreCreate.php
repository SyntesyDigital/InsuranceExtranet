<?php

namespace Modules\Extranet\Jobs\Sinister;

use Modules\Extranet\Http\Requests\Sinister\CreateSinisterRequest;

use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;

use Modules\Extranet\Repositories\SinistreRepository;

use Session;
use Auth;
use Config;

class SinistreCreate
{
    private $policeId;
    private $attributes;

    public function __construct(array $attributes = [])
    {

        $fields = Config::get('models.sinister.fields');

        $values = [];
        $this->keys = [];
        foreach($fields as $field){
          $values[] = $field["name"];
          $this->keys[$field["name"]] = $field["identifier"];
        }

        $this->attributes = array_only($attributes, $values);
    }

    public static function fromRequest(CreateSinisterRequest $request)
    {
        return new SinistreCreate($request->all());
    }

    private function procesListinfo($jsonData,$jsonKey,$value)
    {

      $keyArray = explode('.',$jsonKey);
      $key = $keyArray[1];

      foreach($jsonData["listInfos"] as $index => $info){
        if($info["key"] == $key){
          $jsonData["listInfos"][$index]['value'] = $value;
          break;
        }
      }

      return $jsonData;
    }

    public function handle()
    {
        $data = $this->attributes;

        $sinister = new SinistreRepository();

        $jsonData = Config::get('models.sinister.POST');

        //process all data from form to JSON
        foreach($this->attributes as $key => $value){
          $jsonKey = $this->keys[$key];

          if(str_contains($jsonKey,'listInfos')){
            //is a listInfo
            $jsonData = $this->procesListinfo($jsonData,$jsonKey,$value);

          }
          else {
            $jsonData[$jsonKey] = $value;
          }
        }

        //process helper funtions
        foreach($jsonData as $key => $value){

          if($key != "listInfos" && str_contains($value,'_now')){
            $jsonData[$key] = date('d/m/Y');
          }
        }

        //process json data
        $createResponse = $sinister->create($jsonData);

        if(isset($createResponse->id)){
          return $createResponse->id;
        }

        return null;

    }
}
