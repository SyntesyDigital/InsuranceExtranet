@php
    $config = get_config_object($group = 'general');
    $draftBtn =  isset($config['DRAFT_BTN']) && $config['DRAFT_BTN']->value === true ? true : false;
    $locationBtn = isset($config['LOCALITATION_BTN']) && $config['LOCALITATION_BTN']->value === true ? true : false;
    $notifyBtn = isset($config['NOTIFICATION_BTN']) && $config['NOTIFICATION_BTN']->value === true;

    $topBar = json_decode($content->settings)->topBar?json_decode($content->settings)->topBar:false;
@endphp

<!-- HEADER -->
<header>
	<!-- CORPO i IDIOMES -->
	<div class="row row-header">
        @if($topBar)
            <div class="right-part-header top-bar-page-container">
                <div class="top-page-custom">
                    @php $icon = $topBar->icon @endphp
                    @if (is_creatic_enable() && is_creatic_icon($icon))
                        <svg class="icon {{ $icon or '' }}">
                            <use xlink:href="#{{ $icon or '' }}"></use>
                        </svg>
                    @elseif(is_font_awesome_enable())
                        <i class="{{ $icon or '' }}"></i>
                    @endif
                    <h3>{{$topBar->title}}</h3>
                    <div class="links">
                        <a href="#">
                            <svg class="icon creatic-ico_enregistrer">
                                <use xlink:href="#creatic-ico_enregistrer"></use>
                            </svg>                    
                        </a>
                        <a href="#">
                            <svg class="icon creatic-efface_saisie">
                                <use xlink:href="#creatic-efface_saisie"></use>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        @else

            <div class="right-part-header {{isset($isLogin) ? 'login-header' : ''}}">
                @if(null !== Auth::user())
                    <div class="menu-container">
                        <div class="menu">
                            <button id="sidebar-button" class="navbar-toggle" type="button">
                                <span class="sr-only">Menu</span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                            </button>
                        </div>
                        <div class="user-info">
                    
                            <div class="row">
                                @if (isset($config['SEARCH_IS_ACTIVE']) && $config['SEARCH_IS_ACTIVE']->value === true)
                                    <div class="col-xs-12">
                                        <div 
                                            id="searchTopBar" 
                                            class="searchTopBar" 
                                        >
                                        </div>
                                        <div class="settings-search {{$draftBtn || $locationBtn || $notifyBtn === true ? '' : 'right'}}">
                                            @if(has_roles([ROLE_SUPERADMIN,ROLE_SYSTEM,ROLE_ADMIN]))
                                                <div class="button-header-container">
                                                    <a href="{{route('dashboard')}}" class="tooltip-link-setting btn-header" title="Espace Admin">
                                                        <i class="fa fa-cog"></i>
                                                    </a>
                                                </div>
                                            @endif
                                            <p class="user-name">
                                                @include('extranet::front.partials.session_select')
                                            </p>
                                        </div>
                                    </div>
                                @else
                                    <div class="col-xs-12">
                                        @if(has_roles([ROLE_SUPERADMIN,ROLE_SYSTEM,ROLE_ADMIN]))
                                            <div class="button-header-container">
                                                <a href="{{route('dashboard')}}" class="btn btn-header">
                                                    <i class="fa fa-cog"></i> <p class="button-text">Espace Admin</p>
                                                </a>
                                            </div>
                                        @endif
                                        <p class="user-name">
                                            @include('extranet::front.partials.session_select')
                                        </p>
                                    </div>
                                @endif
                            </div>
                        </div>
                    </div>
                @endif
            </div>
        @endif
        
	</div>
	<!-- END CORPO I IDIOMES -->
	<!-- MENU I SEARCH -->

    <!-- Include file defs svg creatic custom library -->
    @include('extranet::front.partials.svg_defs')

</header><!-- end HEADER -->


@push('javascripts')
<script>

    $(document).ready(function() {
        
        $(".tooltip-link").tooltip({
            disabled: true
        });
        $(".tooltip-link-action").tooltip({
            disabled: false,
            position: { my: "left center", at: "center bottom+20" }
        });
        $(".tooltip-link-setting").tooltip({
            disabled: false,
            position: { my: "left-50 center", at: "center bottom+20" }
        });
        $( ".menu-item" ).click(function() {
            setTimeout(function(){
                $('.sidebar.collapsed .menu-child .tooltip-link').tooltip({
                    disabled: false,
                    position: { my: "left+5 center", at: "right center" }
                });
            }, 500);
        });
        //iframeFile styles on document iframe load
        $(".iframe-content").on("load", function() {
            let head = $(".iframe-content").contents().find("head");
            let css = '<style>body{text-align:center;}img{height: 100vh;}</style>';
            $(head).append(css);
        });
    });

	$(function(){
		$('.menu').click (function(e){
            $(this).toggleClass('open');
            $(".tooltip-link").tooltip({
                disabled: false,
                position: { my: "left+5 center", at: "right center" }
            });
            e.preventDefault();
			if($('#sidebar').hasClass('initial')){
				$('#sidebar').removeClass('initial');
				if($('#sidebar').width() > 0){
					$('#sidebar').addClass('collapsed');
                    $('.content-wrapper').addClass('collapsed');
                    $('.top-bar-page-container').addClass('collapsed');
                    $('.user-info').addClass('collapsed');
					$('.sidebar-text').fadeOut("fast");
					$('.logo-container').addClass('collapsed');
                    $('footer .version').addClass('collapsed');
				}
			}else{
				if($('#sidebar').hasClass('collapsed')){
					$('#sidebar').removeClass('collapsed');
                    $('.content-wrapper').removeClass('collapsed');
                    $('.top-bar-page-container').removeClass('collapsed');
                    $('.user-info').removeClass('collapsed');
					$('.sidebar-text').fadeIn();
					$('.logo-container').removeClass('collapsed');
                    $('footer .version').removeClass('collapsed');
                    $(".tooltip-link").tooltip({
                        disabled: true
                    });
				}else{
					$('#sidebar').addClass('collapsed');
                    $('.content-wrapper').addClass('collapsed');
                    $('.top-bar-page-container').addClass('collapsed');
                    $('.user-info').addClass('collapsed');
					$('.sidebar-text').fadeOut("fast");
					$('.logo-container').addClass('collapsed');
                    $('footer .version').addClass('collapsed');

                }

			}
		});
	});
</script>
@endpush
