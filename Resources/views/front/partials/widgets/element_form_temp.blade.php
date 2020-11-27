@php
  $identifier = str_replace(",","",$field['identifier']);
  $identifier = str_replace("[","",$identifier);
  $identifier = str_replace("]","",$identifier).'_'.$iterator;

  $visible = check_visible($field['settings'],$parameters);
  $icon = $field['fields'][2]['value'];

  $fontAwesome = get_config('FONTAWESOME_IS_ACTIVE');
  $creatic = get_config('CREATIC_LIB_IS_ACTIVE');

@endphp

@if($visible)
<div id="{{$field['settings']['htmlId'] or ''}}" class="element-form-container {{$field['settings']['htmlClass'] or ''}}">
  <div class="{{$field['settings']['collapsable']? 'element-collapsable':'' }} element-form-container-head {{$field['settings']['collapsed']?'collapsed':''}}" @if($field['settings']['collapsable']) data-toggle="collapse" data-target="#collapseform-{{$identifier}}" aria-expanded="true" aria-controls="collapseform-{{$identifier}}" @endif>
      @if(isset($icon))
        @if(isset($fontAwesome) && $fontAwesome == true)
        <i class="{{$icon}}"></i>
        @elseif(isset($creatic) && $creatic == true)
            <svg class="icon {{$icon}}">
                <use xlink:href="#{{$icon}}"></use>
            </svg> 
        @endif
      @endif
    {{$field['fields'][0]['value'][App::getLocale()] or ''}}
  </div>
  <div id="collapseform-{{$identifier}}" class="{{$field['settings']['collapsable']? 'collapse':'' }}  {{$field['settings']['collapsed']?'':'in'}} element-form-container-body">
    <div id="elementFormTemp" class="element-form"></div>
  </div>

</div>
@endif