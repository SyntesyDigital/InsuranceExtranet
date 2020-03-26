@extends('architect::layouts.master')

@section('content')
<div id="elements-models-index"></div>
@endsection

@push('javascripts')
<script>
var routes = {
    'extranet.elements-models.forms.index' : "{{route('extranet.elements-models.forms.index')}}",
    'settings' : "{{route('settings')}}"
};
</script>
@endpush
