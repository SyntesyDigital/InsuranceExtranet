@php
    $htmlId = uniqid();

    $elementObject = isset($field['settings']['fileElements']) 
        ? \Modules\Extranet\Entities\Element::where('id',$field['settings']['fileElements'])->first()->load('fields')
        : null;

    $model = isset($elementObject) ? $elementObject->getModel($models) : null;

    $view = 'extranet::front.partials.fields.' . $field['fields'][1]['type'];

    $params = [
        "field" => $field['fields'][1],
        "settings" => $field['settings'],
        "div" => false,
        "icon" => "far fa-eye",
        "parameters" => $parameters
    ];

    $collapsable = isset($field['settings']['collapsable']) && $field['settings']['collapsable']? true : false;
    $title = isset($field['fields'][0]['value'][App::getLocale()]) ? $field['fields'][0]['value'][App::getLocale()] : null;
    $url = get_field_url($field['fields'][1],$parameters);

    $icon = $field['fields'][2]['value'];

@endphp

@if(check_visible($field['settings'], $parameters))

    <div
        id="{{$field['settings']['htmlId'] or ''}}" 
        class="element-file-container {{$field['settings']['htmlClass'] or ''}} {{ $field['settings']['collapsable'] ? '' : 'static' }}"
    >

        <div 
            class="{{ $field['settings']['collapsable'] ? 'element-collapsable' : '' }} element-file-container-head {{ $field['settings']['collapsed'] ? 'collapsed' : '' }}" 
            @if($field['settings']['collapsable']) 
                data-toggle="collapse" 
                data-target="#collapsefile-{{$htmlId}}" 
                aria-expanded="true" 
                aria-controls="collapsefile-{{$htmlId}}"
            @endif
            style="display: {{$collapsable || isset($title) ? 'block' : 'none' }}"
        >
            @if(isset($icon))
                <i class="{{$icon}}"></i>
            @endif
            {{$title}}
        </div>

        <div 
            id="collapsefile-{{$htmlId}}" 
            class="{{$field['settings']['collapsable']? 'collapse':'' }} {{$field['settings']['collapsed']?'':'in'}} element-file-container-body"
        >

            <div 
                id="elementFile" 
                class="elementFile"
                field="{{ isset($field) ? base64_encode(json_encode($field)) : null }}"
                doubleColumn="{{ $field['settings']['doubleColumn'] ? $field['settings']['doubleColumn'] : false }}"
                elementObject="{{ base64_encode(json_encode($elementObject)) }}"
                model="{{ base64_encode(json_encode($model)) }}"
                parameters="{{ $parameters }}"
            >
            </div>
            
            
            <div>
                <div class="more-btn">
                @include($view, $params)
                </div>
            </div>
            
            
        </div>
    </div>

@endif
