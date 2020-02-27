@extends('architect::layouts.master')

@section('content')
<div id="elements-models-forms-update"
  modelId="{{$id or null}}"
>  
</div>
@endsection

@push('javascripts')
<script>
  var routes = {
    'extranet.elements-models.forms.index' : "{{route('extranet.elements-models.forms.index')}}",
    'extranet.elements-models.forms.create' : "{{route('extranet.elements-models.forms.create')}}",
    'extranet.element.import' : "{{route('extranet.element.import',['element_type' => 'form','model_id'=>':model_id'])}}",
    'extranet.elements.get_by_type' : "{{route('extranet.elements.get_by_type',['element_type'=>'form'])}}",
    'extranet.elements-models.forms.update' :"{{route('extranet.elements-models.forms.update',['id'=>':id'])}}"
  };
</script>
@endpush
