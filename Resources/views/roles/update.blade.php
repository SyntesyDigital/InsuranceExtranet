@extends('architect::layouts.master')

@section('content')
<div id="roles-update">
</div>

@endsection

@push('javascripts')
<script>
  var routes = {
    'extranet.roles.index' : "{{route('extranet.roles.index')}}",
    'extranet.roles.create' : "{{route('extranet.roles.create')}}",
    'extranet.roles.duplicate' : "{{route('extranet.roles.duplicate',['id' => 1])}}",
    'extranet.roles.delete' : "{{route('extranet.roles.delete',['id' => 1])}}",
  };
</script>
@endpush