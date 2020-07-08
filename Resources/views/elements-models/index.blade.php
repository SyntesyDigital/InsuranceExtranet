@extends('architect::layouts.master')

@section('content')
<div id="elements-models-index"></div>
@endsection

@push('javascripts')
<script>
var routes = {
    'extranet.elements-models.index' : "{{route('extranet.elements-models.index.type', ':type')}}",
    'settings' : "{{route('settings')}}"
};
</script>
@endpush
