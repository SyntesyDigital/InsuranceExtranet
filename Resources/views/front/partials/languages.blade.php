<ul>

	@php
		$supportedLocales = LaravelLocalization::getSupportedLocales();
		$routeAttributes = !isset($error500) && isset($routeAttributes) ? $routeAttributes : [];
		$routeName = isset($error500) ? 'home' : Request::route()->getName();

		//FIXME put this as cache
		$languages = Modules\Architect\Entities\Language::pluck('iso','id');

	@endphp

	@if(isset($content))

		@php
				$contentUrls = $content->urls->toArray();
				$formatedContentUrls = [];
				foreach($contentUrls as $url){
					$formatedContentUrls[$languages[$url['language_id']]] = $url['url'];
				}

		@endphp

		@foreach($supportedLocales as $localeCode => $properties)
			<li @if(App::getLocale() == $localeCode) class="current" @endif>

				<a
						@if(!isset($formatedContentUrls[$localeCode])) class="undefined" @endif
						rel="alternate"
						hreflang="{{ $localeCode }}"
						href="{{ isset($formatedContentUrls[$localeCode]) ? $formatedContentUrls[$localeCode] : route('language-not-found') }}">
	          {{ $properties['native'] }}
	      </a>

			</li>
		@endforeach

	@else

		@foreach($supportedLocales as $localeCode => $properties)
			<li @if(App::getLocale() == $localeCode) class="current" @endif>
				<a
						rel="alternate"
						hreflang="{{ $localeCode }}"
						href="{{ LaravelLocalization::getURLFromRouteNameTranslated($localeCode,"routes.".$routeName,$routeAttributes) }}">
	          {{ $properties['native'] }}
	      </a>

			</li>
		@endforeach

	@endif

</ul>
