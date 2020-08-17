@php

  $identifier = str_replace(",","",$field['identifier']);
  $identifier = str_replace("[","",$identifier);
  $identifier = str_replace("]","",$identifier).'_'.$iterator;
  $link = "";
  $target = "";

  $elementObject = null;
  if(isset($field['settings']['fileElements'])){
    $elementObject = \Modules\Extranet\Entities\Element::where('id',$field['settings']['fileElements'])->first()->load('fields');
  }
  
  $model = null;
  if(isset($elementObject) && isset($models[$elementObject->model_identifier])){
    $model = $models[$elementObject->model_identifier];
  }

  $visible = check_visible($field['settings'],$parameters);
@endphp

@if($visible)
    <div id="{{$field['settings']['htmlId'] or ''}}" class="message-box-container identifier-{{$identifier}} {{$field['settings']['htmlClass'] or ''}}">
        <div id="messageBox" class="messageBox"
            elementObject="{{base64_encode(json_encode($elementObject))}}"
            model="{{base64_encode(json_encode($model))}}"
            parameters="{{$parameters}}"
        >
        </div>
    </div>
@endif
