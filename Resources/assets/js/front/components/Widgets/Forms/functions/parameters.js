import {parameteres2Array} from './fields.js';

/**
*   Function to process form parameters to URL param=value&param2=value2
*   from this.props.parameters.formParameters
*   finalRedirectParameters :: array of redirect url parameters to filter redirect ej : ["id_pol","id_sin"]
*/
export function getUrlParameters(formParameters, forceRemoveArrayParameters, finalRedirectParameters) {

  //all parameters are initially added to formParameters so no need to add again
  //var parameters = this.props.parameters;

  var filterParameters = finalRedirectParameters !== undefined && finalRedirectParameters != null ? true : false;
  finalRedirectParameters = finalRedirectParameters !== undefined && finalRedirectParameters != null ? 
    finalRedirectParameters : [];

  var forceRemoveArrayParameters = forceRemoveArrayParameters !== undefined 
    ? forceRemoveArrayParameters 
    : false;

  var parameters = "";
  var formParametersArray = Object.keys(formParameters);

  if(formParametersArray.length > 0){

    for(var i=0;i<formParametersArray.length;i++){
      var formParameterValue = formParameters[formParametersArray[i]];
      //if value is null or is void '' don't add to array
      if(formParameterValue != null && formParameterValue != ''){
        //concat new parameters
        var formParameterKey = formParametersArray[i];
        //if has _ remove first character
        if(formParameterKey.charAt(0) == "_"){
          formParameterKey = formParameterKey.substr(1);
        }

        //if filter parameters and parameter is not in the array or url parameters continue
        if(filterParameters && finalRedirectParameters.indexOf(formParameterKey) == -1){
          continue;
        }
        
        //if is an array remove  this parameter from url
        if(forceRemoveArrayParameters && formParameterKey.indexOf("[") != -1){
          continue;
        }

        parameters += (parameters != ''?"&":"")+formParameterKey+"="
          +formParameters[formParametersArray[i]];
      }
    }
  }

  return parameters;

}

/**
 *  Function to process from URL : cie_gli=CIE5&id_per_ass_gli=11407167
 *  To object : 
 * {
 *    cie_gli : 'CIE5',
 *    id_per_ass_gli : '11407167'
 * }
 *  
 */
export function getParametersFromURL(url) {
  var parameters = {};
  var urlArray = url.split('&');
  for(var key in urlArray){
    var parameterArray = urlArray[key].split('=');
    parameters[parameterArray[0]] = parameterArray[1];
  }
  return parameters;
}

/**
 * Methode to process the diference between array and variable. This is necessary 
 * because sometimes a parameter can be more than one values. Forms multi contrats.
 * 
 * @param {*} url : Can be an array or a variable
 * @param {*} parameter : Parameter to modify
 */
function replaceUrlParameter(url,key,value) {
  //value is an array, process all array valus as urlss
  if(Array.isArray(value)){
    //is necessar to duplicate same url as many times as variables in this value
    var resultUrl = [];
    for(var i in value){
      for(var j in url){
        resultUrl.push(url[j].replace(key,value[i]))
      }
    }
    url = resultUrl;
  }
  else {
    //if value is not an url just replace values
    for(var index in url){
      url[index] = url[index].replace(key,value);
    }
  }
  return url;
}

/**
* Function to process url that have parameters like  /_id_pol/,
* From formParameters
*/
export function processUrlParameters(url,formParameters) {

  console.log("processUrlParameters :: before :: (url,formParameters)",url,formParameters);

  var resultUrl = [url];
  for(var key in formParameters ){
    if(key != "" &&  formParameters[key] != null){
      resultUrl = replaceUrlParameter(resultUrl,key,formParameters[key]);
    }
  }

  console.log("processUrlParameters :: after (resultUrl)",resultUrl);
  
  return resultUrl;
}


/**
 * Function that read content field, to extract parameters from field values. When field is url or link.
 * @param {*} field 
 */
export function getParametersFromContentField(content) {
  
  if(content.routes_parameters !== undefined && content.routes_parameters != null && content.routes_parameters.length > 0){
    var parameters = [];
    for(var key in content.routes_parameters){    
      parameters.push(content.routes_parameters[key].identifier);
    }
    return parameters;
  }
  return [];
}

/**
 * Join multiple array of urls, example param1=value&param2=value2  +  param3=value
 * Add & when necessary
 * @param {*} arrayUrls 
 */
export function joinUrls(arrayUrls) {

  //remove empty values 
  arrayUrls = arrayUrls.filter(function (el) { return el != null && el !== '' });

  return arrayUrls.join('&');
}

/**
  *   Clean boby wihout parameters, and check all paremters are defined.
  *   Ej : WS_BOBY?param1=_id1&param2=_id2
  *   Returns : 
  *    {
  *     boby : WS_BOBY,
  *     bobyParameters : {
  *       id1 : '',
  *       id2 : ''
  *     }
  *   }
  */
 export function processBoby(boby,formParametersUrl) {

  if(boby.indexOf('?') != -1){
    //if has parameters
    var bobyArray = boby.split('?');
    var bobyParameters = {};
    
    //get values with _param1, remove the _ and store into object
    var objectUrl = parameteres2Array(bobyArray[1]);

    var formParametersObject = parameteres2Array(formParametersUrl);
    
    for(var key in objectUrl){
      var parameter = objectUrl[key].replace("_",'');
      //if no exist into form parameters url add it
      if(formParametersObject[parameter] === undefined){
        bobyParameters[parameter] = '';
      }
    }

    //if no keys return null
    bobyParameters = Object.keys(bobyParameters).length > 0 ? 
      bobyParameters : null;

    return {
      boby : bobyArray[0],
      bobyParameters : bobyParameters
    }
  }

  return {
    boby : boby,
    bobyParameters : null
  }
}

/**
   * Check if any of parameters has changed into the form. If has changed update and return object {hasChanged, parameters}
   * @param {*} parameters parameters used to check
   * @param {*} values object that contains all form values info.
   */
  export function updateParametersWithValues(parameters,values) {
    var hasChanged = false;

    for(var key in parameters){
      if(values[key] !== undefined && values[key] !== null) {
        //if key exists in values
        if(values[key] != parameters[key]){
          parameters[key] = values[key];
          hasChanged = true;
        }
      }
      else {
        //if values not defined, reset parameter
        if(parameters[key] !== ''){
          parameters[key] = '';
          hasChanged = true;
        }
      }
    }

    return {
      hasChanged : hasChanged,
      parameters : parameters
    }
  }

  /**
   * Check if object is empty.
   * Ej : 
   * {
   *    param1 : '',
   *    param2 : 'dsf'
   * }
   * return true, because one paremeter is empty
   * @param {} parameters 
   */
  export function hasEmptyParameters(parameters){
    for(var key in parameters){
      if(parameters[key] === ''){
        return true;
      }
    }
    return false
  }

/**
 *  Easy funtion to check if variable is definied or not
 */
export function isDefined(field) {
  if(field !== undefined && field != null && field !== ''){
    return true;
  }
  return false;
}