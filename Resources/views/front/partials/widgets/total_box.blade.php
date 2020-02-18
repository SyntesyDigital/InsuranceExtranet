@php
  $link = "";
  $target = "";
  $title = $field['fields'][0]['value'][App::getLocale()];
  $icon = $field['fields'][1]['value'][App::getLocale()];
  if(isset($field['fields'][2]['value']['content'])){
    //is internal
    $content = $field['fields'][2]['value']['content'];
    $link = $content->url;
  }
  else {
    //is external
    $target = "_blank";
    $link = isset($field['fields'][2]['value']['url'][App::getLocale()]) ? $field['fields'][2]['value']['url'][App::getLocale()] : '';
  }

  $elementObject = null;
  if(isset($field['settings']['tableElements'])){
    $elementObject = \Modules\Extranet\Entities\Element::where('id',$field['settings']['tableElements'])->first()->load('fields');
  }

  $model = null;
  if(isset($elementObject) && isset($models[$elementObject->model_identifier])){
    $model = $models[$elementObject->model_identifier];
  }

  $visible = check_visible($field['settings'],$parameters);

@endphp


@if($visible)

  @if(isset($link) && $link != "")
    <a target="{{$target}}" href="{{$link}}" class="total-box-container-a" >
  @endif

    <div id="{{$field['settings']['htmlId'] or ''}}" class="total-box-container {{$field['settings']['htmlClass'] or ''}}">
      <div class="col-md-8 col-sm-8 col-xs-8 container-parameters">
        <div id="totalBox" class="totalBox"
          elementObject="{{base64_encode(json_encode($elementObject))}}"
          model="{{base64_encode(json_encode($model))}}"
          parameters="{{$parameters}}"
        >
        </div>
        <div class="title">{{$title}}</div>
      </div>
      <div class="col-md-4 col-sm-4 col-xs-4 container-icon">
          <i class="{{$icon}}"></i>
      </div>
      
      <div class="total-box-container-body">
          
      </div>
    </div>

  @if(isset($link) && $link != "")
    </a>
  @endif

@endif
