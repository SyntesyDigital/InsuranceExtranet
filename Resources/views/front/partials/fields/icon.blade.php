@php
    $visible = check_visible($field['settings'],$parameters);
@endphp

@if ($visible)
    <div id="{{$field['settings']['htmlId'] or ''}}" class="{{$field['settings']['htmlClass'] or ''}}">
        <i class="{{$field['value'] or ''}}" style="font-size: {{$field['settings']['fontSize'] or ''}}px;"></i>
    </div>
@endif

