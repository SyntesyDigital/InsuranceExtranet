@php
  $env = get_environment();
@endphp

@if(Auth::user() !== null && Auth::user()->test)
  <div class="env-bar">
    <i class="fas fa-exclamation-triangle"></i> Test environment |
    <span class="envirnment-button {{Auth::user()->env}}">
       <i class="fas fa-circle"></i> {{Auth::user()->env}}
    </span> |
    {{\Modules\Extranet\Extensions\VeosWsUrl::getEnvironmentUrl(Auth::user()->env)}}

    <div class="pull-right actions">
      <a href="{{route('contents.show',$content->id)}}" target="_blank"><i class="fa fa-pencil"></i> &nbsp;Modifier</a>
    </div>

  </div>
@endif
