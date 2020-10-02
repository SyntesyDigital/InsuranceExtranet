@php
    $identifier = str_replace(",","",$field['identifier']);
    $identifier = str_replace("[","",$identifier);
    $identifier = str_replace("]","",$identifier).'_'.$iterator;
    $visible = check_visible($field['settings'],$parameters);
@endphp

@if($visible)
    <div id="{{$field['settings']['htmlId'] or ''}}" class="widget image_text_link image {{$field['settings']['htmlClass'] or ''}}">
        <div 
            id="lastNewsList" 
            class="lastNewsList" 
            field="{{ isset($field) ? base64_encode(json_encode($field)) : null }}" 
            typology_id="{{ isset($field['settings']['typology_id']) ? $field['settings']['typology_id'] : null }}"
        >
        </div>
    </div>
@endif

