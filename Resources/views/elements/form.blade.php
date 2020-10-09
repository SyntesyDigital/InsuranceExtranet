@extends('architect::layouts.master')

@section('content')

    @php 
        $tabsRoutes = [];
        if(isset($element)){
            $tabsRoutes = [
                route('extranet.elements.show', $element),
                $element->templates->count() < 1 
                    ? route('extranet.elements.template.create', $element) 
                    : route('extranet.elements.template.show', [
                        'element' => $element,
                        'template' => $element->templates->first() 
                    ])
            ];
        }

    @endphp 

    <div id="element-form"
        fields="{{base64_encode(json_encode($fields,true))}}"
        model="{{base64_encode(json_encode($model,true))}}"
        wsModelIdentifier="{{$model->ID}}"
        wsModel="{{$model->WS or ''}}"
        wsModelFormat="{{$model->WS_FORMAT or ''}}"
        wsModelExemple="{{$model->EXEMPLE or ''}}"
        parametersList="{{base64_encode(json_encode($parametersList,true))}}"
        @if((isset($parameters)) && $parameters)
            parameters="{{base64_encode(json_encode($parameters,true))}}"
        @endif
        elementType="{{$element_type}}"
        @if((isset($element)) && $element)
            element="{{base64_encode($element->toJson())}}"
        @endif
        procedures="{{base64_encode(json_encode($procedures,true))}}"
        variables="{{base64_encode(json_encode($variables,true))}}"
        tabsRoutes="{{base64_encode(json_encode($tabsRoutes))}}"
    ></div>
@stop

@push('plugins')
    {{ Html::script('/modules/architect/plugins/datatables/datatables.min.js') }}
    {{ HTML::style('/modules/architect/plugins/datatables/datatables.min.css') }}
    {{ Html::script('/modules/architect/js/libs/datatabletools.js') }}
    {{ Html::script('/modules/architect/plugins/bootbox/bootbox.min.js') }}
    {{ Html::script('/modules/architect/js/architect.js') }}
@endpush


@push('javascripts-libs')
<script>
@if((isset($element)) && $element)
    var routes = {
        'elements' : "{{route('extranet.elements.typeIndex',$element_type)}}",
        'showElement' : "{{route('extranet.elements.show', $element)}}",
        'contents.data' : "{{ route('contents.modal.data') }}",
        'extranet.elements.datatable' : "{{ route('extranet.elements.datatable') }}",
        'extranet.content.parameters' : "{{route('extranet.content.parameters', ['content' => ':content'])}}",
        'extranet.element.parameters' : "{{route('extranet.element.parameters', ['element' => ':element'])}}",
        'extranet.elements.template' : "{{ route('extranet.elements.template.create', $element) }}",
        'extranet.elements.index' : "{{route('extranet.elements.index')}}",
        'extranet.elements.show' : "{{  isset($element) ? route('extranet.elements.show', $element) : null }}",
        'extranet.elements-models.forms.update' :"{{route('extranet.elements-models.update',['type' => $element_type, 'id'=>$model->ID])}}",
    };
@else 
    var routes = {
        'elements' : "{{route('extranet.elements.typeIndex',$element_type)}}",
        'showElement' : "{{route('extranet.elements.show', ['element' => ':element'])}}",
        'contents.data' : "{{ route('contents.modal.data') }}",
        'extranet.elements.datatable' : "{{ route('extranet.elements.datatable') }}",
        'extranet.content.parameters' : "{{route('extranet.content.parameters', ['content' => ':content'])}}",
        'extranet.element.parameters' : "{{route('extranet.element.parameters', ['element' => ':element'])}}",
        'extranet.elements.index' : "{{route('extranet.elements.index')}}",
        'extranet.elements-models.forms.update' :"{{route('extranet.elements-models.update',['type' => 'form-v2', 'id'=>$model->ID])}}",
    };
@endif
</script>
@endpush
