@extends('architect::layouts.master')

@section('content')
<div id="elements-models-forms-index" class="elements-page">
    
</div>
@endsection

@push('javascripts')
<script>
  var routes = {
    'extranet.elements-models.index' : "{{route('extranet.elements-models.index')}}",
    'extranet.elements-models.forms.create' : "{{route('extranet.elements-models.forms.create')}}",
    'extranet.elements-models.forms.update' : "{{route('extranet.elements-models.forms.update',['id'=>':id'])}}",
  };
</script>
@endpush
