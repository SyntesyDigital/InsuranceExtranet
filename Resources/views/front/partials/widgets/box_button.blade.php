@php
$visible = check_visible($field['settings'],$parameters);
@endphp

@if($visible)
@php
$link = "";
$target = "";
$title = $field['fields'][1]['value'][App::getLocale()];
$icon = $field['fields'][2]['value'][App::getLocale()];
if(isset($field['fields'][0]['value']['content'])){
//is internal
$content = $field['fields'][0]['value']['content'];
$link = $content->url;
}
else {
//is external
$target = "_blank";
$link = isset($field['fields'][0]['value']['url'][App::getLocale()]) ? $field['fields'][0]['value']['url'][App::getLocale()] : '';
}

@endphp



@if(isset($link) && $link != "")
<a target="{{$target}}" href="{{$link}}?{{$parameters}}" class="box-button-container-a">
  @endif

  <div id="{{$field['settings']['htmlId'] or ''}}" class="box-button-root box-button-container {{$field['settings']['htmlClass'] or ''}} {{$field['settings']['buttonClass'] or ''}}">
    <div class="wrap-box-button">
      <div class="image-container">
        @if(isset($icon))
        <div class="wrap-icon"><i class="{{$icon}}"></i></div>
        @else
        <div class="wrap-image">
          @include('extranet::front.partials.fields.image',
          [
          "field" => $field['fields'][3],
          "settings" => $field['settings'],
          ]
          )
        </div>
        @endif
      </div>
      <div class="label-container">
        <div>
          <p>{{$title}}</p>
        </div>
      </div>
    </div>

  </div>



  @if(isset($link) && $link != "")
</a>
@endif
@endif