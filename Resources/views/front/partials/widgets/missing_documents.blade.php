@php
$identifier = str_replace(",","",$field['identifier']);
$identifier = str_replace("[","",$identifier);
$identifier = str_replace("]","",$identifier).'_'.$iterator;

$visible = check_visible($field['settings'],$parameters);

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

@if($visible)

<div id="{{$field['settings']['htmlId'] or ''}}" class="element-table-container table-document-container missing-documents-container {{$field['settings']['htmlClass'] or ''}}">

    <div class="{{$field['settings']['collapsable']? 'element-collapsable':'' }} element-table-container-head {{$field['settings']['collapsed']?'collapsed':''}}" @if($field['settings']['collapsable']) data-toggle="collapse" data-target="#collapsetable-{{$identifier}}" aria-expanded="true" aria-controls="collapsetable-{{$identifier}}"@endif>
      {{$field['fields'][0]['value'][App::getLocale()] or ''}}
    </div>

    <div id="collapsetable-{{$identifier}}" class=" {{$field['settings']['collapsable']? 'collapse':'' }} {{$field['settings']['collapsed']?'':'in'}} element-table-container-body">

      <div class="table-document-container-body">
          <div id="missing-documents" class="missing-documents"
            field="{{ isset($field) ? base64_encode(json_encode($field)) : null }}"
            itemsPerPage="{{$field['settings']['itemsPerPage']}}"
            columns="{{$field['settings']['bootstrapColumns']}}"
            elementObject="{{base64_encode(json_encode($elementObject))}}"
            model="{{base64_encode(json_encode($model))}}"
            parameters="{{$parameters}}"
          >
          </div>
      </div>
    </div>
</div>


@endif
