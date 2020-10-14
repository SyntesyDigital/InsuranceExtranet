@extends('architect::layouts.master')

@section('content')
<div id="elements-models-forms-index" type="{{$type}}" class="elements-page"></div>
@endsection

@push('javascripts')
<script>
var routes = {
    'extranet.elements-models.index' : "{{route('extranet.elements-models.index')}}",
    'extranet.elements-models.create' : "{{route('extranet.elements-models.create', ':type')}}",
    'extranet.elements-models.update' : "{{route('extranet.elements-models.update',['type' => ':type', 'id'=>':id'])}}",
};
</script>
@endpush
