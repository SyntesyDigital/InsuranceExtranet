@extends('architect::layouts.master')

@section('content')
<div class="body">
    @if(isset($sitelists))
    <div class="row">
        <div class="col-md-offset-1 col-md-10">
            <div class="card">
				<div class="card-body">

                    <h3 class="card-title">Listes de formulaire
                        <a href="{{route('extranet.admin.sitelists.create')}}" class="pull-right btn btn-primary">
                            Ajouter une liste
                        </a>
                    </h3>
    				<h6 class="card-subtitle mb-2 text-muted">Configuration des listes des formulaires</h6>

                    <table class="table" id="crosslinks-table">
                        <tr>
                            <th>#</th>
                            <th>Nom</th>
                            <th>Identifiant</th>
                            <th></th>
                        </tr>
                        @foreach($sitelists as $sl)
                        <tr>
                            <td width="50">
                                {{ $sl->id }}
                            </td>

                            <td>
                                <a href="{{ route('extranet.admin.sitelists.show', $sl->id) }}">
                                    {{ $sl->name }}
                                </a>
                            </td>

                            <td>
                                {{ $sl->identifier }}
                            </td>

                            <td>
                                <a href="{{ route('extranet.admin.sitelists.show', $sl->id) }}" class="btn btn-link"><i title="{{Lang::get('architect::datatables.edit')}}" class="fa fa-pencil-alt"></i></a>
                            </td>
                        </tr>
                        @endforeach
                    </table>
                </div>
            </div>
        </div>
    </div>
    @endif
    </div>
</div>

@endsection
