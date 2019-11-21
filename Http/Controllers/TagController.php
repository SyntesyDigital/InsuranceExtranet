<?php

namespace Modules\Extranet\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

use Modules\Extranet\Adapters\PageBuilderAdapter;
use Modules\Architect\Entities\Tag;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index(Request $request, $slug)
    {
      $tag = Tag::whereField('slug', $slug)->first();

      if($tag == null){
        abort(404);
      }
      return view('extranet::front.tags.page',[
          'tag' => $tag,
      ]);

    }

}
