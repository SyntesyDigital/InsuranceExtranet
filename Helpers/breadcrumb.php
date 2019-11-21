<?php

if (!function_exists('breadcrumb')) {

    function process_parameters($content,$parameters)
    {

      $routeParameters = $content->toArray()['routes_parameters'];

      if(sizeof($routeParameters) == 0)
        return '';

      //explode parameters
      $parameters = parameters2Array($parameters);
      $resultParameters = [];

      //set a new array with filters parameters
      foreach($routeParameters as $param) {
        if(isset($parameters[$param['identifier']])){
          $resultParameters[$param['identifier']] = $parameters[$param['identifier']];
        }
      }
      //test tag

      $url = arrayToUrl($parameters);

      if($url != ""){
        $url = "?".$url;
      }
      return $url;
    }


    function arrayToUrl($parameters)
    {
      $first = true;
      $url = "";
      foreach($parameters as $key => $value ){
        if(!$first){
            $url.="&";
        }
        $url.= $key.'='.$value;
        $first = false;
      }

      return $url;
    }

    function parameters2Array($paramString)
    {
        $result = [];

        if(!isset($paramString) || $paramString == '')
          return $result;

        $paramsArray = explode("&",$paramString);
        for($i=0;$i<sizeof($paramsArray);$i++){
          $paramsSubArray = explode("=",$paramsArray[$i]);
          $result[$paramsSubArray[0]] = $paramsSubArray[1];
        }

        return $result;
    }


    function page_breadcrumb($content,$parameters)
    {
        $nodes = Modules\Architect\Entities\Content::with('fields','routesParameters')->defaultOrder()->ancestorsAndSelf($content->id);
        $breadcrumb = [];
        $prefix = '';

        // Build breadcrumb path
        foreach($nodes as $node) {
            $prefix = $prefix . '/' . $node->getFieldValue('slug');

            array_push($breadcrumb,[
                'label' => $node->title,
                'url' => $prefix.process_parameters($node,$parameters)
            ]);

        }



        // Build HTML
        $html = '';
        foreach($breadcrumb as $k => $v) {
            $arrow = "";
            if($k != sizeof($breadcrumb)-1){
              $arrow = " > ";
            }

            $html .= sprintf('<a href="%s">%s</a>'.$arrow,
                $v['url'],
                $v['label']
            );
        }
        $html .= '';

        return $html;
    }

    function typology_breadcrumb($content)
    {

        $breadcrumb = [];
        $prefix = '';

        $blog = Modules\Architect\Entities\Content::whereField("slug","blog")->first();

        array_push($breadcrumb,[
            'label' => $blog->title,
            'url' => $blog->url
        ]);

        $category = $content->categories->first();
        if($category != null){
          array_push($breadcrumb,[
              'label' => $category->getFieldValue('name'),
              'url' => route('blog.category.index' , $category->getFieldValue('slug'))
          ]);
        }

        array_push($breadcrumb,[
            'label' => $content->title,
            'url' => $content->url
        ]);

        // Build HTML
        $html = '';
        foreach($breadcrumb as $k => $v) {
            $arrow = "";
            if($k != sizeof($breadcrumb)-1){
              $arrow = " > ";
            }

            $html .= sprintf('<a href="%s">%s</a>'.$arrow,
                $v['url'],
                $v['label']
            );
        }
        $html .= '';

        return $html;
    }

    function breadcrumb_category($category)
    {
        $breadcrumb = [];
        $prefix = '';

        $blog = Modules\Architect\Entities\Content::whereField("slug","blog")->first();

        array_push($breadcrumb,[
            'label' => $blog->title,
            'url' => $blog->url
        ]);

        array_push($breadcrumb,[
            'label' => $category->getFieldValue('name'),
            'url' => route('blog.category.index' , $category->getFieldValue('slug'))
        ]);

        // Build HTML
        $html = '';
        foreach($breadcrumb as $k => $v) {
            $arrow = "";
            if($k != sizeof($breadcrumb)-1){
              $arrow = " > ";
            }

            $html .= sprintf('<a href="%s">%s</a>'.$arrow,
                $v['url'],
                $v['label']
            );
        }
        $html .= '';

        return $html;
    }

    function breadcrumb($content,$parameters)
    {
        if($content->is_page){
          return page_breadcrumb($content,$parameters);
        }
        else {
          return typology_breadcrumb($content);
        }
    }

}
