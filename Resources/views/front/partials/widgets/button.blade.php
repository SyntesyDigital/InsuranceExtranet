@php
  $linkField = $field['fields'][0];
  $link = "";
  $target = "";
  if(isset($linkField['value']['content'])){
    //is internal
    $content = $linkField['value']['content'];
    $link = $content->url;
  }
  else {
    //is external
    $target = "_blank";
    $link = isset($linkField['value']['url'][App::getLocale()]) ? $linkField['value']['url'][App::getLocale()] : '';
  }
  $visible = check_visible($field['settings'],$parameters);

@endphp

@if($visible)
    <div>
    <a target="{{$target}}" href="{{$link}}" id="{{$field['settings']['htmlId'] or ''}}" class="btn {{$field['settings']['htmlClass'] or ''}}">
        {{$linkField['value']['title'][App::getLocale()] or ''}}
    </a>
    </div>
@endif