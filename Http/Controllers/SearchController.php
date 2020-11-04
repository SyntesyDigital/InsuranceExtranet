<?php

namespace Modules\Extranet\Http\Controllers;

use Illuminate\Http\Request;
use Modules\Extranet\Repositories\BobyRepository;

class SearchController extends Controller
{
    public function __construct(BobyRepository $boby)
    {
        $this->boby = $boby;
    }

    public function search(Request $request)
    {
        $result = $this->boby->getQuery('WS2_MOD_RECHERCHE?'.get_session_parameter().'&rec='.$request->get('q'));

        return response()->json([
            'success' => true,
            'data' => isset($result->data)
                ? $result->data
                : [],
        ]);
    }
}
