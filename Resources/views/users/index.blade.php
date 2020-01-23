@extends('architect::layouts.master')

@section('content')
@abilities(['users.edit', 'users.create'])
ok ?
@endabilities

<div id="users-index">
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
    'extranet.users.datatable' : "{{route('extranet.users.datatable')}}"
  };
</script>
@endpush
