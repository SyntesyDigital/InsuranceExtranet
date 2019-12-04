@php
  $identifier = str_replace(",","",$field['identifier']);
  $identifier = str_replace("[","",$identifier);
  $identifier = str_replace("]","",$identifier).'_'.$iterator;

  $visible = check_visible($field['settings'],$parameters);

  $elementObject = null;
  if(isset($field['settings']['tableElements'])){
    $elementObject = \Modules\Extranet\Entities\Element::where('id',$field['settings']['tableElements'])->first()->load('fields');
  }

  $model = null;
  if(isset($elementObject) && isset($models[$elementObject->model_identifier])){
    $model = $models[$elementObject->model_identifier];
  }
@endphp

<div id="{{$field['settings']['htmlId'] or ''}}" class="table-document-container {{$field['settings']['htmlClass'] or ''}}">

  <div class="title">
    <h4>{{$field['fields'][0]['value'][App::getLocale()] or ''}}</h4>
  </div>

  <div class="table-document-container-body">
      <div id="tableDocument" class="tableDocument tableDocumentNoHeader"
        field="{{ isset($field) ? base64_encode(json_encode($field)) : null }}"
        pagination="{{$field['settings']['pagination'] != null ? true : false }}"
        itemsPerPage="{{$field['settings']['pagination']}}"
        columns="{{$field['settings']['bootstrapColumns']}}"
        elementObject="{{base64_encode(json_encode($elementObject))}}"
        model="{{base64_encode(json_encode($model))}}"
        parameters="{{$parameters}}"
      >
      </div>
  </div>
</div>
