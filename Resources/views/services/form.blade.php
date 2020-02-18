@extends('architect::layouts.master')

@section('content')
<div 
    id="services-form" 
    @if(isset($service))serviceId="{{$service->id}}"@endif
></div>
@endsection

@push('javascripts')
<script>
  var routes = {
    'extranet.services.index' : "{{route('extranet.services.index')}}",
    'extranet.services.create' : "{{route('extranet.services.create')}}",
    'extranet.services.delete' : "{{route('extranet.services.delete',['id' => 1])}}",
  };
</script>
@endpush
