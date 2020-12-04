@php
  $identifier = str_replace(",","",$field['identifier']);
  $identifier = str_replace("[","",$identifier);
  $identifier = str_replace("]","",$identifier).'_'.$iterator;
  $visible = check_visible($field['settings'],$parameters);
@endphp

@if($visible)
    <div id="{{$field['settings']['htmlId'] or ''}}" class="element-form-container {{$field['settings']['htmlClass'] or ''}}">
        <div class="{{$field['settings']['collapsable']? 'element-collapsable':'' }} element-form-container-head {{$field['settings']['collapsed']?'collapsed':''}}" @if($field['settings']['collapsable']) data-toggle="collapse" data-target="#collapseform-{{$identifier}}" aria-expanded="true" aria-controls="collapseform-{{$identifier}}" @endif>
                @include('extranet::front.partials.fields.icon',
                    [
                        "field" => $field['fields'][2],
                        "settings" => $field['settings'],
                        "div" => false,
                    ]
                )
                {{$field['fields'][0]['value'][App::getLocale()] or ''}}
        </div>
        <div id="collapseform-{{$identifier}}" class="{{$field['settings']['collapsable']? 'collapse':'' }}  {{$field['settings']['collapsed']?'':'in'}} element-form-container-body">
            <div id="elementFormTemp" class="element-form"></div>
        </div>
    </div>
@endif