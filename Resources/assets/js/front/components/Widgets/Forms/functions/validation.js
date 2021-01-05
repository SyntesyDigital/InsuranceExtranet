import {
  HIDDEN_FIELD,
} from './../constants';

import {
  getFieldFormat
} from './fields';

export function getMinValue(field){
  var min = parseInt(getNumberFromRules(field,'minNumber'));
  return min === 0 || (min && min !== "")? min : -Number.MAX_VALUE;
}

export function getMaxValue(field){
  var max = parseInt(getNumberFromRules(field,'maxNumber'));
  return max === 0 || (max && max !== "") ? max : Number.MAX_VALUE;
}

export function getNumberFromRules(field,key) {
  const {rules} = field;
  
  if(rules[key] !== undefined && rules[key] != null && rules[key] != '' ){
    return rules[key];
  }

  return '';
}

export function validateNumber(field,value) {

  if(value === undefined || value == null || value === ''){
    //is valid, depend to check if is required or not
    return true;
  }

  var valid = true;
  var max = getMaxValue(field);
  var min = getMinValue(field);

  if(valid && isNaN(value)){
    valid = false;
  }
  if(valid && min !== '' && value < min){
    valid = false;
  }
  if(valid && max !== '' && value > max){
    valid = false;
  }

  if(valid && field.settings.integer && value !==  parseInt(value, 10)){
    valid = false;
  }

  return valid;
}

export function validateEmailFormat(value) {
  var emailRegex = (/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i).test(value);
  //console.log('emailRegex ',emailRegex);
  return emailRegex;
}

export function validateText(field,value) {

  if(value === undefined || value == null || value === ''){
    //is valid, depend to check if is required or not
    return true;
  }

  var valid = true;
  if(valid && getFieldFormat(field) == "email" && !validateEmailFormat(value)){
    valid = false;
  }

  return valid;
}

export function validateField(field,values,isModal) {

  let isRequired = field.rules !== undefined && field.rules.required !== undefined ?
    field.rules.required : false;

  //when is modal take it from main field
  if(isModal !== undefined && isModal == true && field.required !== undefined){
    isRequired = field.required;
  }

  var valid = true;
  var value = null;
  if(values[field.identifier] !== undefined){
    value = values[field.identifier];
  }

  switch(field.type){
    case 'number' : 
      valid = validateNumber(field,value);
    case 'text' :
      valid = validateText(field,value);
  }

  if(isRequired){

    //if is hidden, means during the form creation is defined as not needed
    if(values[field.identifier] !== undefined && values[field.identifier] == HIDDEN_FIELD){
      //is valid
      //nothing to do continue with validation done with field
    }

    if(values[field.identifier] === undefined || values[field.identifier] === ''){
      //is always invalid
      valid = false
    }
  }

  return valid;
}