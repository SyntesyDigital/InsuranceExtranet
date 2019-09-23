@extends('layouts.frontend')

@section('title', $page->title)

@section('content')
<div class="breadcrumbs-container">
	<div class="horizontal-inner-container">
		<ol class="breadcrumb">
		  <li class="breadcrumb-item"><a href="{{route('home')}}">Accueil</a></li>
		  <li class="breadcrumb-item">{{$page->title}}</li>
		</ol>
	</div>
</div>

<div class="horizontal-container bg-white block-2">
	<div class="horizontal-inner-container">
		{!! $page->content !!}
	</div>
</div>
@endsection

@push('javascripts')
@endpush
