<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{env('APP_NAME')}}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="stylesheet" media="all" href="{{ asset('css/backend-style.css')}}" />
        <link rel="stylesheet" media="all" href="{{ asset('css/font-awesome/css/font-awesome.min.css')}}" />
        <link rel="stylesheet" media="all" href="{{ asset('plugins/toastr/toastr.min.css')}}" />

        @stack('stylesheets')

        <script src="{{ asset('/js/jquery-3.2.1.min.js') }}"></script>

        <!-- Datatables -->
        <!--<link rel="stylesheet" type="text/css" href="{{ asset('/plugins/datatables/dataTables.bootstrap.css') }}">-->
        <link rel="stylesheet" type="text/css" href="{{ asset('/plugins/datatables/datatables.min.css') }}">
        <!--<script src="{{ asset('/plugins/datatables/jquery.dataTables.min.js') }}"></script>-->
        <!--<script src="{{ asset('/plugins/datatables/dataTables.bootstrap.min.js') }}"></script>-->
        <script src="{{ asset('/plugins/datatables/datatables.min.js') }}"></script>

        <!-- Bootbox -->
        <script src="{{ asset('/plugins/bootbox/bootbox.min.js') }}"></script>

        <!-- Toastr -->
        <script src="{{ asset('/plugins/toastr/toastr.min.js') }}"></script>

        <!-- Bootstrap select -->
        <link rel="stylesheet" type="text/css" href="{{ asset('/plugins/bootstrap-select/bootstrap-select.min.css') }}">
        <script src="{{ asset('/plugins/bootstrap-select/bootstrap-select.min.js') }}"></script>

        <!-- Datepicker -->
        <link rel="stylesheet" type="text/css" href="{{ asset('/plugins/datepicker/bootstrap-datetimepicker.min.css') }}">
        <script src="{{ asset('/plugins/datepicker/bootstrap-datetimepicker.min.js') }}"></script>
        <script src="{{ asset('/plugins/datepicker/moment-with-locales.min.js') }}"></script>

        <!-- Select2 -->
        <link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/css/select2.min.css" rel="stylesheet" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/js/select2.min.js"></script>

        <script src="/js/app.js"></script>

        <!-- Dialog -->
        <script src="/js/libs/dialog.js"></script>

    </head>

    <body>

    	@yield('modal')
		<section id="wrapper">
	        {{-- <aside class="sidebar">
	        	<nav>

	        		<div class="logo">
	        			<img src="/images/logo.jpg" alt="Logo" />
	        		</div>

	        		<ul class="nav nav-stacked left-menu" id="stacked-menu">

	        			@role(['admin','user'])
                    	@include('layouts.sidebar.admin')
                    @endrole

	        		</ul>
	        	</nav>
	        </aside> --}}

	        <section id="main">
	        	@include('layouts.topbar')

	        	<section id="content">

                    @if(isset($errors))
                        @if (count($errors) > 0)
                            <div class="container">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="alert alert-danger">
                            		        <ul>
                            		            @foreach ($errors->all() as $error)
                            		                <li>{{ $error }}</li>
                            		            @endforeach
                            		        </ul>
                            		    </div>
                                    </div>
                                </div>
                            </div>
                		@endif
                    @endif

                    @if(Session::has('notify_error'))
                        <div class="container">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="alert alert-danger">
                                        {{ Session::get('notify_error') }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    @endif

                    @if(Session::has('notify_success'))
                        <div class="container">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="alert alert-success">
                                        {{ Session::get('notify_success') }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    @endif

	        		@yield('content')
	        	</section>
	        </section>

        </section>

        <div class="site-modal" id="site-modal">

            <div class="overlay"></div>

            <div class="wrapper">
            	<div class="wrapper-content">
    	            <div class="top">
    	                <a href="#" class="close btn btn-sm btn-default">
    	                    Fermer
    	                </a>
    	            </div>
    	            <div class="content"></div>
    	        </div>
            </div>

        </div>

		@stack('javascripts-libs')

        @stack('javascripts')
        <script>
            $('form.toggle-delete').on('submit', function(e){
                e.preventDefault();
                var _this = $(this);
                bootbox.confirm({
                    message: 'Etes-vous sur de vouloir supprimer cet élément ?',
                    buttons: {
                        confirm: {
                            label: 'Oui',
                            className: 'btn-success'
                        },
                        cancel: {
                            label: 'Non',
                            className: 'btn-danger'
                        }
                    },
                    callback: function (result) {
                        if(result) {
                            _this
                                .off('submit')
                                .trigger('submit');
                        }
                    }
                });
            });
        </script>
    </body>
</html>
