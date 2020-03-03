import React, { Component } from 'react';
import {connect} from 'react-redux';

import axios from 'axios';
import moment from 'moment';

import {
  getFieldComponent,
  validateField,
  parameteres2Array,
  isVisible,
  getUrlParameters,
  getValueFromObject
} from './functions/';

import {
  initParametersState,
  checkParameters,
  loadProcedures,
  initProceduresIteration
} from './actions'

import FormParametersIterator from './FormV1/FormParametersIterator';
import FormProceduresIterator from './FormV1/FormProceduresIterator';

var jp = require('jsonpath');

class FormComponent extends Component {

    constructor(props)
    {
        super(props);

        const parametersObject = parameteres2Array(props.parametersObject);

        this.state = {

            elementObject : props.elementObject,
            values : this.initValues(props.elementObject),
            errors : {},
            parameters : parametersObject,
        };

        this.props.initParametersState(parametersObject);

        this.handleOnChange = this.handleOnChange.bind(this);

        this.props.loadProcedures(props.elementObject.model_identifier);
    }

    componentDidUpdate(prevProps, prevState) {

      ////console.log("FormParametersIterator :: start interate",this.props.parameters.checked);

      //when procedures are loaded
      if(prevProps.form.loading && !this.props.form.loading) {
        //console.log("FormRedux :: checkParameters",this.props.parameters.formParameters);

        //check parameters with a modal
        this.props.checkParameters(
          this.props.parameters.formParameters,
          this.props.form.procedures,
          this.state.parameters
        );

      }

    }

    initValues(elementObject) {
      //console.log("initValues => ",elementObject);

      var values = {};

      for(var key in elementObject.fields){
        var field = elementObject.fields[key];

        //labels are not processed
        if(field.type != 'label'){
          //TODO process different values depending of type ?
          
          if(field.settings !== undefined && field.settings.defaultValue !== undefined &&
            field.settings.defaultValue !== null && field.settings.defaultValue !== ''){
              values[field.identifier] = field.settings.defaultValue;
          }
          else {
              values[field.identifier] = '';
          }
        }

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

      //console.log("FormComponent :: handleOnChange",field);

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


    renderItems() {

      if(this.state.elementObject.fields === undefined || this.state.elementObject.fields == null){
        return null;
      }

      var fields = [];

      for(var key in this.state.elementObject.fields) {
        var field = this.state.elementObject.fields[key];
        
        const FieldComponent = getFieldComponent(field.type);

        //check visibilitiy
        const visible = isVisible(field,this.props.parameters.formParameters,this.state.values);

        ////console.log("is visible ==> "+field.name,field,visible);

        if(visible)
          fields.push(<FieldComponent
              key={key}
              field={field}
              value={this.state.values[field.identifier]}
              error={this.state.errors[field.identifier] !== undefined ? true : false}
              onFieldChange={this.handleOnChange}
              parameters={getUrlParameters(
                this.props.parameters.formParameters
              )}
              values={this.state.values}
            />);

      }

      return fields;

    }

    handleSubmit(e) {
      e.preventDefault();

      ////console.log("handleSubmit");

      const hasErrors = this.validateFields();

      if(hasErrors){
        toastr.error('Vous devez remplir tous les champs obligatoires.');
        //console.log("handleSubmit :: Form has errors");
        return;
      }

      //start with the process
      ////console.log("this.props.form.procedures : ",this.props.form);
      if(this.props.form.procedures.length > 0){

        //start processing
        var self = this;

        this.props.initProceduresIteration();

      }
      else {
        console.error("No procedures to process");
      }
    }

    /**
    *  After all submits is necessary to redirect to url configured by the widget.
    *  The url comes from the field, and is necessary to add all route parameters, + modal parameters + response parameters
    */
    handleFinish() {

      toastr.success('Formulaire traité avec succès');

      if(this.props.finalRedirectUrl != ""){
        window.location.href = this.props.finalRedirectUrl+"?"+
          getUrlParameters(this.props.parameters.formParameters);
      }
      else {
        this.props.onFormFinished();
      }

    }

    /**
    *   When field change
    */
    validateFieldChange(field) {

      //validation of this field not necessary
      if(field == null)
        return;

      const {errors,values} = this.state;

      //console.log("validateFieldChange :: field ",field);

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
            var visible = isVisible(field,this.props.parameters.formParameters,this.state.values);
            
            //if the field is not visible, is always valid
            if(!visible){
              valid = true;
            }

            //console.log("validateField :: (field,this.state.values, valid, visible )",field,this.state.values,valid, visible);

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



    render() {

        const loaded = this.props.parameters.formParametersLoaded;

        return (
          <div className={"form-component element-form-wrapper row "+(this.props.form.loading == true ? 'loading' : '')}>

            <FormParametersIterator />
            <FormProceduresIterator
              values={this.state.values}
              onFinish={this.handleFinish.bind(this)}
            />

            {
              !loaded &&
              <div className="" style={{
                padding:40,
                textAlign : 'center'
              }}>
                En cours de chargement
              </div>
            }
            {loaded &&
                <form>

                  {this.renderItems()}

                  <div className="row element-form-row">
                    <div className="col-md-4"></div>
                    <div className="col-md-6 buttons">
                        <button
                          className="btn btn-primary right" type="submit"
                          onClick={this.handleSubmit.bind(this)}
                          disabled={this.props.form.processing}
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

const mapStateToProps = state => {
    return {
        form: state.form,
        parameters : state.parameters
    }
}

const mapDispatchToProps = dispatch => {
    return {
      initProceduresIteration : () => {
          return dispatch(initProceduresIteration());
      },
      initParametersState: (payload) => {
          return dispatch(initParametersState(payload));
      },
      checkParameters : (formParameters,procedures,parameters) => {
          return dispatch(checkParameters(formParameters,procedures,parameters))
      },
      loadProcedures : (modelIdentifier) => {
          return dispatch(loadProcedures(modelIdentifier))
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormComponent);
