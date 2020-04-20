/**
*   Function to process form parameters to URL param=value&param2=value2
*   from this.props.parameters.formParameters
*/
export function getUrlParameters(formParameters) {

  //all parameters are initially added to formParameters so no need to add again
  //var parameters = this.props.parameters;

  var parameters = "";
  var formParametersArray = Object.keys(formParameters);

  if(formParametersArray.length > 0){

    for(var i=0;i<formParametersArray.length;i++){
      if(formParameters[formParametersArray[i]] != null){
        //concat new parameters
        var formParameterKey = formParametersArray[i];
        //if has _ remove first character
        if(formParameterKey.charAt(0) == "_"){
          formParameterKey = formParameterKey.substr(1);
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
