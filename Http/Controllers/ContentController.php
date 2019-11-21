<?php

namespace Modules\Extranet\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;

use Modules\Architect\Entities\Content;
use Modules\Architect\Entities\Url;
use Modules\Extranet\Adapters\PageBuilderAdapter;
use Modules\Extranet\Adapters\FieldsAdapter;
use Modules\Extranet\Entities\RouteParameter;

use Modules\Architect\Repositories\ContentRepository;
use Modules\Extranet\Repositories\ElementRepository;
use Modules\Extranet\Repositories\BobyRepository;
use Modules\Extranet\Repositories\DocumentRepository;

use Config;
use Session;
use Carbon\Carbon;

use App;
use Auth;

class ContentController extends Controller
{

    public function __construct(ElementRepository $elements,
      BobyRepository $boby,
      DocumentRepository $document,
      ContentRepository $contents
    ) {
        $this->contents = $contents;
        $this->elements = $elements;
        $this->boby = $boby;
        $this->document = $document;
    }

    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index(Request $request)
    {

      $homeSlug = 'accueil';

      $content = Content::whereField('slug',$homeSlug)->first();

      if(!$this->isPageAllowed($homeSlug))
        abort(404,'Page not allowed');

      if($content == null){
        abort(404);
      }

      $content->load('fields', 'page');

      //check parameters exist

      if(!$this->checkNecessaryParameters($request,$content)){
          abort(404,'Insuficient parameters');
      }

      $pageBuilderAdapter = new PageBuilderAdapter($content);

      if($request->has('debug'))
        dd($pageBuilderAdapter->get());

      return view('extranet::front.contents.page',[
        'content' => $content,
        'page' => $pageBuilderAdapter->get(),
        'models' => $this->elements->getModelsByIdentifier(),
        'contentSettings' => $content->getSettings()
      ]);
    }

    public function search(Request $request)
    {
      $content = Content::whereField('slug','search')->first();

      if($content == null){
        abort(404);
      }

      $content->load('fields', 'page');

      $pageBuilderAdapter = new PageBuilderAdapter($content);

      if($request->has('debug'))
        dd($pageBuilderAdapter->get());

      return view('extranet::front.contents.page',[
        'content' => $content,
        'page' => $pageBuilderAdapter->get(),
        'models' => $this->elements->getModelsByIdentifier(),
        'contentSettings' => $content->getSettings()
      ]);
    }

    private function checkNecessaryParameters($request, $content) {
        $parameters = $content->getRouteParametersWithSettings();

        if(isset($parameters)){

          foreach($parameters as $identifier => $parameter){
            if( $parameter['required'] && !$request->has($identifier)){
              return false;
            }
          }
        }

        return true;
    }

    private function renderPage($request,$content) {

        $pageBuilderAdapter = new PageBuilderAdapter($content);

        //check parameters exist
        if(!$this->checkNecessaryParameters($request,$content)){
            abort(404,'Insuficient parameters');
        }

        if($request->has('debug'))
          dd($pageBuilderAdapter->get());

        return view('extranet::front.contents.page',[
            'content' => $content,
            'page' => $pageBuilderAdapter->get(),
            'models' => $this->elements->getModelsByIdentifier(),
            'contentSettings' => $content->getSettings()
        ]);
    }

    private function renderTypology($request,$content) {

        $data = [
          'content' => $content,
          'fields' => (new FieldsAdapter($content))->get()->toArray(),
          'contentSettings' => $content->getSettings()
        ];

        if($request->has('debug'))
          dd($data);

        return view('extranet::front.contents.'.strtolower($content->typology->name),$data);
    }

    private function isPageAllowed($slug)
    {
        if(Auth::user()->role == ROLE_USER){
          $pages = Auth::user()->allowed_pages;
          if(!isset($pages))
            return false;

          if(isset($pages->{$slug})){
            return $pages->{$slug};
          }
          //if not in allowed pages then not necessary to filter
          return true;
        }

        return true;
    }

    public function show(Request $request, $slug)
    {
      //$slug = $request->segment(count($request->segments()));
      if(!$this->isPageAllowed($slug))
        abort(404,'Page not allowed');

      $slug = '/'.$slug;

      $url = Url::where('url', $slug)
        ->where('entity_type','Modules\Architect\Entities\Content')
        ->first();

      if($url == null){
        abort(404);
      }

      $content = Content::find($url->entity_id);

      if($content == null){
        abort(404);
      }

      if($content->is_page){
        return $this->renderPage($request,$content);
      }
      else if(isset($content->typology) && $content->typology->has_slug){
        return $this->renderTypology($request,$content);
      }

      abort(404);
    }

    public function preview(Request $request, $id)
    {

      $content = Content::find($id);

      $pageBuilderAdapter = new PageBuilderAdapter($content);

      if($request->has('debug'))
        dd($pageBuilderAdapter->get());

      //check parameters exist
      if(!$this->checkNecessaryParameters($request,$content)){
          abort(404,'Insuficient parameters');
      }


      if($content->is_page){
         return view('extranet::front.contents.page',[
            'content' => $content,
            'page' => $pageBuilderAdapter->get(),
            'models' => $this->elements->getModelsByIdentifier(),
            'contentSettings' => $content->getSettings()
          ]);
      }
      else if(isset($content->typology) && $content->typology->has_slug){
        return $this->renderTypology($request,$content);
      }

      abort(404);

    }

    public function showDocument($id)
    {

        $authorized = $this->boby->checkDocumentAvailable($id);

        if(!$authorized) {
            abort(500);
        }

        $result = $this->document->find($id);
        $content = base64_decode($result->datas);

        return response($content, 200)->header('Content-Type', $result->contentType);

    }

    public function languageNotFound(Request $request)
    {
      abort(404);
    }

    public function getContentParameters(Content $content,Request $request)
    {
        $content->load('routesParameters');

        return response()->json($content);
    }

}
