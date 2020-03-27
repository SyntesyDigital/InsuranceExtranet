@extends('architect::layouts.master')

@section('content')
<div id="elements-template" @if(isset($element))elementId="{{$element->id}}"@endif></div>
@endsection

@push('javascripts')
<script>
var routes = {
    'extranet.elements.template' : "{{ isset($element) ? route('extranet.elements.template', $element) : null }}",
    'extranet.elements.show' : "{{  isset($element) ? route('extranet.elements.show', $element) : null }}",
    'extranet.elements.index' : "{{ route('extranet.elements.index') }}",
    'settings' : "{{ route('settings') }}",
};
</script>
@endpush
