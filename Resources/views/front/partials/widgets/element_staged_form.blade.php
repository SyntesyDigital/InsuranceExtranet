@php
  $identifier = str_replace(",","",$field['identifier']);
  $identifier = str_replace("[","",$identifier);
  $identifier = str_replace("]","",$identifier).'_'.$iterator;

  $visible = check_visible($field['settings'],$parameters);
@endphp

@if($visible)
  <div id="{{$field['settings']['htmlId'] or ''}}" class="element-form-container {{$field['settings']['htmlClass'] or ''}}">
    
    <div id="collapseform-{{$identifier}}" class="element-form-container-body">

        <div id="element-staged-form" class="element-form"
          field="{{ isset($field) ? base64_encode(json_encode($field)) : null }}"
          collapsable="false"
          elementObject="{{$field['settings']['formElementsV2']?base64_encode(json_encode(\Modules\Extranet\Entities\Element::where('id',$field['settings']['formElementsV2'])->first()->load('fields'))):null}}"
          parameters="{{$parameters}}"
        >

        </div>
    </div>

  </div>
@endif
