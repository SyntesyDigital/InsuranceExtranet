
@php

  $fieldValue = isset($field['value']) ? $field['value'] : (isset($field['values']) ? $field['values'] : null);

  if(isset($fieldValue)){
    $carbon = Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $fieldValue, 'Europe/London');
    //$value = $carbon->formatLocalized('%A %d %B %Y');
    $value = $carbon->formatLocalized('%d/%m/%Y');
  }

@endphp

<div id="{{$settings['htmlId'] or ''}}" class="{{$settings['htmlClass'] or ''}}">
  {{$value or ''}}
</div>
