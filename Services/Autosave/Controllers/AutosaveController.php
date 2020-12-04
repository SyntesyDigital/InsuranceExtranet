<?php

namespace Modules\Extranet\Services\Autosave\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

use Modules\Extranet\Services\Autosave\Jobs\CreateAutosave;
use Modules\Extranet\Services\Autosave\Jobs\UpdateAutosave;

class AutosaveController extends Controller
{
    
    /**
     * create
     *
     * @param  mixed $request
     * @return void
     */
    public function create(Request $request)
    {
        $response = dispatch_now(new CreateAutosave($request->all()));

        return $this->responseJson([
            'success' => $response ? true : false,
            'data' => $response
        ]);
    }
    
    /**
     * update
     *
     * @param  mixed $request
     * @return void
     */
    public function update(Request $request)
    {
        $response = dispatch_now(new UpdateAutosave($request->all()));

        return $this->responseJson([
            'success' => $response ? true : false,
            'data' => $response
        ]);
    }
    
    /**
     * responseJson
     *
     * @param  mixed $payload
     * @return void
     */
    public function responseJson($payload)
    {
        return response()->json($payload, $payload['success'] ? 200 : 500);
    }

}
