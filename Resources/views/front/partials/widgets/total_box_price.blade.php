@php

  $identifier = str_replace(",","",$field['identifier']);
  $identifier = str_replace("[","",$identifier);
  $identifier = str_replace("]","",$identifier).'_'.$iterator;

  $link = "";
  $target = "";
  $title = $field['fields'][0]['value'][App::getLocale()];
  $subTitle = $field['fields'][1]['value'][App::getLocale()];
  $subTitle2 = $field['fields'][2]['value'][App::getLocale()];
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
  $model = null;

  if(isset($elementObject) && isset($models[$elementObject->model_identifier])){
    $model = $models[$elementObject->model_identifier];
  }

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
    <a target="{{$target}}" href="{{$link}}" class="total-box-container-a" >
  @endif

    <div id="{{$field['settings']['htmlId'] or ''}}" class="total-box-price-container identifier-{{$identifier}} {{$field['settings']['htmlClass'] or ''}}">
      <div class="row">
        <div class="col-md-12 col-sm-12 col-xs-12 title-container">
          <div class="title">{{$title}}</div>
        </div>
        <div class="col-md-12 col-sm-12 col-xs-12 number-container">
          <div class="col-md-4 nopadding">
            <div id="totalBoxPrice" class="totalBoxPrice"
              elementObject="{{base64_encode(json_encode($elementObject))}}"
              model="{{base64_encode(json_encode($model))}}"
              parameters="{{$parameters}}"
            >
              XXXX €
            </div>
          </div>
          <div class="col-md-8 nopadding container-subtitle">
            @if(isset($subTitle) && $subTitle != "") 
              <p><span class="subtitle"> {{$subTitle}} XXX €</span></p>
            @endif
          </div>
        </div>
        <div class="col-md-12 col-sm-12 col-xs-12 container-subtitle2">
          @if(isset($subTitle2) && $subTitle2 != "") 
            <p><span class="subtitle2">{{$subTitle2}}</span></p>
          @endif
        </div>
      </div>
    </div>
  @if(isset($link) && $link != "")
    </a>
  @endif

@endif
