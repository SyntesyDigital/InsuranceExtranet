<div class="sidebar">
  <ul>
      <li class="{{ Request::is('architect/models') ? 'active' : '' }}">
          @foreach($models as $m)
            <a href="{{route('extranet.extranet.index', $m->id )}}">
              <i class="fa {{$m->icon}}"></i><span class="text">{{$m->title}}</span>
            </a>
          @endforeach
      </li>
   </ul>
   <hr />
</div>
