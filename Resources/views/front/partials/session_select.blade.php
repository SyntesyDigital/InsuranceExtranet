

@if(Auth::user()->supervue)

	@php
		$sessions = Auth::user()->sessions;
		$options = [];
		foreach($sessions as $session) {
			$options[$session->session] = $session->lib;
		}
        $current = isset(Auth::user()->session_info->{'USEREXT.id_per'}) 
            ? Auth::user()->session_info->{'USEREXT.id_per'} 
            : null;
	@endphp

	{!!
		Form::select(
			'sessions',
			$options,
			$current,
			[
				'class' => 'form-control session-changer',
				'id' => 'session-changer'
			]
		)
	!!}
@else
	Bonjour, {{Auth::user()->firstname}}
@endif


@push('javascripts')
<script>

	$(function(){

		if($('#session-changer').length > 0){
			$('#session-changer').change(function(e) {

				var sessionId = e.target.value;

				$('#session-changer').prop( "disabled", true );

				//post sessions
				$.ajax({
					method: "POST",
					url: '{{ route('session.update') }}',
					data: {
								session_id : sessionId,
								_token: $('meta[name="csrf-token"]').attr('content')
							},
					dataType: 'json'
				}).done(function(response) {

							//console.log(response);
							//window.location.href = response.redirect;
							window.location.href = '/';

				}).fail(function(jqXHR, textStatus) {
						//el.find('.modal-footer .message').html(jqXHR.responseJSON.message);
							window.location.href = '/';
				});


			});
		}
	});
</script>

@endpush
