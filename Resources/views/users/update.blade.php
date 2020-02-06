@extends('architect::layouts.master')

@section('content')
<div id="user-update"
  userId="{{$id or null}}"
></div>
@endsection

@push('javascripts')
<script>
  var routes = {
    'extranet.users.index' : "{{route('extranet.users.index')}}"
  };
</script>
@endpush
