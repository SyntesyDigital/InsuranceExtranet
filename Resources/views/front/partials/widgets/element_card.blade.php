@php
    $htmlId = uniqid();

    $element = isset($field['settings']['fileElements']) 
        ? \Modules\Extranet\Entities\Element::find($field['settings']['fileElements'])->load('fields')
        : null;

    $model = (isset($element)) && isset($models[$element->model_identifier])
        ? $models[$element->model_identifier]
        : null;

    $view = 'extranet::front.partials.fields.' . $field['fields'][1]['type'];

    $params = [
        "field" => $field['fields'][1],
        "settings" => $field['settings'],
        "div" => false,
        "icon" => "far fa-eye",
        "parameters" => $parameters
    ];
@endphp

@if(check_visible($field['settings'], $parameters))

    <div
        id="{{$field['settings']['htmlId'] or ''}}" 
        class="element-file-container {{$field['settings']['htmlClass'] or ''}}"
    >

        <div 
            class="{{ $field['settings']['collapsable'] ? 'element-collapsable' :'' }} element-file-container-head {{ $field['settings']['collapsed'] ? 'collapsed' : '' }}" 
            @if($field['settings']['collapsable']) 
                data-toggle="collapse" 
                data-target="#collapsefile-{{$htmlId}}" 
                aria-expanded="true" 
                aria-controls="collapsefile-{{$htmlId}}"
            @endif
        >
            {{$field['fields'][0]['value'][App::getLocale()] or ''}}
        </div>

        <div 
            id="collapsefile-{{$htmlId}}" 
            class="{{$field['settings']['collapsable']? 'collapse':'' }} {{$field['settings']['collapsed']?'':'in'}} element-file-container-body"
        >

            <div 
                id="element-card" 
                class="elementFile"
                field="{{ isset($field) ? base64_encode(json_encode($field)) : null }}"
                element="{{ base64_encode(json_encode($element)) }}"
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
