@extends('architect::layouts.master')

@section('content')
<div id="elements-models-forms-update" type={{$type or null}} modelId="{{$id or null}}"></div>
@endsection

@push('javascripts')
<script>
var routes = {
    'extranet.elements-models.index' : "{{route('extranet.elements-models.index.type', $type)}}",
    'extranet.elements-models.create' : "{{route('extranet.elements-models.create', $type)}}",
    'extranet.elements-models.update' :"{{route('extranet.elements-models.update',['type' => $type, 'id'=>':id'])}}",
    'extranet.element.import' : "{{route('extranet.element.import',['element_type' => 'form','model_id'=>':model_id'])}}",
    'extranet.elements.get_by_type' : "{{route('extranet.elements.get_by_type',['element_type'=>'form'])}}",
    'extranet.services.update': "{{ route('extranet.services.update', ':id') }}",  
};
</script>
@endpush
