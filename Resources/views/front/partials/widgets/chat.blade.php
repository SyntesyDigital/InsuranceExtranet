@component('extranet::front.partials.components.table_container',[
    "field" => $field,
    "class" => "table-chat-container",
    "reactContainerClass" => "table-chat-container-body",
    "reactId" => "chat-list",
    "reactClass" => "tableChat tableChatNoHeader",
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
  @endslot
@endcomponent


