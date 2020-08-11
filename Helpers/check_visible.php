<?php

if (!function_exists('check_visible')) {
    function check_visible($settings, $parameters)
    {
        if (!isset($parameters)) {
            return true;
        }

        $conditionalVisibility = check_conditional_visibility($settings,$parameters);
        $visibilityByWS = check_visibility_by_ws($settings,$parameters);

        //if one is visible the other is not
        $visible = $conditionalVisibility && $visibilityByWS;

        return $visible;
    }

    function check_conditional_visibility($settings,$parameters) 
    {
        if (!isset($settings) || !isset($settings['conditionalVisibility'])
        || $settings['conditionalVisibility'] == '') {
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

    function check_visibility_by_ws($settings,$parameters) {

        if (!isset($settings) || !isset($settings['wsVisibility'])
        || $settings['wsVisibility'] == '') {
            return true;
        }

        $settings = $settings['wsVisibility'];
    }

    function check_condition_accepted($condition, $parameters)
    {
        if (!isset($condition['name']) || $condition['name'] == '') {
            return false;
        }
        if (!isset($condition['values']) || $condition['values'] == '') {
            return false;
        }
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
}
