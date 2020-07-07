@extends('architect::layouts.master')

@section('content')
<div id="roles-update" 
  roleId="{{$id or null}}"
>
</div>

@endsection

@push('javascripts')
<script>
  var routes = {
    'extranet.roles.index' : "{{route('extranet.roles.index')}}",
    'extranet.roles.create' : "{{route('extranet.roles.create')}}",
    'extranet.roles.update' : "{{route('extranet.roles.update',['id' => ':id'])}}",
    'extranet.roles.duplicate' : "{{route('extranet.roles.duplicate',['id' => ':id'])}}",
  };
</script>
@endpush