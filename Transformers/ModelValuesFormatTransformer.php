<?php

namespace Modules\Extranet\Transformers;

use Illuminate\Http\Resources\Json\Resource;
use Carbon\Carbon;
use Modules\Architect\Entities\Content;


class ModelValuesFormatTransformer extends Resource
{
    protected $element;

    public function __construct($modelValues,$elementFields,$limit) {
        $this->modelValues = $modelValues;
        $this->elementFields = $elementFields;
        $this->limit = $limit;

        /*
          [id] => url
          $contentURls[1] = "http://www...."
        */
        $this->contentUrls = [];
    }
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request = null)
    {
        return $this->getModelArray($this->modelValues,$this->elementFields, $this->limit);
    }

    public function toJson($request = null)
    {
      return json_encode($this->toArray($request));
    }

    private function processContent($hasRoute,$modelValue,$value)
    {

      if(isset($hasRoute['id'])){

        if(!isset($this->contentUrls[$hasRoute['id']])){
          //get the url
          $content = Content::find($hasRoute['id']);
          $this->contentUrls[$content->id] = $content->url;
          $url = $content->url;
        }
        else {
          $url = $this->contentUrls[$hasRoute['id']];
        }

        //process parameters
        if($hasRoute['params'] != null && sizeof($hasRoute['params']) > 0){

          $url.="?";
          $first = true;
          foreach($hasRoute['params'] as $param ){
            if($param['value'] != "" && $modelValue->{$param['value']} != null ){
              if(!$first){
                  $url.="&";
              }
              $url.= $param['identifier'].'='.$modelValue->{$param['value']};
              $first = false;
            }
          }
        }
      }
      return '<a href="'.$url.'">'.$value.'</a>';
    }

    public function getModelArray($modelValues, $elementFields, $limit)
    {

      $result = [];
      $i = 0;
      $isTable = false;

      if(sizeof($modelValues) > 1){
        $isTable = true;
      }

      try {

        foreach ($modelValues as $modelValue) {
          if(!$limit || $i < $limit ){

            foreach ($elementFields as $elementField) {
              $originalValue = $modelValue->{$elementField->identifier};

              switch ($elementField->type) {
                case 'number':

                  if(!$isTable){

                    if($elementField->settings['format'] == 'price'){
                      $result[$i][$elementField->identifier] = number_format ( $originalValue , 0 , ',' , '.' ).' €';
                    }elseif($elementField->settings['format'] == 'price_with_decimals'){
                      $result[$i][$elementField->identifier] = number_format ( $originalValue , 2 , ',' , '.' ).' €';
                    }else{
                      $result[$i][$elementField->identifier] = $originalValue !== null?$originalValue:'';
                    }

                  }else{
                    $result[$i][$elementField->identifier] = $originalValue != ''? intval($originalValue):0;
                  }

                  break;
                case 'text':
                  if($elementField->settings['format'] == 'email'){
                    $result[$i][$elementField->identifier] = $originalValue?$originalValue:'';
                  }elseif($elementField->settings['format'] == 'telephone'){
                    $result[$i][$elementField->identifier] = $originalValue?$originalValue:'';
                  }else{
                    $result[$i][$elementField->identifier] = $originalValue?$originalValue:'';
                  }
                  break;
                case 'date':

                  $originalValue = intval($originalValue)/1000;
                  $result[$i][$elementField->identifier] = $originalValue ? $originalValue: '';

                  //only process date when is not table. At tables date is processed in react to sort properly
                  if(!$isTable){

                    if($elementField->settings['format'] == 'day_month_year'){
                      $result[$i][$elementField->identifier] = Carbon::createFromTimestamp($originalValue)->format('d-m-Y');
                    }elseif($elementField->settings['format'] == 'month_year'){
                      $result[$i][$elementField->identifier] = Carbon::createFromTimestamp($originalValue)->format('m-Y');
                    }elseif($elementField->settings['format'] == 'year'){
                      $result[$i][$elementField->identifier] = Carbon::createFromTimestamp($originalValue)->format('Y');
                    }
                  }

                  break;
                case 'file':

                  $fileLink = '';
                  if($originalValue != null && $originalValue != ''){
                    $fileLink = '<a href="'.route("document.show",$originalValue).'" class="file-link"><i class="fas fa-file-download"></i></a>';
                  }
                  $result[$i][$elementField->identifier] = $fileLink;

                  break;

                default:
                  $result[$i][$elementField->identifier] = $originalValue?$originalValue:'';
                  break;
              }

              if(isset($elementField->settings) &&
                isset($elementField->settings['hasRoute']) && $elementField->settings['hasRoute'] != null
                && isset($elementField->settings['hasRoute']['id'])
              ){

                $link = $this->processContent(
                  $elementField->settings['hasRoute'],
                  $modelValue,
                  $result[$i][$elementField->identifier]
                );

                //to allow order when table, need to process separately link and value
                if($isTable){
                  $result[$i][$elementField->identifier] =
                    $result[$i][$elementField->identifier].";".$link;
                }
                else {
                  $result[$i][$elementField->identifier] = $link;
                }

              }

            }
          }
          $i++;
        }

      }
      catch(Exception $e){
        dd($e->getMessage());
      }

      return $result;
    }

}
