@extends('architect::layouts.master')

@section('content')
<div id="template-1">
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
    'extranet.template.datatable' : "{{route('extranet.template.datatable')}}"
  };
</script>
@endpush
