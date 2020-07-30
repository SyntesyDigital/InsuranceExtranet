@if(isset($menu))
	<ul class="container-menu">
        @php $footerItems = 0; @endphp
        
        @foreach($menu as $index => $menuElement)
            @if(isset($menuElement["name"]))
                <li class="menu-item">
                    @php
                        $link = format_link($menuElement);
                        $hasChildren = sizeof($menuElement["children"]) > 0 ? 1 : 0;
                    @endphp
                    @if(isset($link))
                        @if($footerItems > 0)
                            <span class="footer-separator"> | </span>
                        @endif
                        <a href="{{$link["url"]}}" id="{{$link["id"]}}" class="{{$link["class"]}}" >

                            @if(isset($link["icon"]))
                                <i class="{{$link['icon']}}"></i>
                            @endif
                            {{$link["name"]}}
                        </a>
                    @else
                        <p>
                            @if($footerItems > 0)
                                <span class="footer-separator"> | </span>
                            @endif

                            @if(!is_array($menuElement["name"]))
                                {{ $menuElement["name"] or '' }}
                            @endif 
                        </p>
                    @endif
                </li>
			    @php $footerItems++; @endphp
            @endif
		@endforeach
	</ul>
@endif
