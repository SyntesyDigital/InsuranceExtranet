@php
  $crop = "original";

  $settings = isset($settings) ? $settings : $field['settings'];
  $settings = json_decode(json_encode($settings), true);

  if(isset($settings) && isset($settings['cropsAllowed']) && $settings['cropsAllowed'] != null){
    $crop = $settings['cropsAllowed'];
  }
  $url = isset($field['values']) && isset($field['values']['urls'][$crop]) ? asset($field['values']['urls'][$crop]) : null;
  $metadata = isset($field['values']) && isset($field['values']['metadata']) ? $field['values']['metadata'] : null;

@endphp
@if(!isset($div))
<div>
@endif

@if(isset($url))
  <img
    id="{{$settings['htmlId'] or ''}}"
    class="{{$settings['htmlClass'] or ''}}"
    src="{{ $url }}"
    alt="{{$metadata['fields']['alt'][App::getLocale()]['value'] or ''}}"
    title="{{$metadata['fields']['title'][App::getLocale()]['value'] or ''}}"
    width="{{$width or ''}}"
    height="{{$height or ''}}"
  />
@endif

@if(!isset($div))
</div>
@endif
