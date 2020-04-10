@extends('architect::layouts.master')

@section('content')
@php 
    $tabsRoutes = [
        route('extranet.elements.show', $element),
        $element->templates->count() < 1 
            ? route('extranet.elements.template.create', $element) 
            : route('extranet.elements.template.show', [
                'element' => $element,
                'template' => $element->templates->first() 
            ])
    ];
@endphp 

<div id="elements-template" 
    @if(isset($element))elementId="{{$element->id}}"@endif
    @if(isset($element))
        fields="{{base64_encode(json_encode($element->fields,true))}}"
    @endif
    @if($element->templates->count() > 0)templates="{{ base64_encode(json_encode($element->templates->toArray())) }}"@endif
    @if(isset($template))templateId="{{$template->id}}"@endif
    tabsRoutes="{{base64_encode(json_encode($tabsRoutes))}}"
></div>
@endsection

@push('plugins')
    {{ Html::script('/modules/architect/plugins/dropzone/dropzone.min.js') }}
    {{ Html::style('/modules/architect/plugins/dropzone/dropzone.min.css') }}
    {{ Html::script('/modules/architect/plugins/datatables/datatables.min.js') }}
    {{ Html::style('/modules/architect/plugins/datatables/datatables.min.css') }}
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
    'extranet.elements.template' : "{{ isset($element) ? route('extranet.elements.template.create', $element) : null }}",
    'extranet.elements.show' : "{{  isset($element) ? route('extranet.elements.show', $element) : null }}",
    'extranet.elements.index' : "{{ route('extranet.elements.index') }}",
    'settings' : "{{ route('settings') }}",
    'template' : "{{ isset($element) ? route('extranet.elements.template.show', ['element' => $element, 'template' => ':id']) : null }}",
    'template.create' : "{{ isset($element) ? route('extranet.elements.template.create', $element) : null }}",
};
</script>
@endpush
