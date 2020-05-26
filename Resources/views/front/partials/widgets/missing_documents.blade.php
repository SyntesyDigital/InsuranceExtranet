@component('extranet::front.partials.components.table_container',[
    "field" => $field,
    "class" => "table-document-container missing-documents-container",
    "reactContainerClass" => "table-document-container-body",
    "reactId" => "missing-documents",
    "reactClass" => "missing-documents",
    "iterator" => $iterator,
    "parameters" => $parameters,
    "models" => $models
  ])

  @slot('title')
    {{$field['fields'][0]['value'][App::getLocale()] or ''}}
  @endslot

  @slot('options')
    itemsPerPage="{{$field['settings']['itemsPerPage']}}"
    columns="{{$field['settings']['bootstrapColumns']}}"
  @endslot

@endcomponent
