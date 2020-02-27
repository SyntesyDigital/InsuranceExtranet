@extends('architect::layouts.master')

@section('content')
<div id="elements-template">
</div>
@endsection

@push('javascripts')
<script>
  var routes = {
    'extranet.elements.template' : "{{route('extranet.elements.template', ['element' => ':element'])}}",
    'extranet.elements.index' : "{{route('extranet.elements.index')}}",
    'settings' : "{{route('settings')}}"
  };
</script>
@endpush
