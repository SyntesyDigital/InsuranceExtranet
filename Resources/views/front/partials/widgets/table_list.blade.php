@component('extranet::front.partials.components.table_container',[
    "field" => $field,
    "class" => "table-document-container",
    "reactContainerClass" => "table-document-container-body",
    "reactId" => "table-list",
    "reactClass" => "tableDocument tableDocumentNoHeader",
    "iterator" => $iterator,
    "parameters" => $parameters,
    "models" => $models
  ])

  @slot('title')
    {{$field['fields'][0]['value'][App::getLocale()] or ''}}
  @endslot
  
  @slot('icon')
    {{$field['fields'][1]['value'] or ''}}
  @endslot

  @slot('options')
    itemsPerPage="{{$field['settings']['itemsPerPage']}}"
    columns="{{$field['settings']['bootstrapColumns']}}"
    autoHeight="{{isset($field['settings']['autoHeight'])?$field['settings']['autoHeight']:false}}"
  @endslot

@endcomponent