<?php

namespace Modules\Extranet\Http\Controllers;

use Illuminate\Http\Request;
use Modules\Extranet\Jobs\Search\SearchQuery;
use Modules\Extranet\Repositories\BobyRepository;

class SearchController extends Controller
{
    public function __construct(BobyRepository $boby)
    {
        $this->boby = $boby;
    }

    public function search(Request $request)
    {
        $response = [
            'success' => true,
            'data' => $request->get('q')
                ? dispatch_now(new SearchQuery($request->get('q')))
                : [],
        ];

        return response()->json($response);
    }
}
