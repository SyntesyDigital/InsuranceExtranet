@php

@endphp
<div id="{{$field['settings']['htmlId'] or ''}}" class="{{$field['settings']['htmlClass'] or ''}}">
  <div id="map-field"
    field="{{ isset($field) ? base64_encode(json_encode($field)) : null }}"
  >
  </div>
</div>
