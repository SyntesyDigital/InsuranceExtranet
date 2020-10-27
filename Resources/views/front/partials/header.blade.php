<!-- HEADER -->
<header>
	<!-- CORPO i IDIOMES -->
	<div class="row row-header">
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
					<div class="user-info col-xs-offset-2">
                        <div class="row">
                            <div class="col-xs-12">
                                <div id="searchTopBar" class="searchTopBar"></div>
                            </div>
                            <div class="col-xs-6">
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
                        </div>
					</div>
				</div>
			@endif
		</div>
	</div>
	<!-- END CORPO I IDIOMES -->
	<!-- MENU I SEARCH -->

</header><!-- end HEADER -->

@push('javascripts')
<script>

    $(document).ready(function() {
        $(".tooltip-link").tooltip({
            disabled: true
        });
        $(".tooltip-link-action").tooltip({
                disabled: false,
                position: { my: "right+60 top-80%", at: "center" }
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
					$('.sidebar-text').fadeOut("fast");
					$('.logo-container').addClass('collapsed');
                    $('footer .version').addClass('collapsed');
				}
			}else{
				if($('#sidebar').hasClass('collapsed')){
					$('#sidebar').removeClass('collapsed');
					$('.content-wrapper').removeClass('collapsed');
					$('.sidebar-text').fadeIn();
					$('.logo-container').removeClass('collapsed');
                    $('footer .version').removeClass('collapsed');
                    $(".tooltip-link").tooltip({
                        disabled: true
                    });
				}else{
					$('#sidebar').addClass('collapsed');
					$('.content-wrapper').addClass('collapsed');
					$('.sidebar-text').fadeOut("fast");
					$('.logo-container').addClass('collapsed');
                    $('footer .version').addClass('collapsed');

                }

			}
		});
	});
</script>
@endpush
