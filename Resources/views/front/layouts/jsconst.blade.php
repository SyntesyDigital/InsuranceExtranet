<script>
  const WEBROOT = '{{route("home")}}';
  const ASSETS = '{{asset('')}}';
  const LOCALE = '{{App::getLocale()}}';
  const CURRENCIES = {!! json_encode(get_currencies(), JSON_PRETTY_PRINT) !!};
  const SITE_CONFIG_GENERAL = {!! json_encode(get_config_object($group = 'general'), JSON_PRETTY_PRINT) !!};
  @if(isset(Auth::user()->id))
    const ID_PER_USER = '{{Auth::user()->id}}';
    const SESSION_ID = '{{isset(Auth::user()->session_id) ? Auth::user()->session_id : null}}';
    const SESSION = {!! Auth::user() !== null ? json_encode(Auth::user(), JSON_PRETTY_PRINT) : null !!};
  @endif
</script>