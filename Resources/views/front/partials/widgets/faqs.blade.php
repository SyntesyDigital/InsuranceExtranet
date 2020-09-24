@php
    $visible = check_visible($field['settings'],$parameters);
@endphp

@if($visible)
    <div id="{{$field['settings']['htmlId'] or ''}}" class="widget faqs-widget {{$field['settings']['htmlClass'] or ''}}">
        <div 
            id="faqs" 
            class="faqs" 
            field="{{ isset($field) ? base64_encode(json_encode($field)) : null }}"
            data-parameters="{{$parameters}}"
        >
        </div>
    </div>
@endif
