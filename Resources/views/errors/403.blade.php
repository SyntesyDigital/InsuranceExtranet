@extends('layouts.frontend', [
    'pageTitle' => "Acces interdit",
    'htmlTitle' => "Acces interdit"
])

@section('content')
<div class="blog-post">
	<div class="horizontal-inner-container">
		<div class="row">
			<div class="col-md-12">
				<div class="item">
					<div class="content">
						<p class="excerpt">
						 Acces interdit, votre session a peut être éxpiré.
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
@endsection
