@php
$visible = check_visible($field['settings'],$parameters);
@endphp

@if($visible)

  <div id="element-form-button" class="element-form-button"
    field="{{ isset($field) ? base64_encode(json_encode($field)) : null }}"
    elementObject="{{$field['settings']['formElementsV2']?base64_encode(json_encode(\Modules\Extranet\Entities\Element::where('id',$field['settings']['formElementsV2'])->first()->load('fields'))):null}}"
    parameters="{{$parameters}}"
  ></div>
    

@endif
    