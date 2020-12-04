@php

    $identifier = str_replace(",","",$field['identifier']);
    $identifier = str_replace("[","",$identifier);
    $identifier = str_replace("]","",$identifier).'_'.$iterator;

    $htmlId = uniqid();

    $element = isset($field['settings']['fileElements']) 
        ? \Modules\Extranet\Entities\Element::find($field['settings']['fileElements'])
        : null;
    
    $element = isset($element) ? $element->load('fields') : null;

    $model = isset($element) ? $element->getModel($models) : null;
    
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

@endphp

@if ( isset($field['settings']['backgroundTransparent']) && $field['settings']['backgroundTransparent'])
    <style>
        body .identifier-{{$identifier}} .element-file-container .element-file-container-head, 
        body .identifier-{{$identifier}} .element-file-container, 
        body .identifier-{{$identifier}} .element-file-container .element-file-container-body *,  
        body .identifier-{{$identifier}} .element-file-container .element-file-container-body{
            background: transparent !important;
        }
    </style>
@endif

@if(check_visible($field['settings'], $parameters))
    <div 
        class="identifier-{{$identifier}}"
    >
        <div
            id="{{$field['settings']['htmlId'] or ''}}" 
            class="element-file-container {{$field['settings']['htmlClass'] or ''}} {{ $field['settings']['collapsable'] ? '' : 'static' }}"
        >

            <div 
                class="{{ $field['settings']['collapsable'] ? 'element-collapsable' :'' }} element-file-container-head {{ $field['settings']['collapsed'] ? 'collapsed' : '' }}" 
                @if($field['settings']['collapsable']) 
                    data-toggle="collapse" 
                    data-target="#collapsefile-{{$htmlId}}" 
                    aria-expanded="true" 
                    aria-controls="collapsefile-{{$htmlId}}"
                @endif
                style="display: {{$collapsable || isset($title) ? 'block' : 'none' }}"
            >
            @include('extranet::front.partials.fields.icon',
                [
                "field" => $field['fields'][2],
                "settings" => $field['settings'],
                "div" => false,
                ]
            )
            {{$title}}
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
                @if (isset($field['fields'][1]['value']['content']) || isset($field['fields'][1]['value']['url'][App::getLocale()]))
                    <div>
                        <div class="more-btn">
                            @include($view, $params)
                        </div>
                    </div>
                @endif
            </div>
        </div>
    </div>
@endif
