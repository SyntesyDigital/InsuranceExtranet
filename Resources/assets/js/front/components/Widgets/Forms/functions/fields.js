import moment from 'moment';

import TextField from './../fields/TextField';
import RichtextField from './../fields/RichtextField';
import DateField from './../fields/DateField';
import NumberField from './../fields/NumberField';
import SelectField from './../fields/SelectField';
import ListField from './../fields/ListField';
import FileField from './../fields/FileField';
import CheckField from './../fields/CheckField';
import LabelField from './../fields/LabelField';
import CarField from './../fields/CarField';
import YesNoField from './../fields/YesNoField';
import RadioField from './../fields/RadioField';
import ImmatField from './../fields/ImmatField';
import RadioMultiOptionField from './../fields/RadioMultiOptionField';
import HtmlField from './../fields/HtmlField';

import {
  HIDDEN_FIELD,
} from './../constants';

let jp = require('jsonpath');

const fieldComponents = {
    text: TextField,
    date: DateField,
    password: TextField,
    number: NumberField,
    select:SelectField,
    file:FileField,
    richtext:RichtextField,
    list:ListField,
    boolean : CheckField,
    label : LabelField,
    car : CarField,
    yesno : YesNoField,
    radio : RadioField,
    multi : RadioMultiOptionField,
    immat : ImmatField,
    html : HtmlField
};

export function getFieldComponent(type) {

    return fieldComponents[type];
}

/**
*   Function to get current array position of the json.
*/
export function getArrayPosition(jsonResult,name) {

  name = name.slice(0,-2);

  //console.log("getArrayPosition :: ",jsonResult,name);

  if(name == ""){
    //is root
    if(jsonResult instanceof Array){
      return jsonResult.length;
    }
    else if($.isEmptyObject(jsonResult)){
      //not yet set as array
      return 0;
    }
    else {
      console.error("getArrayPosition :: getting array position of non array");
    }


  }
  else {

    if(jsonResult[name] !== undefined){
      return jsonResult[name].length;
    }
  }

  return 0;
};


/**
*   Iterate recursively to make the json result.
*/
export function setupJsonResult(paramArray,index,jsonResult,name,value,arrayPosition) {

  //console.log("setupJsonResult :: setup => ",paramArray,jsonResult,index,name,arrayPosition);

  console.log("setupJsonResult :: iteration : (paramArray,index,jsonResult,name,value,arrayPosition)",
    paramArray,
    index,
    JSON.stringify(jsonResult),
    name,
    value,
    arrayPosition
  );

  if(jsonResult === undefined || $.isEmptyObject(jsonResult)){
    if(arrayPosition != null){
      //console.log("setupJsonResult :: is array ");
      jsonResult = [{}];
    }
    else {
      jsonResult = {};
    }
  }

  if(paramArray.length > index && paramArray[index] != ''){
    //continue with the next step
    jsonResult[paramArray[index]] = setupJsonResult(
      paramArray,
      index+1,
      jsonResult[paramArray[index]],
      name,
      value,
      arrayPosition
    );
  }
  else {

    //FIXME remove this chage
    if(name == "Categ"){
      name = "categ";
    }

    if(arrayPosition != null){
      //is array
      if(jsonResult[arrayPosition] === undefined){
          jsonResult[arrayPosition] = {};
      }
      //console.log("setupJsonResult :: put this var in this position ",arrayPosition,name);
      jsonResult[arrayPosition][name] = value;
    }
    else {
      jsonResult[name] = value;
    }
  }
  return jsonResult;
}

/**
*   Get json root and array position if necessary
*/
export function processJsonRoot(jsonRoot,jsonResult) {

  var paramArray = jsonRoot.split('.');
  var arrayPosition = null;
  var processedJsonRoot = "";
  var first = true;

  for(var key in paramArray){
    if(paramArray[key].indexOf('[]') != -1){
      //if is array
      arrayPosition = getArrayPosition(jsonResult,paramArray[key]);
      paramArray[key] = paramArray[key].slice(0,-2);
    }
    processedJsonRoot += (!first ? '.' : '')+paramArray[key];
    first = false;
  }

  return {
    arrayPosition : arrayPosition,
    jsonRoot : processedJsonRoot
  }
}

/**
*   Depending of the type of object and some values is necesary to process the value
*/
export function processObjectValue(object,values,formParameters) {

  const isRequired = object.OBL == "Y" ? true : false;
  const defaultValue = object.VALEUR;
  const type = object.NATURE;
  const isVisible = object.VIS;
  const isConfigurable = object.CONF == "Y" ? true : false;
  const isActive = object.ACTIF == "Y" ? true : false;

  const champIdentifier = object.PREFIX != "" 
    ? object.PREFIX+"."+object.CHAMP 
    : object.CHAMP;

  console.log("processObjectValue :: ",object,values, formParameters);

  if(type == "INPUT"){

    //FIXME this not should be necessary
    if(formParameters[defaultValue] !== undefined) {
      return formParameters[defaultValue];
    }
    else if(defaultValue == "_id_per_user"){
      return ID_PER_USER;
    }
    else if(defaultValue == "_session_id"){
      return SESSION_ID;
    }
    
    else if(values[champIdentifier] == HIDDEN_FIELD){
      //this field is hidden
      return  null;
    }
    else {

        //if champ is prefixed add prefix with identifier
        

        //get value
        if(values[champIdentifier] === undefined){
          if(isRequired){
            console.error("Field is required : "+champIdentifier);
            //TODO dispatch error
          }
        }
        else {
          return values[champIdentifier];
        }
    }

  }
  else if(type == "SYSTEM") {
    
    if(defaultValue == "_time"){
      //_time in format date
      return moment().format("DD/MM/YYYY");
    }
    else if(defaultValue == "_timestamp"){
      //_time in format unix timestamp
      return moment().unix();
    }
    else if(defaultValue == "_id_per_user"){
      return ID_PER_USER;
    }
    else if(defaultValue == "_session_id"){
      return SESSION_ID;
    }
    else if(defaultValue == "_contentType"){
      return values['_contentType'] ? values['_contentType'] : '';
    }
    else if(defaultValue == "_docName"){
      return values['_docName'] ? values['_docName'] : '';
    }
    else if(formParameters[defaultValue] !== undefined){
      //check parameters

      //if is a date, and the date comes with timestamp convert to date
      var formValue = formParameters[defaultValue];
      if(object['FORMAT'] == "date" && formValue.indexOf('/') == -1){
        return moment.unix(formValue/1000).format("DD/MM/YYYY");
      }
      else {
        return formValue;
      }
    }
    
  }
  else if(type == "CTE") {
    return defaultValue;
  }
}

/**
* Process the object and return the json modified
*/
export function processObject(object,jsonResult,jsonRoot,arrayPosition,values, formParameters) {
  //console.log("processObject :: ", jsonRoot,arrayPosition);

  var paramArray = jsonRoot.split('.');

  //conditionals to check what to do with this object, this is a part from the recursivity
  const value = processObjectValue(object,values, formParameters);

  console.log("setupJsonResult :: start : (paramArray,index,jsonResult,name,arrayPosition)",
    paramArray,
    1,
    JSON.stringify(jsonResult),
    object.CHAMP,
    arrayPosition
  );

  jsonResult = setupJsonResult(
    paramArray,
    1,
    jsonResult,
    object.CHAMP,
    value,
    arrayPosition
  );

  ////console.log("paramArray => ",paramArray);
  ////console.log("setupJsonResult :: RESULT => ",jsonResult);

  return jsonResult;
}

export function validateField(field,values,isModal) {

  let isRequired = field.rules.required !== undefined ?
    field.rules.required : false;

  //when is modal take it from main field
  if(isModal !== undefined && isModal == true && field.required !== undefined){
    isRequired = field.required;
  }

  if(isRequired){

    //if is hidden, means during the form creation is defined as not needed
    if(values[field.identifier] !== undefined && values[field.identifier] == HIDDEN_FIELD){
      //is valid
      return true;
    }

    if(values[field.identifier] === undefined || values[field.identifier] === ''){
      return false;
    }
  }

  return true;
}

/**
*   Process the response of the POST to see if necessary to
*   to add a form parameter.
*/
export function processResponseParameters(response,service,formParameters,version) {

  if(version !== undefined && version == "2"){
    //process response with json
    formParameters = processResponseFromJSONPath(response,service,formParameters);
  }
  else if(service.REPONSE != '' ){
    //there is parameters to process
    var parametersArray = service.REPONSE.split('&');

    for(var key in parametersArray){
      var parameter = parametersArray[key];

      var parameterArray = parameter.split('=');
      if(parameterArray.length > 1){
        // is a paramter , _id_sin=id, 0 : value, 1: response ocurrence
        var parameterIdentifier = parameterArray[0];
        var responseValue = parameterArray[1];

        //force value to be string
        formParameters[parameterIdentifier] = getValueFromObject(response,responseValue,null) + ""; 
      }
    }

  }

  //console.log("processResponseParameters :: form parameters => ",formParameters);

  return formParameters;
}

/**
 * Function to process all service response field with json submit. Put fields to 
 * form parameters. 
 * 
 * @param {*} response 
 * @param {*} service 
 * @param {*} formParameters 
 */
function processResponseFromJSONPath(response,service,formParameters){
  
  console.log("processResponseFromJSONPath (response,service,formParameters)",response,service,formParameters);

  if(service.REPONSE != null && service.REPONSE != "" && service.REPONSE.indexOf("[") != -1){
    var fields = JSON.parse(service.REPONSE);
    console.log("processResponseFromJSONPath (fields)",fields);
    for(var key in fields){
      
      var field = fields[key];
      if(field.key != "" && field.value != ""){        
        try {
          var value = jp.value(response,field.value);
          console.log("processResponseFromJSONPath (value) ",value);
          if(Array.isArray(value)){
            //keep as array
            formParameters[field.key] = value;
          }
          else {
            //convert to string
            formParameters[field.key] = value+"";
          }
        }
        catch(error) {
            console.error("processResponseFromJSONPath :: json path error "+field.value,error);
        }
      }
    }
  }

  console.log("processResponseFromJSONPath (formParameters)",formParameters);

  return formParameters;
}

/**
 * 
 * Function that iterates all object keys and arrays, looking for the key.
 * When found returns the value, if not found return null.
 * Needs to find name in this situations : 
 * {
    name : '',
    array : [
      {
        name : ''
      }
    ],
    name_parent : {
      name : ''
    }
  }
 */

export function getValueFromObject(item,keyToFind,key) {

  //if the current key of the value we are checking is what we look for, return the object
  if(key == keyToFind){
    return item;
  }
  
  if(Array.isArray(item)) {
    //is array iterate
    for( var arrayIndex in item) {
      var value = getValueFromObject(item[arrayIndex],keyToFind,arrayIndex);
      if(value != null){
        //if found return this value
        return value;
      }
    }
  }
  else if(typeof item === 'object' && item !== null) {
    //is object check keys
    for( var objectKey in item) {
      value = getValueFromObject(item[objectKey],keyToFind,objectKey);
      if(value != null){
        //if found return this value
        return value;
      }
    }
  }
  else {
    //the value is not there
    return null;
  }
}

/**
*   Convert parameters string to array of key value
*/
export function parameteres2Array(paramString) {
  var result = {};

  if(paramString === undefined || paramString == '')
    return result;

  var paramsArray = paramString.split("&");
  for(var i=0;i<paramsArray.length;i++){
    var paramsSubArray = paramsArray[i].split("=");
    result[paramsSubArray[0]] = paramsSubArray[1];
  }

  return result;
}


/**
*   Process procedure to obtain json result.
*/
export function processStandardProcedure(currentIndex,procedure,jsonResult,values,formParameters) {

  //console.log("processStandardProcedure :: ",currentIndex,jsonResult);

    const {arrayPosition, jsonRoot} = processJsonRoot(procedure.JSONP, jsonResult);
    console.log("processStandardProcedure :: processJsonRoot :: (arrayPosition, jsonRoot): ",arrayPosition, jsonRoot);

    for(var j in procedure.OBJECTS) {
      var object = procedure.OBJECTS[j];

      //process the object modifing the jsonResult
      jsonResult = processObject(object,jsonResult,jsonRoot,
        arrayPosition,values, formParameters);
    }

    return jsonResult;

}



/**
* When procedure is repeatable, and configurable, then the data is an array.
* So needs to be processed one POST per array item.
* Only used for procedures like documents. The root is an array.
*/
export function procedureIsArray(procedure) {
  if(procedure.CONF == 'Y' && procedure.REP == "Y" &&
    procedure.JSONP == "$.[]"){
      return true;
  }
  return false;
}

/**
*   Procedure that is a list.
*   values = current list position with values of this item
*/
export function processListProcedure (currentIndex,procedure,values,jsonResult, formParameters) {

    //console.log("processListProcedure :: ",currentIndex, values, jsonResult);

    const {arrayPosition, jsonRoot} = processJsonRoot(procedure.JSONP, jsonResult);

    //console.log("processListProcedure :: array position ",arrayPosition);

    for(var j in procedure.OBJECTS) {
      var object = procedure.OBJECTS[j];

      //process the object modifing the jsonResult
      jsonResult = processObject(object,jsonResult,jsonRoot,
        arrayPosition,values,formParameters);
    }

    //console.log("processListProcedure :: after => ",currentIndex, values, jsonResult);

    return jsonResult;

}




/**
 * FORM V2 TO REMOVE FROM HERE
 */

 /**
*   Process procedure to obtain json result.
*/
export function processStandardProcedureV2(currentIndex,procedure,jsonResult,values,formParameters) {

  //console.log("processStandardProcedure :: ",currentIndex,jsonResult);

  //init json result if not yet defined
  jsonResult = initJSONResult(jsonResult,procedure);

  jsonResult = updateJSONWithFields(
    procedure.JSONP,
    procedure.OBJECTS,
    jsonResult,
    values,
    formParameters
  );

  return jsonResult;

}

/**
 * 
 * @param {*} jsonResult 
 * @param {*} procedure 
 * @param {*} isRootArray : it's root is an array to be filled with jsons example $.documents
 */
function initJSONResult(jsonResult,procedure, isRootArray) {
  //if json result not yet defined 
  if(Object.keys(jsonResult).length === 0) {
    //update jsonresult with service json

    //if GET JSON process is not necessary
    if(procedure.SERVICE.METHODE == "GET" && ( 
      procedure.SERVICE.JSON == "" || procedure.SERVICE.JSON == "{}" ) ){
        return {};
    }

    if(procedure.SERVICE.JSON == "" || procedure.SERVICE.JSON == "{}"){
      console.error("Procedure service JSON not defined (procedure)",procedure);
    }

    if(isRootArray !== undefined && isRootArray){
      //init with void array
      jsonResult = [];
    }
    else {
      jsonResult = JSON.parse(procedure.SERVICE.JSON);
    }
  }

  return jsonResult;
}

export function updateJSONWithFields(root,fields,json,values,formParameters) {

  for(var key in fields){
      var jsonpath = root;
      var field = fields[key];

      if(field.OBJ_JSONP != null && field.OBJ_JSONP != ''){
          jsonpath += field.OBJ_JSONP;
      }
      jsonpath += field.CHAMP;

      /*
      console.log("updateJSONWithFields :: processing field (json,jsonpath,field)",
          JSON.parse(JSON.stringify(json)),
          jsonpath,
          field
      );
      */

      try {

          var value = processObjectValue(field,values, formParameters);

          jp.apply(json, jsonpath, function() { 
              return value 
          });
      }
      catch(error) {
          console.error(error);
      }

      console.log("updateJSONWithFields :: result after process (json)",
          JSON.parse(JSON.stringify(json)),
      );
  }
  return json;
}



/**
*   Procedure that is a list.
*   values = current list position with values of this item
*/
export function processListProcedureV2 (currentIndex,procedure,values,jsonResult, formParameters) {

  //console.log("processListProcedure :: ",currentIndex, values, jsonResult);

  console.log("processListProcedureV2 :: Start : (procedure)",procedure);

  //it's necessary to identify if procedure it's at root example $.documents, 
  //or into main json example $.listInfo
  var isRootArray = false;
  if(procedure.JSONP == "$.[]")
    isRootArray = true;

  jsonResult = initJSONResult(jsonResult,procedure,isRootArray);

  console.log("processListProcedureV2 :: Step 0 : (jsonResult)",jsonResult);

  //json to be filled with this item info
  var objectJson = null;
  if(isRootArray){
    //take json from service
    objectJson = initJSONResult({},procedure);
  }
  else {
    //take json form procedure json
    if(procedure.JSON == '' || procedure.JSON == '{}' || procedure.JSON == null)
      console.error("Procedure JSON not defined and needed (procedure)",procedure);

    objectJson = JSON.parse(procedure.JSON);
  }

  console.log("processListProcedureV2 :: Step 1 : (objectJson)",JSON.parse(JSON.stringify(objectJson)));

  objectJson = updateJSONWithFields(
    "$.",
    procedure.OBJECTS,
    objectJson,
    values,
    formParameters
  );  
              
  console.log("processListProcedureV2 :: Step 2 : (objectJson)",JSON.parse(JSON.stringify(objectJson)));

  //put object json edited into array
  if(isRootArray){
    //put to the root
    jsonResult.push(objectJson);
  }
  else {
    //process path
    updateJSONFromArray(
      procedure.JSONP,
      procedure.OBJECTS,
      jsonResult,
      objectJson
    );
  }

  console.log("processListProcedureV2 :: Step 3 : (jsonResult)",JSON.parse(JSON.stringify(jsonResult)));

  return jsonResult;
}

function updateJSONFromArray(jsonpath,fields,fulljson,json) {

  var paths = null;
  try {
      paths = jp.paths(fulljson,jsonpath);
  }
  catch(error) {
      console.error(error);
      return fulljson;
  }
  
  //console.log("updateJSONFromArray :: (paths,fulljson,json,fields)",paths,fulljson,json,fields);

  var path = paths[0];

  //console.log("updateJSONFromArray :: after process (path,length, fulljson,json)",path,path.length,fulljson,json);

  updateJSONFromPath(path,0,fulljson,json);

  //console.log("updateJSONFromArray :: result (fulljson)",fulljson);

  return fulljson;
}

/**
* 
* Iterate the json recursively until find the position where to add the array json.
* 
* @param {*} path array with the path to arrive to 
* @param {*} index current index of the json
* @param {*} variable current object form this point of array
* @param {*} json json to add to array
*/
function updateJSONFromPath(path,index,variable,json) {

  //console.log("updateJSONFromPath :: (path,index,variable)",path,path.length,index,variable);

  if(index == path.length - 1){
      
      //if array is defined
      if(!Array.isArray(variable)){
          variable = [];
      }

      variable.push(json);
  }
  else {
      //go ahead next step
      index++;
      updateJSONFromPath(
              path,index,variable[path[index]],json
          );
  }
}