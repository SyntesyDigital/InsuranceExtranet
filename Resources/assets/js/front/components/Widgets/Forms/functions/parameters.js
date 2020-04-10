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
* Function to process url that have parameters like  /_id_pol/,
* From formParameters
*/
export function processUrlParameters(url,formParameters) {

  var resultUrl = "";

  for(var key in formParameters) {
    if(key == "" || formParameters[key] == null){
      continue;
    }

    if(Array.isArray(formParameters[key])){
      resultUrl = [];
      for(var index in formParameters[key]){
        resultUrl.push(url.replace(key,formParameters[key][index]));
      }
    }
    else {
      resultUrl = url.replace(key,formParameters[key]);
    }
  }

  console.log("processUrlParameters (url,formParameters => resultUrl)",url,formParameters,resultUrl);
  
  return resultUrl;
}
