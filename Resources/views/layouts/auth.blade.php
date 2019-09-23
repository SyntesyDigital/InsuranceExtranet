<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>{{env('APP_NAME')}}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="stylesheet" media="all" href="/css/app.css" />
        <link rel="stylesheet" media="all" href="/css/font-awesome/css/font-awesome.min.css" />
        <script src="/js/app.js"></script>
    </head>

    <body>
		<section id="wrapper" class="auth">
			<section id="header">

			</section>
			<section id="content">
				@yield('content')
	        </section>
        </section>
    </body>
</html>
