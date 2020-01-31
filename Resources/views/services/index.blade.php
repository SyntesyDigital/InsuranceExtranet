@extends('architect::layouts.master')

@section('content')
<div id="services-index">
</div>
@endsection

@push('plugins')
    {{ Html::script('/modules/architect/plugins/datatables/datatables.min.js') }}
    {{ HTML::style('/modules/architect/plugins/datatables/datatables.min.css') }}
    {{ Html::script('/modules/architect/plugins/bootbox/bootbox.min.js') }}
    {{ Html::script('/modules/architect/js/libs/datatabletools.js') }}
    {{ Html::script('/modules/architect/js/architect.js') }}
@endpush

@push('javascripts')
<script>
  var routes = {
    'extranet.services.datatable' : "{{route('extranet.services.datatable')}}",
    'extranet.services.create' : "{{route('extranet.services.create')}}"
  };
</script>
@endpush
