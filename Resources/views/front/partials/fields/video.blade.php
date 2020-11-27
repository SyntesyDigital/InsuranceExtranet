@php
  $link = isset($field['value']['url'][App::getLocale()]) ? $field['value']['url'][App::getLocale()] : '';
  $youtube_id = explode('/',$link);
  $youtube_id = $youtube_id[sizeof($youtube_id)-1];
  $visible = check_visible($field['settings'],$parameters);

@endphp

@if ($visible)
  <div 
      id="{{$field['settings']['htmlId'] or ''}}" 
      class="{{$field['settings']['htmlClass'] or ''}}"
  >
      <iframe  src="https://www.youtube.com/embed/{{$youtube_id}}?rel=0" frameborder="0" allowfullscreen width="100%" height="{{$field['settings']['height'] or '315'}}"></iframe>
  </div>
@endif
