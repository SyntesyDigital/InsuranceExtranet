@extends('architect::layouts.master')

@section('content')
<div id="elements-models-forms-update">
    
</div>
@endsection

@push('javascripts')
<script>
  var routes = {
    'extranet.elements-models.forms.index' : "{{route('extranet.elements-models.forms.index')}}",
    'extranet.elements-models.forms.create' : "{{route('extranet.elements-models.forms.create')}}",
  };
</script>
@endpush
