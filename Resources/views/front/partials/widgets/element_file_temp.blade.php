@php
  $identifier = str_replace(",","",$field['identifier']);
  $identifier = str_replace("[","",$identifier);
  $identifier = str_replace("]","",$identifier).'_'.$iterator;

  $visible = check_visible($field['settings'],$parameters);

  $elementObject = null;
  if(isset($field['settings']['fileElements'])){
    $elementObject = \Modules\Extranet\Entities\Element::where('id',$field['settings']['fileElements'])->first()->load('fields');
  }

  $model = null;
  if(isset($elementObject) && isset($models[$elementObject->model_identifier])){
    $model = $models[$elementObject->model_identifier];
  }

@endphp


@if($visible)
  <div id="{{$field['settings']['htmlId'] or ''}}" class="element-file-container {{$field['settings']['htmlClass'] or ''}}">
    <div class="{{$field['settings']['collapsable']? 'element-collapsable':'' }} element-file-container-head {{$field['settings']['collapsed']?'collapsed':''}}" @if($field['settings']['collapsable']) data-toggle="collapse" data-target="#collapsefile-{{$identifier}}" aria-expanded="true" aria-controls="collapsefile-{{$identifier}}"@endif>
      {{$field['fields'][0]['value'][App::getLocale()] or ''}}
    </div>
    <div id="collapsefile-{{$identifier}}" class="{{$field['settings']['collapsable']? 'collapse':'' }} {{$field['settings']['collapsed']?'':'in'}} element-file-container-body">
        <div id="elementFileTemp" class="elementFile"></div>
        <div>
          <div class="more-btn">
            @include('extranet::front.partials.fields.'.$field['fields'][1]['type'],
              [
                "field" => $field['fields'][1],
                "settings" => $field['settings'],
                "div" => false,
                "icon" => "far fa-eye",
                "parameters" => $parameters
              ]
            )
          </div>
        </div>
    </div>
  </div>
@endif
