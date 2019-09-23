@extends('architect::layouts.master')

@section('content')
{!!
    Form::open([
        'url' => isset($sitelist)
            ? route('extranet.admin.sitelists.update', $sitelist->id)
            : route('extranet.admin.sitelists.store'),
        'method' => 'POST'
    ])
!!}

{{ Form::hidden('id', isset($sitelist) ? $sitelist->id : null) }}
{{ Form::hidden('_method', isset($sitelist) ? 'PUT' : 'POST') }}

<div class="page-bar">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <a href="{{route('extranet.admin.sitelists.index')}}" class="btn btn-default">
                    <i class="fa fa-angle-left"></i>
                </a>

                <h1>
                    <i class="fa fa-reorder"></i> Listes
                </h1>

                <div class="float-buttons pull-right">

                    <div class="actions-dropdown">
                      <a href="#" class="dropdown-toggle btn btn-default" data-toggle="dropdown" aria-expanded="false">
                        {{Lang::get('architect::fields.actions')}}
                        <b class="caret"></b>
                        <div class="ripple-container"></div>
                      </a>
                        <ul class="dropdown-menu dropdown-menu-right default-padding">
                            <li class="dropdown-header"></li>
                            <li>
                                <a href="{{route('extranet.admin.sitelists.create')}}">
                                    <i class="fa fa-plus-circle"></i>
                                    &nbsp;{{Lang::get('architect::fields.new')}}
                                </a>
                            </li>
                            @if(isset($sitelist))
                            <li>
                                <a href="#" id="general-delete-btn" class="text-danger" data-redirection="{{route('extranet.admin.sitelists.index')}}" data-ajax="{{route('extranet.admin.sitelists.delete',$sitelist)}}">
                                    <i class="fa fa-trash text-danger"></i>
                                    &nbsp;
                                    <span class="text-danger">{{Lang::get('architect::fields.delete')}}</span>
                                </a>
                            </li>
                            @endif
                        </ul>
                    </div>
                    {!!
                        Form::submit(Lang::get('architect::fields.save'), [
                            'class' => 'btn btn-primary'
                        ])
                    !!}
                </div>
            </div>
        </div>
    </div>
</div>


<div class="container rightbar-page sitelist">

    {{-- LEFT COLUMN --}}
      <div class="col-md-9 page-content">
          <div class="card-body jsonbuilder">
            <h3 class="card-title">Définition de la liste</h3>
            <ul class="tabs"></ul>
                <div class="content-field-dropper"  ondrop="app.sitelist.drop(event)" ondragover="app.sitelist.dragover(event)" ></div>

                {!!
                    Form::hidden('value', isset($sitelist) ? $sitelist->value : null, [
                        'rows' => 20,
                        'class' => 'form-control'
                    ])
                !!}

            <div class="page-row add-row-block">
              <a href="#" class="btn btn-default add-item"><i class="fa fa-plus-circle"></i> Ajouter une ligne</a>
            </div>

          </div>
      </div>

  {{-- SIDEBAR --}}
      <div class="sidebar">

          <div class="form-group {{$errors->has("name") ? 'has-error' : ''}}">
              <label for="name">Titre</label>
              {!!
                  Form::text('name', isset($sitelist) ? $sitelist->name : null, [
                      'oninput' => 'app.sitelist.updatePreview();',
                      'class' => 'form-control',
                      'id' => 'name'
                  ])
              !!}
          </div>

          <div class="form-group {{$errors->has("identifier") ? 'has-error' : ''}}">
             <label for="name">Identifiant</label>
             {!!
                 Form::text('identifier', isset($sitelist) ? $sitelist->identifier : null, [
                     'oninput' => 'app.sitelist.updatePreview();',
                     'class' => 'form-control',
                     'id' => 'identifier',
                 ])
             !!}
          </div>

          <div class="form-group {{$errors->has("type") ? 'has-error' : ''}}">
              <label for="type">Type de liste</label>
              {!!
                  Form::select('type', [
                      'select' => 'Select',
                      'checkbox' => 'Checkbox',
                      'radios' => 'Radios',
                  ], isset($sitelist) ? $sitelist->type : null, [
                      'onchange' => 'app.sitelist.updatePreview();',
                      'class' => 'form-control',
                      'id' => 'type',
                  ])
              !!}
          </div>

          <hr />
          <h3>Prévisualisation</h3>
          <div id="preview"></div>

          {{ Form::close()}}
          <hr />

          @if(isset($sitelist))
          <div class="form-group">
              {!!
                  Form::open([
                      'url' => route('extranet.admin.sitelists.delete', $sitelist->id),
                      'method' => 'POST',
                      'class' => 'delete-sitelist-form',
                      'id' => 'general-delete-form'
                  ])
              !!}
              <input type="hidden" name="_method" value="DELETE">
              {{ Form::close() }}
          </div>
        @endif
      </div>

</div>


@endsection


@push('javascripts')
    <script>
    var architect_content = {!! isset($sitelist) && $sitelist->definition != "" ? $sitelist->definition:'[]' !!};
    </script>
    {{ Html::script('/modules/extranet/js/admin/tools/app.js') }}
    {{ Html::script('/modules/extranet/js/admin/tools/app.sitelist.js') }}
    <script type="text/javascript">
        $( document ).ready(function() {
            app.sitelist.init();
        });
    </script>
@endpush
