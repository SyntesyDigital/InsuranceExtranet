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
					<div class="user-info">
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
    });

	$(function(){
		$('.menu').click (function(e){
            $(this).toggleClass('open');
            $(".tooltip-link").tooltip({
                disabled: false,
                position: { my: "left+15 center", at: "right center" }
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
