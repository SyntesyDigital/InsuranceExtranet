@php
$identifier = str_replace(",","",$field['identifier']);
$identifier = str_replace("[","",$identifier);
$identifier = str_replace("]","",$identifier).'_'.$iterator;

$visible = check_visible($field['settings'],$parameters);
@endphp

@if($visible)
<div id="{{$field['settings']['htmlId'] or ''}}" class="missing-documents-container {{$field['settings']['htmlClass'] or ''}}">

<div id="missing-documents" class="missing-documents"></div>

</div>
@endif
