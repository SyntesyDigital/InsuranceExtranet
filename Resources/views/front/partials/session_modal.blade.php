@push('javascripts')
<script>

	$(function(){

		var sessions = {!!json_encode(Auth::user()->sessions)!!};
		var options = [{
				text: 'Sélectionner...',
				value: '',
		}];

		for(var i=0;i<sessions.length;i++){
			options.push({
					text: sessions[i]['lib'],
					value: sessions[i]['session'],
			})
		}

		//console.log("options => ",options);

		bootbox.prompt({
		    title: "Sélectionnez une session",
		    inputType: 'select',
				closeButton : false,
				buttons: {
		        confirm: {
		            label: 'Envoyer',
		            className: 'btn-primary'
		        },
						cancel : {
								label: 'Retour',
								className: 'btn-default'
						}
		    },
		    inputOptions: options,
		    callback: function (result) {
	        if(result != null && result != ''){
							//post sessions
							$.ajax({
					        method: "POST",
					        url: '{{ route('session.update') }}',
					        data: {
										session_id : result,
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
					}
					else {
						//logout
						document.getElementById('logout-form').submit();
					}
		    }
		});
	});
</script>

@endpush
