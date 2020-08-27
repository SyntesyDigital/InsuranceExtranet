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

    if(url === undefined)
        return parameters;

    var urlArray = url.split('&');
    for(var key in urlArray){
      var parameterArray = urlArray[key].split('=');
      parameters[parameterArray[0]] = parameterArray[1];
    }
    return parameters;
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
  

  