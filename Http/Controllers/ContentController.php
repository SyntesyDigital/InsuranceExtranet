<?php

namespace Modules\Extranet\Http\Controllers;

use App\Http\Controllers\Controller;
use Auth;
use File;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Imagick;
use Modules\Architect\Entities\Content;
use Modules\Architect\Entities\Url;
use Modules\Architect\Repositories\ContentRepository;
use Modules\Extranet\Adapters\FieldsAdapter;
use Modules\Extranet\Adapters\PageBuilderAdapter;
use Modules\Extranet\Repositories\BobyRepository;
use Modules\Extranet\Repositories\DocumentRepository;
use Modules\Extranet\Repositories\ElementRepository;

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
     *
     * @return Response
     */
    public function index(Request $request)
    {
        $homeSlug = 'accueil';

        $content = Content::whereField('slug', $homeSlug)->first();

        if (!$this->isPageAllowed('/'.$homeSlug)) {
            abort(404, 'Page not allowed');
        }

        if ($content == null) {
            abort(404);
        }

        $content->load('fields', 'page');

        //check parameters exist

        if (!$this->checkNecessaryParameters($request, $content)) {
            abort(404, 'Insuficient parameters');
        }

        $pageBuilderAdapter = new PageBuilderAdapter($content);

        if ($request->has('debug')) {
            dd(
          $pageBuilderAdapter->get(),
          $this->elements->getModelsByIdentifier()
        );
        }

        return view('extranet::front.contents.page', [
        'content' => $content,
        'page' => $pageBuilderAdapter->get(),
        'models' => $this->elements->getModelsByIdentifier(),
        'contentSettings' => $content->getSettings(),
      ]);
    }

    public function search(Request $request)
    {
        $content = Content::whereField('slug', 'search')->first();

        if ($content == null) {
            abort(404);
        }

        $content->load('fields', 'page');

        $pageBuilderAdapter = new PageBuilderAdapter($content);

        if ($request->has('debug')) {
            dd($pageBuilderAdapter->get());
        }

        return view('extranet::front.contents.page', [
        'content' => $content,
        'page' => $pageBuilderAdapter->get(),
        'models' => $this->elements->getModelsByIdentifier(),
        'contentSettings' => $content->getSettings(),
      ]);
    }

    private function checkNecessaryParameters($request, $content)
    {
        $parameters = $content->getRouteParametersWithSettings();

        if (isset($parameters)) {
            foreach ($parameters as $identifier => $parameter) {
                if ($parameter['required'] && !$request->has($identifier)) {
                    return false;
                }
            }
        }

        return true;
    }

    private function renderPage($request, $content)
    {
        $pageBuilderAdapter = new PageBuilderAdapter($content);

        //check parameters exist
        if (!$this->checkNecessaryParameters($request, $content)) {
            abort(404, 'Insuficient parameters');
        }

        if ($request->has('debug')) {
            dd($pageBuilderAdapter->get(), $this->elements->getModelsByIdentifier());
        }

        return view('extranet::front.contents.page', [
            'content' => $content,
            'page' => $pageBuilderAdapter->get(),
            'models' => $this->elements->getModelsByIdentifier(),
            'contentSettings' => $content->getSettings(),
        ]);
    }

    private function renderTypology($request, $content)
    {
        $data = [
            'content' => $content,
            'fields' => (new FieldsAdapter($content))->get()->toArray(),
            'contentSettings' => $content->getSettings(),
        ];

        if ($request->has('debug')) {
            dd($data);
        }

        return view('extranet::front.contents.'.strtolower($content->typology->identifier), $data);
    }

    private function isPageAllowed($slug)
    {
        if (Auth::user()->role == ROLE_USER) {
            $pages = Auth::user()->allowed_pages;
            if (!isset($pages)) {
                return false;
            }
            
            if (isset($pages->{$slug})) {
                return $pages->{$slug};
            }
            //if not in allowed pages then not necessary to filter
            return true;
        }

        return true;
    }

    public function show(Request $request, $slug)
    {
        
        $slug = '/'.$slug;
        if (!$this->isPageAllowed($slug)) {
            abort(404, 'Page not allowed');
        }

        $url = Url::where('url', $slug)
            ->where('entity_type', 'Modules\Architect\Entities\Content')
            ->first();

        if ($url == null) {
            abort(404);
        }

        $content = Content::find($url->entity_id);

        if (Auth::user()->role == ROLE_ANONYMOUS) {
            $settings = $content->getSettings();
            if (!isset($settings['accessByLink']) || $settings['accessByLink'] !== true) {
                abort(403, 'Forbidden');
            }
        }

        if ($content == null) {
            abort(404);
        }

        if ($content->is_page) {
            return $this->renderPage($request, $content);
        } elseif (isset($content->typology) && $content->typology->has_slug) {
            return $this->renderTypology($request, $content);
        }

        abort(404);
    }

    public function preview(Request $request, $id)
    {
        $content = Content::find($id);

        $pageBuilderAdapter = new PageBuilderAdapter($content);

        if ($request->has('debug')) {
            dd($pageBuilderAdapter->get());
        }

        //check parameters exist
        if (!$this->checkNecessaryParameters($request, $content)) {
            abort(404, 'Insuficient parameters');
        }

        if ($content->is_page) {
            return view('extranet::front.contents.page', [
            'content' => $content,
            'page' => $pageBuilderAdapter->get(),
            'models' => $this->elements->getModelsByIdentifier(),
            'contentSettings' => $content->getSettings(),
          ]);
        } elseif (isset($content->typology) && $content->typology->has_slug) {
            return $this->renderTypology($request, $content);
        }

        abort(404);
    }

    public function showDocument($id)
    {
        $authorized = $this->boby->checkDocumentAvailable($id);

        if (!$authorized) {
            abort(500);
        }

        $result = $this->document->find($id);

        $content = base64_decode($result->datas);

        $contentType = $result->contentType;

        //if content type not defined setup dinamically
        if (!isset($contentType)) {
            $extension = explode('.', $result->name);
            $extension = $extension[sizeof($extension) - 1];

            switch ($extension) {
            case 'msg':
              $contentType = 'application/msg';
              // no break
            default:
              $contentType = 'application/'.$extension;
          }
        }
        
        return response($content, 200)
          ->header('Content-Type', $contentType)
          ->header('Content-Disposition', 'inline; filename="'.$result->name.'"');
    }

    public function showWSFusion($id)
    {
        
        $authorized = $this->boby->checkDocumentAvailable($id);

        if (!$authorized && false) {
            abort(500);
        }

        $result = $this->document->findWSFusion($id);

        if(!isset($result) || sizeof($result) == 0 ){
            abort(500);
        }

        $filename = isset($result[0]->num) ? $result[0]->num : '' ;
        $file = isset($result[0]->message) ? $result[0]->message : null;
        
        if(!isset($file)){
            abort(500);
        }

        $file = base64_decode($file);

        $f = finfo_open();
        $mimeType = finfo_buffer($f, $file, FILEINFO_MIME_TYPE);
        $extension = $this->mime2ext($mimeType);

        return response($file, 200)
          ->header('Content-Type', $mimeType)
          ->header('Content-Disposition', 'attachment; filename="'.$filename.($extension != '' ? '.'.$extension : ''));
    }

    /**
     * TO REMOVE Not used by now
     * Function to download directly a document from giving parameters. Content and filename.
     */
    public function downloadWSFusion(Request $request) {

        //dd($request->toArray());

        if(!$request->has('content')){
            abort(500);
        }

        $filename = $request->has('filename') ? $request->get('filename')  : '' ;
        $file = $request->get('content');

        $file = base64_decode($file);

        $f = finfo_open();
        $mimeType = finfo_buffer($f, $file, FILEINFO_MIME_TYPE);
        $extension = $this->mime2ext($mimeType);

        return response($file, 200)
          ->header('Content-Type', $mimeType)
          ->header('Content-Disposition', 'attachment; filename="'.$filename.($extension != '' ? '.'.$extension : ''));

    }

    public function showDocumentPreview($id)
    {
        $authorized = $this->boby->checkDocumentAvailable($id);
        if (!$authorized) {
            abort(500);
        }
        $result = $this->document->find($id);

        $contentType = explode(';', $result->contentType);
        $contentType = $contentType[0];

        switch ($contentType) {
          case 'image/png':
          case 'image/jpeg':
          case 'image/gif':
              $content = base64_decode($result->datas);

              return response($content, 200)->header('Content-Type', $result->contentType);
            break;

          case 'application/pdf':
            $im = new Imagick();
            $im->setResolution(120, 120);

            $im->readimageblob(base64_decode($result->datas));
            $im->setiteratorindex(0);
            $im->setImageFormat('jpg');
            $im->setImageCompression(Imagick::COMPRESSION_JPEG);
            $im->setImageCompressionQuality(30);

            return response($im, 200)->header('Content-Type', 'image/jpeg');

            break;

            default:
              $content = File::get(public_path('modules/extranet/plugins/images/fa-download.png'));
              $mime = File::mimeType(public_path('modules/extranet/plugins/images/fa-download.png'));

              return response($content, 200)->header('Content-Type', $mime);
            break;
        }
    }

    public function languageNotFound(Request $request)
    {
        abort(404);
    }

    public function getContentParameters(Content $content, Request $request)
    {
        $content->load('routesParameters');

        return response()->json($content);
    }

    /**
     * Function to return content settings hierarchically
     */
    public function getContentSettings(Content $content)
    {
        $settings = Content::getTreeSettings($content->id);

        return response()->json($settings);
    }

    private function mime2ext($mime) {
        $mime_map = [
            'video/3gpp2'                                                               => '3g2',
            'video/3gp'                                                                 => '3gp',
            'video/3gpp'                                                                => '3gp',
            'application/x-compressed'                                                  => '7zip',
            'audio/x-acc'                                                               => 'aac',
            'audio/ac3'                                                                 => 'ac3',
            'application/postscript'                                                    => 'ai',
            'audio/x-aiff'                                                              => 'aif',
            'audio/aiff'                                                                => 'aif',
            'audio/x-au'                                                                => 'au',
            'video/x-msvideo'                                                           => 'avi',
            'video/msvideo'                                                             => 'avi',
            'video/avi'                                                                 => 'avi',
            'application/x-troff-msvideo'                                               => 'avi',
            'application/macbinary'                                                     => 'bin',
            'application/mac-binary'                                                    => 'bin',
            'application/x-binary'                                                      => 'bin',
            'application/x-macbinary'                                                   => 'bin',
            'image/bmp'                                                                 => 'bmp',
            'image/x-bmp'                                                               => 'bmp',
            'image/x-bitmap'                                                            => 'bmp',
            'image/x-xbitmap'                                                           => 'bmp',
            'image/x-win-bitmap'                                                        => 'bmp',
            'image/x-windows-bmp'                                                       => 'bmp',
            'image/ms-bmp'                                                              => 'bmp',
            'image/x-ms-bmp'                                                            => 'bmp',
            'application/bmp'                                                           => 'bmp',
            'application/x-bmp'                                                         => 'bmp',
            'application/x-win-bitmap'                                                  => 'bmp',
            'application/cdr'                                                           => 'cdr',
            'application/coreldraw'                                                     => 'cdr',
            'application/x-cdr'                                                         => 'cdr',
            'application/x-coreldraw'                                                   => 'cdr',
            'image/cdr'                                                                 => 'cdr',
            'image/x-cdr'                                                               => 'cdr',
            'zz-application/zz-winassoc-cdr'                                            => 'cdr',
            'application/mac-compactpro'                                                => 'cpt',
            'application/pkix-crl'                                                      => 'crl',
            'application/pkcs-crl'                                                      => 'crl',
            'application/x-x509-ca-cert'                                                => 'crt',
            'application/pkix-cert'                                                     => 'crt',
            'text/css'                                                                  => 'css',
            'text/x-comma-separated-values'                                             => 'csv',
            'text/comma-separated-values'                                               => 'csv',
            'application/vnd.msexcel'                                                   => 'csv',
            'application/x-director'                                                    => 'dcr',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'   => 'docx',
            'application/x-dvi'                                                         => 'dvi',
            'message/rfc822'                                                            => 'eml',
            'application/x-msdownload'                                                  => 'exe',
            'video/x-f4v'                                                               => 'f4v',
            'audio/x-flac'                                                              => 'flac',
            'video/x-flv'                                                               => 'flv',
            'image/gif'                                                                 => 'gif',
            'application/gpg-keys'                                                      => 'gpg',
            'application/x-gtar'                                                        => 'gtar',
            'application/x-gzip'                                                        => 'gzip',
            'application/mac-binhex40'                                                  => 'hqx',
            'application/mac-binhex'                                                    => 'hqx',
            'application/x-binhex40'                                                    => 'hqx',
            'application/x-mac-binhex40'                                                => 'hqx',
            'text/html'                                                                 => 'html',
            'image/x-icon'                                                              => 'ico',
            'image/x-ico'                                                               => 'ico',
            'image/vnd.microsoft.icon'                                                  => 'ico',
            'text/calendar'                                                             => 'ics',
            'application/java-archive'                                                  => 'jar',
            'application/x-java-application'                                            => 'jar',
            'application/x-jar'                                                         => 'jar',
            'image/jp2'                                                                 => 'jp2',
            'video/mj2'                                                                 => 'jp2',
            'image/jpx'                                                                 => 'jp2',
            'image/jpm'                                                                 => 'jp2',
            'image/jpeg'                                                                => 'jpeg',
            'image/pjpeg'                                                               => 'jpeg',
            'application/x-javascript'                                                  => 'js',
            'application/json'                                                          => 'json',
            'text/json'                                                                 => 'json',
            'application/vnd.google-earth.kml+xml'                                      => 'kml',
            'application/vnd.google-earth.kmz'                                          => 'kmz',
            'text/x-log'                                                                => 'log',
            'audio/x-m4a'                                                               => 'm4a',
            'application/vnd.mpegurl'                                                   => 'm4u',
            'audio/midi'                                                                => 'mid',
            'application/vnd.mif'                                                       => 'mif',
            'video/quicktime'                                                           => 'mov',
            'video/x-sgi-movie'                                                         => 'movie',
            'audio/mpeg'                                                                => 'mp3',
            'audio/mpg'                                                                 => 'mp3',
            'audio/mpeg3'                                                               => 'mp3',
            'audio/mp3'                                                                 => 'mp3',
            'video/mp4'                                                                 => 'mp4',
            'video/mpeg'                                                                => 'mpeg',
            'application/oda'                                                           => 'oda',
            'audio/ogg'                                                                 => 'ogg',
            'video/ogg'                                                                 => 'ogg',
            'application/ogg'                                                           => 'ogg',
            'application/x-pkcs10'                                                      => 'p10',
            'application/pkcs10'                                                        => 'p10',
            'application/x-pkcs12'                                                      => 'p12',
            'application/x-pkcs7-signature'                                             => 'p7a',
            'application/pkcs7-mime'                                                    => 'p7c',
            'application/x-pkcs7-mime'                                                  => 'p7c',
            'application/x-pkcs7-certreqresp'                                           => 'p7r',
            'application/pkcs7-signature'                                               => 'p7s',
            'application/pdf'                                                           => 'pdf',
            'application/octet-stream'                                                  => 'pdf',
            'application/x-x509-user-cert'                                              => 'pem',
            'application/x-pem-file'                                                    => 'pem',
            'application/pgp'                                                           => 'pgp',
            'application/x-httpd-php'                                                   => 'php',
            'application/php'                                                           => 'php',
            'application/x-php'                                                         => 'php',
            'text/php'                                                                  => 'php',
            'text/x-php'                                                                => 'php',
            'application/x-httpd-php-source'                                            => 'php',
            'image/png'                                                                 => 'png',
            'image/x-png'                                                               => 'png',
            'application/powerpoint'                                                    => 'ppt',
            'application/vnd.ms-powerpoint'                                             => 'ppt',
            'application/vnd.ms-office'                                                 => 'ppt',
            'application/msword'                                                        => 'doc',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation' => 'pptx',
            'application/x-photoshop'                                                   => 'psd',
            'image/vnd.adobe.photoshop'                                                 => 'psd',
            'audio/x-realaudio'                                                         => 'ra',
            'audio/x-pn-realaudio'                                                      => 'ram',
            'application/x-rar'                                                         => 'rar',
            'application/rar'                                                           => 'rar',
            'application/x-rar-compressed'                                              => 'rar',
            'audio/x-pn-realaudio-plugin'                                               => 'rpm',
            'application/x-pkcs7'                                                       => 'rsa',
            'text/rtf'                                                                  => 'rtf',
            'text/richtext'                                                             => 'rtx',
            'video/vnd.rn-realvideo'                                                    => 'rv',
            'application/x-stuffit'                                                     => 'sit',
            'application/smil'                                                          => 'smil',
            'text/srt'                                                                  => 'srt',
            'image/svg+xml'                                                             => 'svg',
            'application/x-shockwave-flash'                                             => 'swf',
            'application/x-tar'                                                         => 'tar',
            'application/x-gzip-compressed'                                             => 'tgz',
            'image/tiff'                                                                => 'tiff',
            'text/plain'                                                                => 'txt',
            'text/x-vcard'                                                              => 'vcf',
            'application/videolan'                                                      => 'vlc',
            'text/vtt'                                                                  => 'vtt',
            'audio/x-wav'                                                               => 'wav',
            'audio/wave'                                                                => 'wav',
            'audio/wav'                                                                 => 'wav',
            'application/wbxml'                                                         => 'wbxml',
            'video/webm'                                                                => 'webm',
            'audio/x-ms-wma'                                                            => 'wma',
            'application/wmlc'                                                          => 'wmlc',
            'video/x-ms-wmv'                                                            => 'wmv',
            'video/x-ms-asf'                                                            => 'wmv',
            'application/xhtml+xml'                                                     => 'xhtml',
            'application/excel'                                                         => 'xl',
            'application/msexcel'                                                       => 'xls',
            'application/x-msexcel'                                                     => 'xls',
            'application/x-ms-excel'                                                    => 'xls',
            'application/x-excel'                                                       => 'xls',
            'application/x-dos_ms_excel'                                                => 'xls',
            'application/xls'                                                           => 'xls',
            'application/x-xls'                                                         => 'xls',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'         => 'xlsx',
            'application/vnd.ms-excel'                                                  => 'xlsx',
            'application/xml'                                                           => 'xml',
            'text/xml'                                                                  => 'xml',
            'text/xsl'                                                                  => 'xsl',
            'application/xspf+xml'                                                      => 'xspf',
            'application/x-compress'                                                    => 'z',
            'application/x-zip'                                                         => 'zip',
            'application/zip'                                                           => 'zip',
            'application/x-zip-compressed'                                              => 'zip',
            'application/s-compressed'                                                  => 'zip',
            'multipart/x-zip'                                                           => 'zip',
            'text/x-scriptzsh'                                                          => 'zsh',
        ];

        return isset($mime_map[$mime]) === true ? $mime_map[$mime] : '';
    }
}
