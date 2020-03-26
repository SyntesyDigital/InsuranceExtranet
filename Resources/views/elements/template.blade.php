@extends('architect::layouts.master')

@section('content')
<div id="elements-template"></div>
@endsection

@push('plugins')
    {{ Html::script('/modules/architect/plugins/dropzone/dropzone.min.js') }}
    {{ HTML::style('/modules/architect/plugins/dropzone/dropzone.min.css') }}
    {{ Html::script('/modules/architect/plugins/datatables/datatables.min.js') }}
    {{ HTML::style('/modules/architect/plugins/datatables/datatables.min.css') }}
    {{ Html::script('/modules/architect/js/libs/datatabletools.js') }}
    {{ Html::script('/modules/architect/js/architect.js') }}
@endpush

@push('javascripts')
<script>
var routes = {
    //page builder
    'contents' : "{{route('contents')}}",
    'medias.data' : "{{route('medias.data')}}",
    'medias.index' : '{{ route('medias.index') }}',
    'medias.store' : '{{ route('medias.store') }}',
    'medias.show' : '{{ route('medias.show') }}',
    'medias.delete' : '{{ route('medias.delete') }}',
    'medias.update' : '{{ route('medias.update') }}',
    'contents.data' : '{{ route('contents.modal.data') }}',
    //template
    'extranet.elements.template' : "{{route('extranet.elements.template', $element)}}",
    'extranet.elements.show' : "{{route('extranet.elements.show', $element)}}",
    'extranet.elements.index' : "{{route('extranet.elements.index')}}",
    'settings' : "{{route('settings')}}",
};
</script>
@endpush
