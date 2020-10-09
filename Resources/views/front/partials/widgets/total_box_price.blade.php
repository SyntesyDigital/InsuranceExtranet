@php

  $identifier = str_replace(",","",$field['identifier']);
  $identifier = str_replace("[","",$identifier);
  $identifier = str_replace("]","",$identifier).'_'.$iterator;
  $link = "";
  $target = "";

  if(isset($field['fields'][3]['value']['content'])){
    $content = $field['fields'][3]['value']['content'];
    $link = $content->url;
  }
  else {
    //is external
    $target = "_blank";
    $link = isset($field['fields'][3]['value']['url'][App::getLocale()]) ? $field['fields'][3]['value']['url'][App::getLocale()] : '';
  }

  $elementObject = null;
  if(isset($field['settings']['fileElements'])){
    $elementObject = \Modules\Extranet\Entities\Element::where('id',$field['settings']['fileElements'])->first()->load('fields');
  }
  
  $model = isset($elementObject) ? $elementObject->getModel($models) : null;

  $visible = check_visible($field['settings'],$parameters);

@endphp

@if(isset($field['settings']['backgroundHoverColor']))
  <style>
    body .total-box-price-container.identifier-{{$identifier}}:hover{
      background-color: {{$field['settings']['backgroundHoverColor']}} !important;
    } 
  </style>
@endif

@if(isset($field['settings']['backgroundColor']))
  <style>
    body .total-box-price-container.identifier-{{$identifier}}{
      background-color: {{$field['settings']['backgroundColor']}} !important;
    }
  </style>
@endif

@if($visible)

  @if(isset($link) && $link != "")
    <a target="{{$target}}" href="{{$link}}" class="total-box-container-a">
  @endif

    <div id="{{$field['settings']['htmlId'] or ''}}" class="total-box-price-container identifier-{{$identifier}} {{$field['settings']['htmlClass'] or ''}}">
        <div id="totalBoxPrice" class="totalBoxPrice"
            elementObject="{{base64_encode(json_encode($elementObject))}}"
            model="{{base64_encode(json_encode($model))}}"
            parameters="{{$parameters}}"
            title="{{$field['fields'][0]['value'][App::getLocale()]}}"
            subTitle="{{$field['fields'][1]['value'][App::getLocale()]}}"
            subTitle2="{{$field['fields'][2]['value'][App::getLocale()]}}"
        >
        </div>
    </div>
  @if(isset($link) && $link != "")
    </a>
  @endif
@endif
