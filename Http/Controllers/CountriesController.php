<?php

namespace Modules\Extranet\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

use Countries;
use App;

class CountriesController extends Controller
{
		public function list()
		{
			$countries = Countries::lookup(App::getLocale());
			return response()->json($countries);
		}

}
