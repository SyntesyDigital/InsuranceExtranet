@php
    $visible = check_visible($field['settings'],$parameters);
@endphp

@if($visible)
    <div 
        id="{{$field['settings']['htmlId'] or ''}}" 
        class="widget tabs-list-widget {{$field['settings']['htmlClass'] or ''}}" 
        >
        <div 
            id="tabsList" 
            class="tabsList" 
            data-parameters="{{$parameters}}"
            field="{{ isset($field) ? base64_encode(json_encode($field)) : null }}" 
        >
        </div>
    </div>
@endif