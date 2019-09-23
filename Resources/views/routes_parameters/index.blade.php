@extends('architect::layouts.master')


@section('content')
  <div class="body">
    <div class="row">
        <div class="col-md-offset-1 col-md-10">
            <div class="card">
			          <div class="card-body">

                    <h3 class="card-title">Parametres
                        <a href="{{route('extranet.routes_parameters.create')}}" class="pull-right btn btn-primary">
                            Ajouter Parametres
                        </a>
                    </h3>

                    <table class="table" id="table-routes-parameters" style="width:100%">
                        <thead>
                           <tr>
                               <th>Identifiant</th>
                               <th>Nom</th>
                               <th></th>
                           </tr>
                        </thead>
                        <tfoot>
                           <tr>
                               <th></th>
                               <th></th>
                               <th></th>
                           </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
@push('javascripts-libs')
    <!-- Datatables -->
    {{ Html::style('/modules/extranet/plugins/datatables/datatables.min.css') }}
    {{ Html::script('/modules/extranet/plugins/datatables/datatables.min.js') }}
    {{ Html::script('/modules/extranet/js/libs/datatabletools.js') }}
    {{ Html::script('/modules/extranet/js/libs/dialog.js') }}
@endpush

@push('javascripts')
    <script>
    var csrf_token = "{{csrf_token()}}";
    var routes = {
        data : '{{ route("extranet.routes_parameters.data") }}',
    };
    </script>

    {{ Html::script('/modules/extranet/js/admin/extranet/parameterslist.js') }}

@endpush
