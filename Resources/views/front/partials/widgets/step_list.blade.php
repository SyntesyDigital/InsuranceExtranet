@php
    $identifier = str_replace(",","",$field['identifier']);
    $identifier = str_replace("[","",$identifier);
    $identifier = str_replace("]","",$identifier).'_'.$iterator;
    $visible = check_visible($field['settings'],$parameters);
@endphp

@if($visible)
    <div id="{{$field['settings']['htmlId'] or ''}}" class="widget step-list image {{$field['settings']['htmlClass'] or ''}}">
        <div 
            id="stepList" 
            class="stepList" 
            field="{{ isset($field) ? base64_encode(json_encode($field)) : null }}" 
            parameters="{{$parameters}}"
        >
        </div>
    </div>
@endif

