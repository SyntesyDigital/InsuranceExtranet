@php
    $identifier = str_replace(",","",$field['identifier']);
    $identifier = str_replace("[","",$identifier);
    $identifier = str_replace("]","",$identifier).'_'.$iterator;
    $visible = check_visible($field['settings'],$parameters);
@endphp

@if($visible)
    <div id="{{$field['settings']['htmlId'] or ''}}" class="widget simple-button-widget {{$field['settings']['htmlClass'] or ''}}">
        <div 
            id="simpleButton" 
            class="simpleButton" 
            field="{{ isset($field) ? base64_encode(json_encode($field)) : null }}"
            @if (isset($field['settings']['alignContent']))
                style="float: {{$field['settings']['alignContent']}}" 
            @endif
        >
        </div>
    </div>
@endif
