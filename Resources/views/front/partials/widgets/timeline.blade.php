@component('extranet::front.partials.components.table_container',[
    "field" => $field,
    "class" => "timeline-container",
    "reactContainerClass" => "timeline-body",
    "reactId" => "timeline",
    "reactClass" => "timeLineClass timelineNoHeader",
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
  @endslot
@endcomponent


