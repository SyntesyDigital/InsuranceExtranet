<?php

if (!function_exists('check_visible')) {
    function check_visible($settings, $parameters)
    {
        if (!isset($parameters)) {
            return true;
        }

        $conditionalVisibility = check_conditional_visibility($settings, $parameters);

        $visibilityByWS = check_visibility_by_ws($settings, $parameters);

        //if one is visible the other is not
        $visible = $conditionalVisibility && $visibilityByWS;

        return $visible;
    }

    function check_conditional_visibility($settings, $parameters)
    {
        if (!isset($settings) || !isset($settings['conditionalVisibility']) || $settings['conditionalVisibility'] == '') {
            return true;
        }

        $settings = $settings['conditionalVisibility'];

        $visible = $settings['initialValue'] == 'show' ? true : false;

        $parameters = parameters2array($parameters);

        $conditionsAccepted = false;

        foreach ($settings['conditions'] as $condition) {
            $conditionsAccepted = $conditionsAccepted || check_condition_accepted($condition, $parameters);
        }

        if ($conditionsAccepted) {
            $visible = !$visible;
        }

        return $visible;
    }

    function check_visibility_by_ws($settings, $parameters)
    {
        if (!isset($settings) || !isset($settings['wsVisibility']) || $settings['wsVisibility'] == '') {
            return true;
        }

        $settings = $settings['wsVisibility'];

        //query the WS
        return get_visibility_ws($settings, $parameters);
    }

    function get_visibility_ws($wsName, $parameters)
    {
        $params = '?'
            .get_session_parameter()
            .($parameters != "" ? '&'.$parameters : '');

        $boby = new Modules\Extranet\Repositories\BobyRepository();

        try {
            $data = $boby->getModelValuesQuery(
                $wsName.$params
            )['modelValues'];

            //if there is values and the value visible exist and it is Y
            if (sizeof($data) > 0) {
                if (isset($data[0]->visible) && $data[0]->visible == "Y") {
                    return true;
                }
            }
            
            return false;
        } catch (\Exception $e) {
            return false;
        }
    }

    function check_condition_accepted($condition, $parameters)
    {
        //chekc all variables exists
        if (!isset($condition['type']) || $condition['type'] == '') {
            return false;
        }
        if (!isset($condition['name']) || $condition['name'] == '') {
            return false;
        }
        if (!isset($condition['values']) || $condition['values'] == '') {
            return false;
        }
        
        //check if condition is accepted
        if ($condition['type'] == 'parameter') {
            return check_parameter_condition($condition, $parameters);
        } elseif ($condition['type'] == 'permission') {
            return check_permission_condition($condition);
        } elseif ($condition['type'] == 'role') {
            return check_role_condition($condition);
        }

        return false;
    }

    function check_parameter_condition($condition, $parameters)
    {
        if (!isset($parameters[$condition['name']])) {
            return false;
        }

        $formValue = $parameters[$condition['name']];
        $operator = $condition['operator'];

        $values = explode(',', $condition['values']);
        foreach ($values as $value) {
            $value = trim($value);
            if ($operator == 'equal' && $value == $formValue) {
                return true;
            } elseif ($operator == 'different' && $value != $formValue) {
                return true;
            }
        }

        return false;
    }

    function check_role_condition($condition)
    {
        $role = Auth::user()->veos_role;
        
        if (!isset($role)) {
            return false;
        }

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

    function check_permission_condition($condition)
    {
        $permissions = Auth::user()->veos_permissions;
        if (!isset($permissions)) {
            return false;
        }

        $operator = $condition['operator'];
        $value = $condition['values'];

        $hasPermission = check_has_permission($permissions, $value);

        if ($operator == 'equal' && $hasPermission) {
            return true;
        } elseif ($operator == 'different' && !$hasPermission) {
            return true;
        }

        return false;
    }

    function check_has_permission($permissions, $value)
    {
        if (!isset($permissions)) {
            return false;
        }

        if (isset($permissions->{$value}) && $permissions->{$value} == "Y") {
            return true;
        }
        return false;
    }
}
