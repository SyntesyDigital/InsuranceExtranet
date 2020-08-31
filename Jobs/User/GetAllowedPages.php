<?php

namespace Modules\Extranet\Jobs\User;

use Config;
use Modules\Extranet\Http\Requests\User\UpdateSessionRequest;
use Modules\Extranet\Repositories\BobyRepository;
use Modules\Extranet\Repositories\UserRepository;
use Session;
use Modules\Extranet\Extensions\VeosWsUrl;
use Auth;
use Modules\Architect\Entities\Content;


class GetAllowedPages
{
    public function __construct($currentSession,$pages, $sessionInfo)
    {
        $this->currentSession = $currentSession;
        $this->pages = $pages;
        $this->sessionInfo = $sessionInfo;
        $this->wsAllowedPages = [];
    }

    public function handle()
    {
        //get permission depending on WS
        $this->wsAllowedPages = $this->processWSAllowedPages();
        //get pages hierchically
        $pages = $this->getPagesAccessBySlug();
        return $pages;
    }

    private function processWSAllowedPages() 
    {
        if ($this->currentSession == null || $this->sessionInfo == null) {
            //not current session defined so, no pages info yet
            return [];
        }

        $allowedPages = [];

        if (is_array($this->pages)) {
            foreach ($this->pages as $index => $page) {
                //if this option exist in user info, and is Y
                $allowedPages['/'.$page->PAGE] = isset($this->sessionInfo->{$page->option}) 
                    && $this->sessionInfo->{$page->option} == 'Y'
                    ? true
                    : false;
            }
        }

        return $allowedPages;
    }

    private function getPagesAccessBySlug()
    {
        $index = 0;
        $allowedPages = array();
        $level = 1;

        //for all pages
        $pages = Content::where('is_page', 1)->get();

        foreach($pages as $page) {

            //if there are in the root
            if(!$page->parent_id) {

                //check disponibility
                $allowed = $this->isPageAllowed($page);
                $index++;
                
                //for all children
                if(!$allowed){
                    //if not allowed add to array
                    $allowedPages[$page->url] = $allowed;
                }
                
                //process children
                $this->iterateChildren($allowedPages,Content::getTree($page->id), $index,$level, $allowed);
            }
        }
        return  $allowedPages;
    }

    private function isPageAllowed($page,$parentAllowed = true) 
    {
        //if parent not allowed return false also for children
        if(!$parentAllowed)
            return false;

        //check disponibility
        $allowed = $this->isAllowedFromWS($page);

        //TO DO add allowed from config
                
        return $allowed;
    }

    private function isAllowedFromWS($page)
    {
        if(isset($this->wsAllowedPages[$page->url])){
            return $this->wsAllowedPages[$page->url];
        }
        else {
            //if there is not in the array is available from WS
            return true;
        }
    }

    private function isAllowedFromContentSettings()
    {
        //TO DO
    }

    /**
     * Function that iterates recursivley all pages.
     */
    private function iterateChildren(&$allowedPages,$pages, &$index,$level,$parentAllowed) 
    {
        $level++;
        $prev_string = '';
        if($level >= 1){
            for($i=1;$i<$level;$i++){

                $prev_string .= "-";

            }
            $prev_string .= " ";
        }

        foreach ($pages as $page) {

            //check disponibility
            $allowed = $this->isPageAllowed($page,$parentAllowed);
            $index ++;
            
            if(!$allowed) {
                $allowedPages[$page->url] = $allowed;
            }
            //continue for all children
            $this->iterateChildren($allowedPages,$page->children, $index,$level,$allowed);
        }
    }
}
