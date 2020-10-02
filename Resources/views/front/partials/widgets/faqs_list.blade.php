@php
    $visible = check_visible($field['settings'],$parameters);
@endphp

@if($visible)
    <div 
        id="{{$field['settings']['htmlId'] or ''}}" 
        class="widget faqs-list-widget {{$field['settings']['htmlClass'] or ''}}" 
        >
        <div 
            id="faqsList" 
            class="faqsList" 
            data-parameters="{{$parameters}}"
            field="{{ isset($field) ? base64_encode(json_encode($field)) : null }}" 
        >
        </div>
    </div>
@endif