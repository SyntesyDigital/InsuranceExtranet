@php
  $identifier = str_replace(",","",$field['identifier']);
  $identifier = str_replace("[","",$identifier);
  $identifier = str_replace("]","",$identifier).'_'.$iterator;

  $visible = check_visible($field['settings'],$parameters);

  $elementObject = null;
  if(isset($field['settings']['tableElements'])){
    $elementObject = \Modules\Extranet\Entities\Element::where('id',$field['settings']['tableElements'])->first()->load('fields');
  }

  $model = isset($elementObject) ? $elementObject->getModel($models) : null;
  
@endphp

@if($visible)

<!--  customClass , title -->

<div id="{{$field['settings']['htmlId'] or ''}}" class="element-table-container {{$class}} {{$field['settings']['htmlClass'] or ''}}">

    <div class="{{$field['settings']['collapsable']? 'element-collapsable':'' }} element-table-container-head {{$field['settings']['collapsed']?'collapsed':''}}" @if($field['settings']['collapsable']) data-toggle="collapse" data-target="#collapsetable-{{$identifier}}" aria-expanded="true" aria-controls="collapsetable-{{$identifier}}"@endif>
      <i class="{{$icon}}"></i>
      {{$title}}
    </div>

    <div id="collapsetable-{{$identifier}}" class=" {{$field['settings']['collapsable']? 'collapse':'' }} {{$field['settings']['collapsed']?'':'in'}} element-table-container-body">      
        
        <div class="{{$reactContainerClass}}">
            <div id="{{$reactId}}" class="{{$reactClass}}"
                field="{{ isset($field) ? base64_encode(json_encode($field)) : null }}"
                model="{{base64_encode(json_encode($model))}}"
                elementObject="{{base64_encode(json_encode($elementObject))}}"
                parameters="{{$parameters}}"
                {{$options}}
            >
            </div>
        </div>
        
    </div>
</div>
@endif

