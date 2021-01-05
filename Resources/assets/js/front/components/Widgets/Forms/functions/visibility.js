import {
  VISIBILITY_SHOW,
  OPERATOR_EQUAL,
  OPERATOR_DIFFERENT,
  CONDITION_FIELD_TYPE_CONFIGURABLE,
  CONDITION_FIELD_TYPE_PARAMETER,
  CONDITION_FIELD_TYPE_ROLE,
  CONDITION_FIELD_TYPE_PERMISSION
} from './../constants';
import { value } from 'jsonpath';

import { isDefined } from './parameters';

/**
*   Check if field is visible depending on visibility conditionals.

- check if parameter exist in form parameters and check value
- check every condition
type_pol = [true,false,]

*/
export function isVisible(field,formParameters,values,stageParameter) {

  ////console.log("isVisible :: ",field,formParameters,values);
  if(values === undefined)
    return false;

  var visible = true;

  if(stageParameter != null){
    //if there is tage check if it's visible in the stage
    visible = checkStageVisibility(field,formParameters,stageParameter);
  }

  //console.log("validateFields :: checkStageVisibility (field,formParameters,stageParameter, visible )",field.identifier,visible);

  //if is visible in the stage and visibile on its condition.
  visible = checkConditionalVisiblity(field,formParameters,values) && visible;
  // If not visible in stage visible is false.

  //console.log("validateFields :: checkConditionalVisiblity (identifier,values, visible )",field,values,visible);

  return visible;

}

/**
 * Function to check if container has a visible field. If not, not necessry to display the row, only for rows.
 * Can be necessary to have empty cols for structure
 * @param {*} field 
 */
export function hasVisibleChildren(field,formParameters,values,stageParameter) {

    console.log("checkVisibility :: hasVisibleChildren start : field, ",field);
    if(field.type == "row" || field.type == "col"){
      if(field.children != null){

        //if is visible check for its children, if it's not visible not necessary to check
        for(var key in field.children){
            var child = field.children[key];
            if(hasVisibleChildren(child,formParameters,values,stageParameter)){
              //if any of the children is visible, then 
              return true;
            }
        }

        return false;
      }
      else {
        //is row or call but has no visible children, then doesn't matter if its visible or not
        return false;
      }
    }
    else {
        //is element
        return isVisible(field.field,formParameters,values,stageParameter)
    }
}

function checkStageVisibility(field,formParameters,stageParameter) {
    //console.log("checkStageVisibility :: ",field,formParameters,stageParameter);

    if(isDefined(field.settings.stage)){
        var rowStage = field.settings.stage;
        if(isDefined(formParameters['_'+stageParameter])){
          //row is visible if stage is the same of form paramters
          var currentStage = formParameters['_'+stageParameter];
          return currentStage == rowStage;
        }
        else {
          //console.error("checkStageVisibility : formParameters[stageParameter] not defined.");
          return true;
        }
    }
    //if stage not defined, is visible by default
    return true;
}

function checkConditionalVisiblity(field,formParameters,values) {

  //if no has settings return visible
  if(field.settings === undefined || field.settings.conditionalVisibility === undefined || field.settings.conditionalVisibility == null){
    return true;
  }

  var settings = field.settings.conditionalVisibility;

  var visible = settings.initialValue == VISIBILITY_SHOW ? true : false;  //init with default value

  var conditionAccepted = false;

  for(var index in settings.conditions) {
    //fixme improve || for join type
    conditionAccepted = conditionAccepted || checkConditionAccepted(
      settings.conditions[index],
      formParameters,
      values
    );
  }

  if(conditionAccepted){
    //change visible to opposite
    visible = !visible;
  }
  //if any condition is accepted, visible

  ////console.log("isVisible :: ",visible);

  return visible;
}


/**
*   Check each condition to see if it's accepted or not.
*/
function checkConditionAccepted(condition,formParameters,values) {

  if(condition.type === undefined || condition.type == "" )
    return false;

  if(condition.name === undefined || condition.name == "" )
    return false;

  /*
  //commented to allow empty values
  if(condition.values === undefined || condition.values == "" )
    return false;
  */

  
  //first get the value from parameters or variables
  if(condition.type == CONDITION_FIELD_TYPE_CONFIGURABLE){
    //it is a config field
    return checkConfigurableCondition(condition,values);
  }
  else if(condition.type == CONDITION_FIELD_TYPE_PARAMETER){
    //it is a parameter
    return checkParameterCondition(condition,formParameters);
  }
  else if(condition.type == CONDITION_FIELD_TYPE_ROLE){
    return checkRoleCondition(condition);
  }
  else if(condition.type == CONDITION_FIELD_TYPE_PERMISSION){
    return checkPermissionCondition(condition);
  }

  return false;

}

function checkConfigurableCondition(condition,values) {

  var formValue = null;
  //it is a config field
  if(values[condition.name] === undefined){
    return false;
  }

  formValue = values[condition.name];

  return checkValue(condition,formValue);

}

function checkParameterCondition(condition,formParameters) {
  
  var formValue = null;

  //condition parameter don't exist in form
  if(formParameters['_'+condition.name] !== undefined){
    formValue = formParameters['_'+condition.name];
  }
  else if(formParameters[condition.name] !== undefined){
    formValue = formParameters[condition.name];
  }
  else {
    return false;
  }

  return checkValue(condition,formValue);
}

/**
 * Check if value ( formValue ) is accepted depending on operator into conditions.values string.
 * @param {*} condition 
 * @param {*} formValue 
 */
function checkValue(condition,formValue) {

  if(formValue == null)
    return false;

  var values = condition.values.split(",");
  
  var operator = condition.operator;
  
  for(var key in values){
    var value = values[key].trim();

    if(operator == OPERATOR_EQUAL && value == formValue){
      return true;
    }
    else if(operator == OPERATOR_DIFFERENT && value != formValue){
      return true;
    }
  }

  return false;

}

function isString(string){
  return typeof string === 'string' || string instanceof String;
}

function checkRoleCondition(condition) {

  //role condition can't have an empty value
  if(condition.values === undefined || condition.values == "" )
    return false;

  var role = userSession.getAPIRole();
  if(role == null || role == '')
      return false;

  var operator = condition.operator;
  var value = condition.values;

  value = isString(value) ? value.toLowerCase() : value;
  role = isString(role) ? role.toLowerCase() : role;

  var hasRole = value == role ? true : false;
  
  if (operator == OPERATOR_EQUAL && hasRole) {    
      return true;
  } else if (operator == OPERATOR_DIFFERENT && !hasRole) {
      return true;
  }

  return false;
}

function checkPermissionCondition(condition) {

  //permission condition can't have an empty value
  if(condition.values === undefined || condition.values == "" )
    return false;

  var permissions = userSession.getAPIPermissions();
  if(permissions == null || permissions === undefined)
      return false;

  var operator = condition.operator;
  var value = condition.values;

  var hasPermission = checkHasPermission(permissions,value);

  if (operator == OPERATOR_EQUAL && hasPermission) {    
      return true;
  } else if (operator == OPERATOR_DIFFERENT && !hasPermission) {
      return true;
  }

  return false;
}

function checkHasPermission(permissions, value) {
  if(permissions[value] !== undefined && permissions[value] == "Y"){
      return true;
  }
  return false;
}

