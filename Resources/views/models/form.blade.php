@extends('architect::layouts.master')

@section('content')
  <div id="model-form"
    @if((isset($model)) && $model) model={{base64_encode(json_encode($model))}}@endif
  ></div>
@stop

@push('plugins')
    {{ Html::script('/modules/architect/plugins/bootbox/bootbox.min.js') }}
    {{ Html::script('/modules/architect/js/architect.js') }}
@endpush

@push('javascripts-libs')
<script>
var routes = {
  'models' : "{{route('extranet.models.index')}}",
  'showModel' : "{{route('extranet.models.show',['id' => ':id'])}}"
};
</script>

@endpush
