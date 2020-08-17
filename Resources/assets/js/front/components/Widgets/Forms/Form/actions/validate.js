import {
  VALIDATION_START,
  VALIDATION_DONE,
  VALIDATION_SKIP,
  VALIDATION_ERROR
} from "../constants/";

import {
  processUrlParameters,
} from "../../functions";

export function startValidation() {
  return { type: VALIDATION_START }
}

export function validateForm(validationWS,formParameters,values) {

  console.log("validateForm :: (validationWS,formParameters,values) ",validationWS,formParameters,values);

  return (dispatch) => {

    if(validationWS === undefined || validationWS == null || validationWS == '') {
      return dispatch({type : VALIDATION_SKIP});
    }

    
    //process URL parameters
    var url = processUrlParameters(validationWS,formParameters);

    var params = {
      method : "GET",
      url : url,
      data : values,
      is_array : false,
      is_old_url: null
    };

    self = this;

    axios.post(ASSETS+'architect/elements/form/process-service',params)
      .then(function(response) {
        console.log("validate.js :: response : ",response);
        
        if(response.status == 200){
            if(response.data.result.data !== undefined && response.data.result.data.length > 0){
              var verif = response.data.result.data[0].verif;
              var comment = response.data.result.data[0].comment;

              verif = verif !== undefined ? verif : 'KO';
              comment = comment !== undefined ? comment : 'Validation indéfinie';
              if(verif == "OK"){
                console.log("validation success :: ",comment);
                return dispatch({type : VALIDATION_DONE,payload : comment});  
              }
              else {
                toastr.error(comment,{
                  closeButton: true,
                });
                return dispatch({type : VALIDATION_ERROR,payload : comment});  
              }
            }
            else {
              console.error('validation error : data has no values');
              toastr.error('Validation indéfinie');
              return dispatch({type : VALIDATION_ERROR,payload : 'Validation indéfinie'});
            }
            
        }
        else {
            toastr.error(response.data.message);
            console.error('validation error : WS is undefined');
            return dispatch({type : VALIDATION_ERROR,payload : response.data.message});
        }
      })
      .catch(function(error){
        return dispatch({
            type : VALIDATION_ERROR,
            payload : ''
        });
      });

  }
}
