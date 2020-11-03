<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="{{App::getLocale()}}">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=11" />
        <meta http-equiv="Content-Language" content="{{App::getLocale()}}"/>

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="csrf-token" content="{{ csrf_token() }}" />

        <title>{{$title or Lang::get("extranet::messages.seo.title")}}</title>
        <meta name="keywords" lang="{{App::getLocale()}}" content="" />
        <meta name="description" lang="{{App::getLocale()}}" content="" />
        <meta name="abstract" content="" />
  	    <meta name="author" content="" />
        <meta name="robots" content="noindex,nofollow">

        <!-- twitter -->
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:site" content=""/>
        <meta name="twitter:creator" content=""/>
        <meta name="twitter:title" content=""/>
        <meta name="twitter:description" content=""/>

        <!-- facebook -->
        <meta property="og:url" content="" />
        <meta property="og:image" content="" />
        <meta property="og:title" content=""/>
        <meta property="og:description" content=""/>
        <meta property="og:type" content="website"/>
        
        <!-- Bootstrap -->
        <link href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-glyphicons.css" rel="stylesheet">

        <!-- Jquery -->
        <script src="{{ asset('modules/architect/plugins/jquery/jquery-3.2.1.min.js') }}"></script>
         
        <link href="{{asset('modules/extranet/css/front-style.css?v='.config('version.extranet'))}}" rel="stylesheet" type="text/css" />
        
        @include ('extranet::front.partials.style')

        <!-- Toastr -->
        <link href="{{ asset('modules/architect/plugins/toastr/toastr.min.css')}}" rel="stylesheet" media="all"  />

        <!-- Fonts -->
        <link rel="stylesheet" media="all" href="{{ asset('/front/css/font-awesome.min.css')}}" />
        
        <!-- Select 2 -->
        <link href="//cdnjs.cloudflare.com/ajax/libs/select2/4.0.0/css/select2.min.css" rel="stylesheet" />


        @stack('styles')

        @include ('extranet::front.partials.google-analytics')
    </head>

    <body class="{{$mainClass or ''}} template-{{ collect(\Request::segments())->implode('-') }} {{is_test_environment() ? 'is-test' : ''}}">

        @stack('modal')

        @if(false || (isset(Auth::user()->must_reset_password) && Auth::user()->must_reset_password))
            <!-- Reset password modal -->        
            @include('extranet::front.partials.modals.password')
        @elseif(false || (isset(Auth::user()->id) && !isset(Auth::user()->session_id)))
            <!-- Sessions modal -->        
            @include('extranet::front.partials.modals.session')
        @endif

        @if(null !== Auth::user() && !is_jailed())
            @include ('extranet::front.partials.header')

            @if(get_config('ON_LOGIN_TRIGGER_FORM')) 
                @include ('extranet::front.partials.widgets.form_submit_trigger', [
                    'formId' => get_config('ON_LOGIN_TRIGGER_FORM')
                ])
            @endif
        @endif

        @include ('extranet::front.partials.env_bar')

        <div>
          @if(null !== Auth::user())


            @if(!is_jailed())
                @include ('extranet::front.partials.sidebar')
            @endif

            <div class="content-wrapper @if(is_jailed()) jailed @endif">
                @if(isset(Auth::user()->id) && isset(Auth::user()->session_id))
                    @yield('content')
                @elseif(Auth::user() && Auth::user()->role == ROLE_ANONYMOUS)
                    @yield('content')
                @endif
            </div>
          @else
            @yield('content')
          @endif
        </div>

        <!-- Footer blade important to add JavasCript variables from Controller -->
        @if(!is_jailed())
          @include ('extranet::front.partials.footer')
        @endif
        @include ('extranet::front.layouts.jsconst')

       
        <script type="text/javascript" src="{{route('localization.js', App::getLocale())}}" ></script>

        @stack('javascripts-libs')

        <!-- Language -->
        <script type="text/javascript" src="{{asset('modules/extranet/js/lang.dist.js')}}" ></script>
        <script>
            Lang.setLocale('{{App::getLocale()}}');
        </script>

        <script type="text/javascript" src="{{asset('modules/extranet/js/front-app.js?v='.config('version.extranet'))}}" ></script>
        
        <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
        <script src="{{ asset('modules/architect/plugins/toastr/toastr.min.js') }}"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/select2/4.0.0/js/select2.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.devbridge-autocomplete/1.2.27/jquery.autocomplete.min.js" type="text/javascript"></script>

        {{ Html::script('/modules/architect/plugins/bootbox/bootbox.min.js') }}

        <script>
          toastr.options = {
            "closeButton": true,
            "timeOut": 0,
            "extendedTimeOut": 0
          };
        </script>

        @stack('javascripts')
    </body>
</html>
