@php
  $height = isset($field['settings']['height']) ? intval($field['settings']['height']) : 20;
@endphp

<div id="{{$field['settings']['htmlId'] or ''}}"
  class="separator {{$field['settings']['htmlClass'] or ''}}"
  style="height:{{$height}}px"
  >
</div>
