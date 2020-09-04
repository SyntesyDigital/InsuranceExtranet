<!-- Global site tag (gtag.js) - Google Analytics -->
@if(has_config('GA_ID') || has_default_config('GA_ID'))
  <script async src="https://www.googletagmanager.com/gtag/js?id={{get_config('GA_ID')}}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '{{get_config('GA_ID')}}');
  </script>
@endif
