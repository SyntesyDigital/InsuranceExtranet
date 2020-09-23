@php
  $height = isset($field['settings']['height']) ? intval($field['settings']['height']) : 20;
  $visible = check_visible($field['settings'],$parameters);
@endphp

@if($visible)
    <div id="{{$field['settings']['htmlId'] or ''}}"
    class="separator {{$field['settings']['htmlClass'] or ''}}"
    style="height:{{$height}}px"
    >
    </div>
@endif
