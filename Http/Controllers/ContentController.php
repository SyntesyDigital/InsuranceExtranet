<?php

namespace Modules\Extranet\Http\Controllers;

use App\Http\Controllers\Controller;

use Modules\Extranet\Entities\RouteParameter;
use Modules\Architect\Entities\Content;

use Modules\Architect\Repositories\ContentRepository;

use Config;
use Illuminate\Http\Request;
use Session;
use Carbon\Carbon;


class ContentController extends Controller
{
    public function __construct(ContentRepository $contents) {
        $this->contents = $contents;
    }

    public function getContentParameters(Content $content,Request $request)
    {
        $content->load('routesParameters');

        return response()->json($content);
    }

}
