<?php

namespace Modules\Extranet\Jobs\User;

use Config;
use Session;
use Auth;
use Modules\Architect\Entities\Content;

/**
 * JOB to check if page is allowed depending on CMS configuration.
 * This is done only once at the beginig of the application
 */
class CheckAllowedPage
{
    public function __construct($page, $role, $permissions)
    {
        $this->page = $page;
        $this->role = $role;
        $this->permissions = $permissions;
    }

    /**
     *  By default pages are avialable.
     */
    private function getDefaultValue()
    {
        return true;
    }

    public function handle()
    {
        if(!isset($this->page->settings))
            return $this->getDefaultValue();

        $settings = json_decode($this->page->settings,true);

        if(!isset($settings['userAccess']) || $settings['userAccess'] == '')
            return $this->getDefaultValue();
        
        $settings = $settings['userAccess'];

        //by default if there is settings should be non allowed.
        $allowed = $settings['initialValue'] == 'show' ? true : false;

        
        //check for conditions
        $conditionsAccepted = false;

        foreach ($settings['conditions'] as $condition) {
            $conditionsAccepted = $conditionsAccepted || $this->checkConditionAccepted($condition);
        }

        //if any condition accepted change initial value
        if ($conditionsAccepted) {
            $allowed = !$allowed;
        }

        return $allowed;
    }

    private function checkConditionAccepted($condition)
    {
        //check for all variables
        if (!isset($condition['name']) || $condition['name'] == '') {
            return false;
        }
        if (!isset($condition['type']) || $condition['type'] == '') {
            return false;
        }
        if (!isset($condition['operator']) || $condition['operator'] == '') {
            return false;
        }
        if (!isset($condition['values']) || $condition['values'] == '') {
            return false;
        }
        

        if($condition['type'] == 'permission' ) {
            return $this->checkPermissionCondition($condition);
        }
        else if($condition['type'] == 'role' ) {
            return $this->checkRoleCondition($condition);
        }

        return false;
    }

    private function checkRoleCondition($condition)
    {
        $role = $this->role;
        if(!isset($role))
            return false;

        $operator = $condition['operator'];
        $value = $condition['values'];

        $hasRole = strtolower($value) == strtolower($role) ? true : false;
        
        if ($operator == 'equal' && $hasRole) {    
            return true;
        } elseif ($operator == 'different' && !$hasRole) {
            return true;
        }

        return false;
    }

    private function checkPermissionCondition($condition)
    {
        $permissions = $this->permissions;
        if(!isset($permissions))
            return false;

        $operator = $condition['operator'];
        $value = $condition['values'];

        $hasPermission = $this->hasPermission($permissions,$value);

        

        if ($operator == 'equal' && $hasPermission) {    
            return true;
        } elseif ($operator == 'different' && !$hasPermission) {
            return true;
        }

        return false;
    }

    private function hasPermission($permissions, $value) {
        if(!isset($permissions))   
            return false;

        if(isset($permissions->{$value}) && $permissions->{$value} == "Y"){
            return true;
        }
        return false;
    }

}
