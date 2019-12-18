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
* Function to process url that have parameters like  /_id_pol/,
* From formParameters
*/
export function processUrlParameters(url,formParameters) {

  var resultUrl = url;

  var urlArray = url.split('/');
  for(var i=0;i<urlArray.length;i++){
    if(urlArray[i].charAt(0) == "_"){
      //is a paramter
      //check for form parameters
      resultUrl = resultUrl.replace(urlArray[i],formParameters[urlArray[i]]);
    }
  }

  return resultUrl;
}
