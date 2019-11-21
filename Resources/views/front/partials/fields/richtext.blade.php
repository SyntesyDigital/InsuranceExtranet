@if(!isset($div))
<div id="{{$field['settings']['htmlId'] or ''}}" class="{{$field['settings']['htmlClass'] or ''}}">
@endif
  {!!$field['value'][App::getLocale()] or ''!!}
@if(!isset($div))
</div>
@endif
