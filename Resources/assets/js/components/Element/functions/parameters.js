
/*
*   Check on its settings if is required. By default if not settings set,
*   parameter is required.
*/
export function isRequired(parameter) {

  var settings = parameter.settings;

  if(settings !== undefined && settings != null &&
    settings['required'] !== undefined && settings['required'] != null){
    return settings['required'];
  }

  return true;

}

/*
*   Parameter type :
*     - filter : required from boby
*     - variable : cames from form variables. normally optinoal
*     - null : manual introduced
*/
export function getSettingsType(parameter) {

  var settings = parameter.settings;

  if(settings !== undefined && settings != null &&
    settings['type'] !== undefined && settings['type'] != null){
    return settings['type'];
  }
  return null;
}

/*
*   Icon from type.
*/
export function getTypeIcon(parameter) {

  var type = getSettingsType(parameter);

  switch (type) {
    case PARAMETERS.types[0]:
        return 'fas fa-filter';
    case PARAMETERS.types[1]:
        return 'fas fa-cog';
    default:
        return null;
  }
}

/*
*   Get required icon.
*/
export function getRequiredIcon(parameter) {

  const required = isRequired(parameter);

  switch (required) {
    case true:
        return 'fas fa-exclamation-circle';
    case false:
        return 'far fa-question-circle';
    default:
        return 'fas fa-exclamation-circle';
  }
}

/*
*   Check if parameter is valid.
*/
export function checkValidParameters(params) {

    if(params != null && params.length > 0){
        for(var key in params){

            var required = isRequired(params[key]);

            if(required && params[key].value == ""){
              return false;
            }
        }
    }

    return true;
}

/*
*
*/
/*
*   Set settings from PARAMETERS configuration.
*/
export function setSettings(parameter,type) {

  if(parameter.settings === undefined || parameter.settings == null){
    parameter.settings = {};
  }

  //necessary for all parameters added before changes
  for(var key in PARAMETERS.settings){
    if(parameter.settings[PARAMETERS.settings[key]] === undefined || parameter.settings[PARAMETERS.settings[key]] == null){
      if(PARAMETERS.settings[key] == "required"){

          //by default required must be set to true
          var required = true;

          if(type == PARAMETERS.types[1]){
            //if it is a variable by default is not required
            required = false;
          }

          parameter.settings[PARAMETERS.settings[key]] =  required;
      }
      else if(PARAMETERS.settings[key] == "type"){
          parameter.settings[PARAMETERS.settings[key]] =  type;
      }
      else {
          parameter.settings[PARAMETERS.settings[key]] =  null;
      }
    }
  }

  return parameter;

}
