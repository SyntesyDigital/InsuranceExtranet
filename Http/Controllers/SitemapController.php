<?php

namespace Modules\Extranet\Http\Controllers;

use App\Http\Requests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use App\Http\Controllers\Controller;
use App\Http\Requests\ReserveRequest;
use Illuminate\Support\Facades\DB;

use Modules\Architect\Entities\Language;
use Modules\Architect\Repositories\ContentRepository;
use LaravelLocalization;

class SitemapController extends Controller
{

		public function __construct(ContentRepository $contents)
		{
      $this->contents = $contents;
		}

		public function sitemap()
		{

			$languages = Language::getAllCached();
      $contents = $this->contents->findWhere(['is_page'=>1]);

      //get all contents with url

      foreach($languages as $language){

        //filter contents by enabled by this language
        //get full slug with this language
        //get the url
        //priority 1

        $language->iso;
				$language->id;

      }

      //same with contents
        //get all conotents with slug = 1
        //get all slugs with code
        //priotiy 0.8


        /*
        //routes format
        $url[$language] = ["url" => $translatedUrl,"priority"=> 1];
        */


			return response()->view('sitemap', [
	      "urls" => $urls,
				"languages" => $languages
	  	])->header('Content-Type', 'text/xml');

		}

}
