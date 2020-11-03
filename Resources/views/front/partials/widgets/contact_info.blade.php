@php
    $visible = check_visible($field['settings'],$parameters);
@endphp

@if($visible)
    <div 
        id="{{$field['settings']['htmlId'] or ''}}" 
        class="contact-info {{$field['settings']['htmlClass'] or ''}}">
        <div 
            class="contactInfo" 
            id="contactInfo"
            title="{{ $field['fields'][0]['value'][App::getLocale()] or '' }}"
            phone="{{ $field['fields'][1]['value'][App::getLocale()] or '' }}"
            email="{{ $field['fields'][2]['value'][App::getLocale()] or '' }}"
        >
        </div>
    </div>
</a>
@endif
