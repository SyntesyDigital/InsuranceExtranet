@php
  $link = "";
  $target = "";
  if(isset($field['value']['content'])){
    //is internal
    $content = $field['value']['content'];
    $link = $content->url;
  }
  else {
    //is external
    $target = "_blank";
    $link = isset($field['value']['url'][App::getLocale()]) ? $field['value']['url'][App::getLocale()] : '';
  }

  if(isset($parameters) && $link != ""){
    $link .= "?".$parameters;
  }

@endphp

@if(!isset($div))
<div>
@endif

  @if(isset($link) && $link != "")
  <a target="{{$target}}" href="{{$link}}" id="{{$field['settings']['htmlId'] or ''}}" class="{{$field['settings']['htmlClass'] or ''}}">
    @if(isset($icon) && $icon && $icon != '')
      <i class="{{$icon}}"></i>
    @endif
    {{$field['value']['title'][App::getLocale()] or ''}}
  </a>
  @else

    @if(!isset($p))
    <p class="titol">
    @endif
      {{$field['value']['title'][App::getLocale()] or ''}}

    @if(!isset($p))
    </p>
    @endif

  @endif

@if(!isset($div))
</div>
@endif
