@php
  $env = get_environment();
@endphp

@if(Auth::user() !== null && Auth::user()->test)
  <div class="env-bar">
    <i class="fas fa-exclamation-triangle"></i> Test environment |
    <span class="envirnment-button {{Auth::user()->env}}">
       <i class="fas fa-circle"></i> {{Auth::user()->env}}
    </span> |
    {{\App\Extensions\VeosWsUrl::getEnvironmentUrl(Auth::user()->env)}}
  </div>
@endif
