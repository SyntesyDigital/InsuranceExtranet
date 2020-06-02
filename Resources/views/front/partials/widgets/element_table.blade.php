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

  $icon = $field['fields'][3]['value'];
  
@endphp

<div id="{{$field['settings']['htmlId'] or ''}}" class="element-table-container {{$field['settings']['htmlClass'] or ''}}">

  <div class="title">
    <h4>
      @if(isset($icon))
        <i class="{{$icon}}"></i>
      @endif
      {{$field['fields'][0]['value'][App::getLocale()] or ''}}
    </h4>
    <div class="title-btns">
      <div class="add-btn">
        @include('extranet::front.partials.fields.'.$field['fields'][1]['type'],
          [
            "field" => $field['fields'][1],
            "settings" => $field['settings'],
            "div" => false,
            "icon" => "fas fa-plus-circle"
          ]
        )
      </div>
    </div>
  </div>

  <div class="element-table-container-body">
      <div id="elementTable" class="elementTable elementTableNoHeader"
        field="{{ isset($field) ? base64_encode(json_encode($field)) : null }}"
        pagination="{{$field['settings']['pagination'] != null ? true : false }}"
        itemsPerPage="{{$field['settings']['pagination']}}"
        elementObject="{{base64_encode(json_encode($elementObject))}}"
        model="{{base64_encode(json_encode($model))}}"
        parameters="{{$parameters}}"
        exportBtn="{{isset($field['settings']['excel']) && $field['settings']['excel']?true:false}}"
        downloadUrl="{{isset($field['settings']['excel']) && $field['settings']['excel']?route('table.export.download',['filename' => ':filename']):''}}"
      >
      </div>
  </div>
</div>
