import {
  INIT_PARAMETERS_STATE,
  CHECK_PARAMETERS,
  INIT_ITERATION,
  PARAMETERS_LOADED,
  PARAMETER_UPDATE,
  PARAMETER_UPDATE_ERROR,
  PARAMETERS_NEXT_ITERATION,
  PARAMETER_PARENT_UPDATE
} from "../constants/";

import {
  getUrlParameters
} from '../../functions';

export function initParametersState(parameters) {

  var formParameters = {};
  for(var key in parameters){
    formParameters['_'+key] = parameters[key];
  }

  return {
    type: INIT_PARAMETERS_STATE,
    payload : {
      formParameters : formParameters
    }
  }
};


/**
*  Iterate all params of all procedures of type SYSTEM, to see if any params is needed.
*  If any need iteration begin
*/
export function checkParameters(formParameters,procedures,parameters) {

  //console.log("checkParameters :: ",formParameters,procedures,parameters);

  for(var i=0;i<procedures.length;i++){
    var procedure = procedures[i];

    for(var key in procedure.PARAMS){
      if(key != "_time" && key != "_timestamp"){

        //add the parameter removing first _
        var parameterKey = key.substring(1);
        //if parameter defined, if not null
        formParameters[key] = parameters[parameterKey] !== undefined ?
          parameters[parameterKey] : null;
      }
    }
  }

  return {type : CHECK_PARAMETERS, payload : formParameters};
}

export function initParametersIteration() {
  return {type : INIT_ITERATION};
}

export function iterateParameters(formIterator,formParameters,variables) {

  return (dispatch) => {

    //const {formIterator,formParameters,variables} = this.state;
    //console.log("iterateParameters :: Start iteration :: ",formIterator,formParameters,variables);

    var formParametersArray = Object.keys(variables);
    ////console.log("iterateParameters :: formParameters => ",formParameters);
    //console.log("iterateParameters :: formParametersArray => ",formParametersArray);

    //if no parameters
    if(formParametersArray.length == 0){
      return dispatch({type : PARAMETERS_LOADED});

    }

    //if is the end
    if(formIterator == formParametersArray.length){
      return dispatch({type : PARAMETERS_LOADED});
    }

    //iterate
    var key = formParametersArray[formIterator];
    ////console.log("iterateParameters :: ",formParameters,formIterator,key);

    if(formParameters['_'+key] != null){
      //already set go to next
      dispatch({type : PARAMETERS_NEXT_ITERATION});

    }
    else {
      //ask for this variable
      var self = this;
      var variable = variables[key];

      dispatch(setParameterFromBoby(variable,key, formParameters));

    }
  }
}

export function setParameterFromBoby(variable,key, formParameters) {

  return (dispatch) => {
    //ask boby
    axios.get('/architect/elements/select/data/'+variable.BOBY+"?"+getUrlParameters(formParameters))
      .then(function(response) {
        if(response.status == 200 && response.data.data !== undefined){

            for(var index in response.data.data ){
              response.data.data[index]['text'] = response.data.data[index]['name'];
            }

            if(response.data.data.length == 0){
              //no data, and data is necessary
              toastr.error('Aucune donnée trouvée pour le paramètre.');
              return dispatch({type:PARAMETER_UPDATE_ERROR});
            }
            else if(response.data.data.length == 1){
              //not necessary to process parameter take the result
              formParameters['_'+key] = response.data.data[0].value;

              //set new value and got to next
              dispatch({type:PARAMETER_UPDATE,payload : formParameters});
            }
            else {
              //ask for the result
              bootbox.prompt({
                  title: variable.MESSAGE,
                  inputType: 'select',
                  closeButton : false,
                  buttons: {
                      confirm: {
                          label: 'Envoyer',
                          className: 'btn-primary'
                      },
                      cancel : {
                          label: 'Retour',
                          className: 'btn-default'
                      }
                  },
                  inputOptions: response.data.data,
                  callback: function (result) {
                    if(result != null && result != ''){
                        //post sessions
                        formParameters['_'+key] = result;

                        //set new value and got to next
                        dispatch({type:PARAMETER_UPDATE,payload : formParameters});

                    }
                    else {
                      //show error
                      toastr.error('Le paramètre est nécessaire.');
                      //go back in history
                      window.history.back();
                    }
                  }
              });
            }

        }
      })
      .catch(function (error) {
        console.error(error);
        dispatch({type:PARAMETER_UPDATE_ERROR});
      });
    }
}

/**
 * Check all parent parameters and update form parameters. 
 * Used to update fields from a preload form. 
 * @param {*} parentParameters 
 * @param {*} formParameters 
 */
export function updateParametersFromParent(parentParameters,formParameters) {
 
  if(parentParameters != null && parentParameters !== undefined){
    for(var key in parentParameters){
      formParameters[key] = parentParameters[key];
    }
  }

  return {type : PARAMETER_PARENT_UPDATE, payload : formParameters};

}