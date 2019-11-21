import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';
import moment from 'moment';

import {
  getArrayPosition,
  setupJsonResult,
  processJsonRoot,
  getFieldComponent,
  processObjectValue,
  processObject,
  validateField,
  processResponseParameters,
  parameteres2Array,
  isVisible
} from './form/actions/';

export default class ElementForm extends Component {

    constructor(props)
    {
        super(props);

        const field = props.field ? JSON.parse(atob(props.field)) : '';
        const elementObject = props.elementObject ? JSON.parse(atob(props.elementObject)) : null;

        const parametersObject = parameteres2Array(props.parameters);

        this.state = {
            field : field,
            elementObject : elementObject,
            values : this.initValues(elementObject),
            procedures : [],
            variables : [], //system variables with all data processed
            loading : true,

            currentProcedureIndex : 0,
            currentListIndex : 0,
            jsonResult : {},
            stepsToProcess : false, //variable to know if there is previous steps that need submit
            processing : false,
            complete : false,
            errors : {},
            parameters : parametersObject,

            //variables to process form iterator
            formIterator : 0,
            formParameters : this.initFormParameters(parametersObject),
            formParametersLoaded : false

        };

        this.handleOnChange = this.handleOnChange.bind(this);

        this.loadProcedures();
    }



    initFormParameters(parameters) {
      var formParameters = {};
      for(var key in parameters){
        formParameters['_'+key] = parameters[key];
      }
      return formParameters;
    }

    initValues(elementObject) {
      //console.log("initValues => ",elementObject);

      var values = {};

      for(var key in elementObject.fields){
        var field = elementObject.fields[key];

        //TODO process different values depending of type ?
        values[field.identifier] = '';

      }

      return values;
    }

    getElementObjectField(identifier){
      const {fields} = this.state.elementObject;

      for(var key in fields) {
        if(fields[key].identifier == identifier){
          return fields[key];
        }
      }
      return null;
    }

    handleOnChange(field) {

      console.log("ElementForm :: handleOnChange",field);

      const {values} = this.state;

      values[field.name] = field.value;

      var self = this;

      this.setState({
        values : values
      },function(){
        self.validateFieldChange(
          self.getElementObjectField(field.name)
        )
      });
    }

    /**
    *  Iterate all params of all procedures of type SYSTEM, to see if any params is needed.
    *  If any need iteration begin
    */
    checkParameters() {
      var formParameters = this.state.formParameters;

      for(var i=0;i<this.state.procedures.length;i++){
        var procedure = this.state.procedures[i];

        for(var key in procedure.PARAMS){
          if(key != "_time" && key != "_timestamp"){

            //add the parameter removing first _
            var parameterKey = key.substring(1);
            //if parameter defined, if not null
            formParameters[key] = this.state.parameters[parameterKey] !== undefined ?
              this.state.parameters[parameterKey] : null;
          }
        }
      }

      this.setState({
        formParameters : formParameters,
        formIterator : 0,
      },this.iterateParameters.bind(this));
    }

    initForm() {
      //start loading selectors
    }

    iterateParameters() {

      const {formIterator,formParameters,variables} = this.state;
      console.log("iterateParameters :: Start iteration :: ",formIterator,variables);

      var formParametersArray = Object.keys(variables);
      //console.log("iterateParameters :: formParameters => ",formParameters);
      console.log("iterateParameters :: formParametersArray => ",formParametersArray);

      //if no parameters
      if(formParametersArray.length == 0){
        this.setState({
          formParametersLoaded : true
        },this.initForm.bind(this));
        return; //nothing to do
      }

      //if is the end
      if(formIterator == formParametersArray.length){
        this.setState({
          formParametersLoaded : true
        },this.initForm.bind(this));
        return; // we are at the end
      }

      //iterate
      var key = formParametersArray[formIterator];
      console.log("iterateParameters :: ",formParameters,formIterator,key);

      if(formParameters['_'+key] != null){
        //already set go to next
        this.setState({
          formIterator : formIterator + 1,
          formParametersLoaded : false
        },this.iterateParameters.bind(this));
      }
      else {
        //ask for this variable
        var self = this;
        var variable = variables[key];

        //ask boby
        axios.get('/architect/elements/select/data/'+variable.BOBY+"?"+this.getUrlParameters())
          .then(function(response) {
            if(response.status == 200 && response.data.data !== undefined){

                for(var index in response.data.data ){
                  response.data.data[index]['text'] = response.data.data[index]['name'];
                }

                if(response.data.data.length == 1){
                  //not necessary to process parameter take the result
                  formParameters['_'+key] = response.data.data[0].value;

                  //set new value and got to next
                  self.setState({
                    formParameters : formParameters,
                    formIterator : formIterator + 1,
                  },self.iterateParameters.bind(self));

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
              							self.setState({
                              formParameters : formParameters,
                              formIterator : formIterator + 1,
                            },self.iterateParameters.bind(self));
              					}
              					else {
              						//show error
                          toastr.error('Le paramètre est nécessaire.');
                          //iterate again
                          return self.iterateParameters();
              					}
              		    }
              		});
                }

            }
          })
          .catch(function (error) {
            console.error(error);
          });

      }
    }

    /**
    * First api call to load procedures info.
    */
    loadProcedures() {

      var self = this;

      axios.get('/architect/elements/procedures/'+this.state.elementObject.model_identifier)
        .then(function(response) {
          if(response.status == 200 && response.data.data !== undefined){
            self.setState({
              procedures : response.data.data.procedures,
              variables : response.data.data.variables,
              loading : false
            },self.checkParameters.bind(self));



          }
        })
        .catch(function(error){
          console.error(error);
        });
    }


    getUrlParameters() {

      var parameters = this.props.parameters;
      var formParametersArray = Object.keys(this.state.formParameters);

      if(formParametersArray.length > 0){

        for(var i=0;i<formParametersArray.length;i++){
          if(this.state.formParameters[formParametersArray[i]] != null){
            //concat new parameters
            var formParameterKey = formParametersArray[i];
            //if has _ remove first character
            if(formParameterKey.charAt(0) == "_"){
              formParameterKey = formParameterKey.substr(1);
            }

            parameters += (parameters != ''?"&":"")+formParameterKey+"="
              +this.state.formParameters[formParametersArray[i]];
          }
        }

      }

      return parameters;

    }


    renderItems() {

      if(this.state.elementObject.fields === undefined || this.state.elementObject.fields == null){
        return null;
      }

      var fields = [];

      for(var key in this.state.elementObject.fields) {
        var field = this.state.elementObject.fields[key];
        const FieldComponent = getFieldComponent(field.type);

        //check visibilitiy
        const visible = isVisible(field,this.state.formParameters,this.state.values);

        //console.log("is visible ==> "+field.name,field,visible);

        if(visible)
          fields.push(<FieldComponent
              key={key}
              field={field}
              value={this.state.values[field.identifier]}
              error={this.state.errors[field.identifier] !== undefined ? true : false}
              onFieldChange={this.handleOnChange}
              parameters={this.getUrlParameters()}
              values={this.state.values}
            />);

      }

      return fields;

    }

    handleSubmit(e) {
      e.preventDefault();

      //console.log("handleSubmit");

      const hasErrors = this.validateFields();

      if(hasErrors){
        toastr.error('Vous devez remplir tous les champs obligatoires.');
        console.log("handleSubmit :: Form has errors");
        return;
      }

      //start with the process
      if(this.state.procedures.length > 0){

        //start processing
        var self = this;

        this.setState({
          currentProcedureIndex : 0,
          jsonResult : {},
          processing : true,
          complete : false
        },function(){
          //check if necessary to fill jsonResult and continue
          self.checkJsonResult(self.processProcedure.bind(self));
        });

      }
      else {
        console.error("No procedures to process");
      }
    }

    checkJsonResult(callback) {

      const {procedures,currentProcedureIndex, stepsToProcess} = this.state;
      const procedure = procedures[currentProcedureIndex];

      if(!stepsToProcess && procedure.SERVICE !== undefined && procedure.SERVICE.METHODE == "PUT"){
        //set the jsonResult with a get
        this.getJsonResultBeforePut(procedure,callback);
      }
      else {
        callback();
      }
    }

    /**
    * Process procedure with current step id
    */
    processProcedure() {

        const {procedures,currentProcedureIndex, values, currentListIndex, stepsToProcess} = this.state;
        let {jsonResult} = this.state;

        const procedure = procedures[currentProcedureIndex];

        const isRequired = procedure.OBL == "Y" ? true : false;
        const isConfigurable = procedure.CONF == "Y" ? true : false;
        const isRepetable = procedure.REP == "Y" ? true : false;

        console.log("processProcedure :: ",currentProcedureIndex,procedure, jsonResult);
        var self = this;

        if(!isRepetable){
          //normal procedure
          console.log("Process standard iteration => ",currentProcedureIndex, jsonResult);

          jsonResult = this.processStandardProcedure(currentProcedureIndex,procedure,jsonResult,values);

          //always pass to next procedure

          //if has values
              this.submitStandardProcedure(currentProcedureIndex,procedure,jsonResult);
          //else
              //if it is required
                //TODO error
              //else
                //TODO pass next procedure
        }
        else if(isConfigurable && isRepetable){
          //internal array, check for values list

          console.log("Process list iteration => ",currentProcedureIndex, currentListIndex, values[procedure.OBJID],jsonResult);

          //check for value with id => procedure->OBJID

          if(values[procedure.OBJID] !== undefined && values[procedure.OBJID].length > 0){
            //there is values

            //check what is the current value index

            //process every values
            jsonResult = this.processListProcedure (
              currentProcedureIndex,
              procedure,
              values[procedure.OBJID][currentListIndex],
              jsonResult
            );

            //go to next value of this procedure of submit as standard procedure
            this.submitListProcedure(
              currentProcedureIndex,
              procedure,jsonResult,currentListIndex,
              values[procedure.OBJID]
            );

          }
          else {
            //there is no data

            if(isRequired){
              //this is needed
              console.error("No list values and this procedure is required "+procedure.OBJID);
            }
            else {
              //if there is data to process, submit process
              if(this.state.stepsToProcess){
                this.submitStandardProcedure(currentProcedureIndex,procedure,jsonResult);
              }
              else {
                //skip procedure
                this.skipProcedure(currentProcedureIndex,procedure,jsonResult);
              }
            }
          }

        }

        //after procedure is done we obtain a jsonResult, with this jsonResult decide what to Do.
    }

    skipProcedure(currentProcedureIndex, procedures, jsonResult) {
      var nextProcedure = null;
      if( currentProcedureIndex + 1 < procedures.length){
        //is the last one
        nextProcedure = procedures[currentProcedureIndex+1];
      }
      var self = this;

      if(nextProcedure != null){
        this.setState({
          currentProcedureIndex : currentProcedureIndex + 1 ,
          currentListIndex : 0,
          jsonResult : jsonResult,
          stepsToProcess : false,
          processing : true,
          complete : false
        },function(){
            self.processProcedure();
        });
      }
      else {
        //we are at then end, complete
        this.finish();

      }
    }

    finish() {

      //finish!
      this.setState({
        currentProcedureIndex : 0,
        currentListIndex : 0,
        stepsToProcess : false,
        jsonResult : {},
        processing : false,
        complete : true
      });

      toastr.success('Formulaire traité avec succès');

      this.finalRedirect();
    }


    processStandardProcedure(currentIndex,procedure,jsonResult,values) {

      console.log("processStandardProcedure :: ",currentIndex,jsonResult);

      //if conf == Y && repetable == N
        //if OBL == N , check for values, if not values, don't process de procedure
        //check for values
        //normal procedure
          //after procedure processed
            //check what to do
              //or next or finish

        const {arrayPosition, jsonRoot} = processJsonRoot(procedure.JSONP, jsonResult);
        console.log("processObject :: arrayPosition : ",arrayPosition);

        for(var j in procedure.OBJECTS) {
          var object = procedure.OBJECTS[j];

          //process the object modifing the jsonResult
          jsonResult = processObject(object,jsonResult,jsonRoot, arrayPosition,
            values, this.state.formParameters);
        }

        return jsonResult;

    }

    submitStandardProcedure(currentProcedureIndex,procedure,jsonResult) {

      const {procedures} = this.state;
      var self = this;

      var nextProcedure = null;
      if( currentProcedureIndex + 1 < procedures.length){
        //is the last one
        nextProcedure = procedures[currentProcedureIndex+1];
      }
      //console.log("nextProcedure => ",nextProcedure);

      //if no next procedure
      if(nextProcedure == null) {
        //process this procedure

        this.submitProcedure(procedure,jsonResult, function(response){

          self.finish();

        },function(){
          //error
          self.setState({
            currentProcedureIndex : 0,
            currentListIndex : 0,
            stepsToProcess : false,
            jsonResult : {},
            processing : false,
            complete : false
          });
        });
      }
      else if(nextProcedure.SERVICE.ID != procedure.SERVICE.ID ){
        //the service is different, process the procedure

        this.submitProcedure(procedure,jsonResult,function(response){

          //TODO process response
          console.log("processProcedure => ",procedure,response)

          //continue next step
          self.setState({
            currentProcedureIndex : currentProcedureIndex + 1 ,
            currentListIndex : 0,
            jsonResult : {},
            processing : true,
            stepsToProcess : false,
            complete : false
          },function(){
              self.processProcedure();
          });

        },function(){
          //error restart to begining
          self.setState({
            currentProcedureIndex : 0,
            currentListIndex : 0,
            stepsToProcess : false,
            jsonResult : {},
            processing : false,
            complete : false
          });
        });

      }
      else {
        //we have next procedure and is the same service, continue same json
        this.setState({
          currentProcedureIndex : currentProcedureIndex + 1 ,
          currentListIndex : 0,
          jsonResult : jsonResult,
          stepsToProcess : true,
          processing : true,
          complete : false
        },function(){
            self.processProcedure();
        });
      }

    }

    submitListProcedure(currentProcedureIndex,procedure,jsonResult,currentListIndex, listValues) {

      const {procedures} = this.state;
      var self = this;

      //if we there is more values process next
      if(currentListIndex + 1 < listValues.length){
        //go to next procedure
        this.setState({
          currentListIndex : currentListIndex + 1,
          jsonResult : jsonResult,
          processing : true,
          complete : false
        },function(){
            self.processProcedure();
        });
      }
      else {
        //process this as standard procedure
        this.submitStandardProcedure(currentProcedureIndex,procedure,jsonResult);
      }
    }

    /**
    *   values = current list position with values of this item
    */
    processListProcedure (currentIndex,procedure,values,jsonResult) {

        console.log("processListProcedure :: ",currentIndex, values, jsonResult);

        const {arrayPosition, jsonRoot} = processJsonRoot(procedure.JSONP, jsonResult);

        console.log("processListProcedure :: array position ",arrayPosition);

        for(var j in procedure.OBJECTS) {
          var object = procedure.OBJECTS[j];

          //process the object modifing the jsonResult
          jsonResult = processObject(object,jsonResult,jsonRoot, arrayPosition,values,
            this.state.formParameters);
        }

        console.log("processListProcedure :: after => ",currentIndex, values, jsonResult);

        return jsonResult;

    }

    /**
    * When procedure is repeatable, and configurable, then the data is an array.
    * So needs to be processed one POST per array item.
    */
    procedureIsArray(procedure) {
      if(procedure.CONF == 'Y' && procedure.REP == "Y" &&
        procedure.JSONP == '$.[]' ){
          return true;
      }
      return false;
    }

    /**
    * Process the procedure, with the service and the json
    * Returns info for next Step
    */
    submitProcedure(procedure, jsonResult, successCallback, errorCallback) {

      console.log("submitProcedure :: ",procedure, jsonResult);

      if(procedure.SERVICE === undefined){
        console.error("procedure not defined => ",procedure);
      }

      //process URL parameters
      var url = this.processUrlParameters(procedure.SERVICE.URL);

      var params = {
        method : procedure.SERVICE.METHODE,
        url : url,
        data : jsonResult,
        is_array : this.procedureIsArray(procedure)
      };

      self = this;

      axios.post('/architect/elements/form/process-service',params)
        .then(function(response) {
          //console.log("response => ",response);
          if(response.status == 200){

              self.setState({
                formParameters : processResponseParameters(
                    response.data.result,
                    procedure.SERVICE,
                    self.state.formParameters
                )
              },successCallback.bind(self,response));
          }
          else {
              toastr.error(response.data.message);
              errorCallback();
          }
        })
        .catch(function(error){
          console.error("error => ",error.message);
          if(error.response.data.message !== undefined){
            toastr.error(error.response.data.message);
          }
          else {
            toastr.error(error.message);
          }
          errorCallback();
        });

      return jsonResult;

    }

    /**
    *   Get json data before PUT, with a GET with the same parameters
    */
    getJsonResultBeforePut(procedure,callback) {

      //console.log("getJsonResultBeforePut :: ",procedure);

      if(procedure.SERVICE === undefined){
        console.error("procedure not defined => ",procedure);
      }

      //process URL parameters
      var url = this.processUrlParameters(procedure.SERVICE.URL);

      var params = {
        method : "GET",
        url : url,
        data : "",
        is_array : false
      };

      self = this;

      axios.post('/architect/elements/form/process-service',params)
        .then(function(response) {
          //console.log("response => ",response);
          //console.log("getJsonResultBeforePut :: response ",response);
          if(response.status == 200){
              //console.log("response => ",response);
              self.setState({
                jsonResult : response.data.result
              },callback)
          }
          else {
              toastr.error(response.data.message);
              callback();
          }
        })
        .catch(function(error){
          console.error("error => ",error.message);
          callback();
        });
    }

    /**
    * Function to process url that have parameters like  /_id_pol/,
    * From formParameters
    */
    processUrlParameters(url) {

      const {formParameters} = this.state;

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

    /**
    *   When field change
    */
    validateFieldChange(field) {

      //validation of this field not necessary
      if(field == null)
        return;

      const {errors,values} = this.state;

      console.log("validateFieldChange :: field ",field);

      var valid = validateField(field,values);

      if(!valid){
        errors[field.identifier] = true;
      }
      else {
        delete errors[field.identifier];
      }

      this.setState({
        errors : errors
      });
    }

    /**
    *   When submit is preseed
    */
    validateFields() {
        if(this.state.elementObject.fields === undefined || this.state.elementObject.fields == null){
          return {};
        }

        var fields = [];
        var errors = {};
        var hasErrors = false;

        for(var key in this.state.elementObject.fields) {
          var field = this.state.elementObject.fields[key];

            var valid = validateField(field,this.state.values);
            if(!valid)
              errors[field.identifier] = !valid;

            if(!hasErrors && !valid){
              hasErrors = true;
            }
        }

        this.setState({
          errors : errors
        });

        return hasErrors;
    }

    /**
    *  After all submits is necessary to redirect to url configured by the widget.
    *  The url comes from the field, and is necessary to add all route parameters, + modal parameters + response parameters
    */
    finalRedirect() {

      const {field} = this.state;
      var url = "";

      if(field.fields[1].value !== undefined && field.fields[1].value != null &&
        field.fields[1].value.content !== undefined &&
        field.fields[1].value.content.url !== undefined){
          url = field.fields[1].value.content.url;
      }

      if(url != ""){
        window.location.href = url+"?"+this.getUrlParameters();
      }

    }

    render() {
        return (
          <div className={"element-form-wrapper row "+(this.state.loading == true ? 'loading' : '')}>
            {
              !this.state.formParametersLoaded &&
              <div className="" style={{
                padding:40,
                textAlign : 'center'
              }}>
                En attente de paramètres
              </div>
            }
            {this.state.formParametersLoaded &&
                <form>

                  {this.renderItems()}

                  <div className="row element-form-row">
                    <div className="col-md-4"></div>
                    <div className="col-md-6 buttons">
                        <button
                          className="btn btn-primary right" type="submit"
                          onClick={this.handleSubmit.bind(this)}
                          disabled={this.state.processing}
                        >
                          <i className="fa fa-paper-plane"></i>Valider
                        </button>
                        {/*
                        <a className="btn btn-back left"><i className="fa fa-angle-left"></i> Retour</a>
                        */}
                    </div>
                  </div>

                </form>
            }
          </div>
        );
    }
}

if (document.getElementById('elementForm')) {

   document.querySelectorAll('[id=elementForm]').forEach(function(element){
       var field = element.getAttribute('field');
       var elementObject = element.getAttribute('elementObject');
       var parameters = element.getAttribute('parameters');

       ReactDOM.render(<ElementForm
           field={field}
           elementObject={elementObject}
           parameters={parameters}
         />, element);
   });
}
