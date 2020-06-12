import React, { Component } from 'react';
import {connect} from 'react-redux';

import axios from 'axios';
import moment from 'moment';

import {
  parameteres2Array,
  getUrlParameters,
} from './../../functions';

import {
  initParametersState,
  checkParameters,
  loadProcedures,
  initProceduresIteration
} from './../actions'

import FormParametersIterator from './../FormParametersIterator';
import FormProceduresIterator from './../FormProceduresIterator';

var jp = require('jsonpath');

class FormButtonRedux extends Component {

    constructor(props)
    {
        super(props);

        const parametersObject = parameteres2Array(props.parametersObject);

        this.state = {

            elementObject : props.elementObject,
            parameters : parametersObject,
        };

        this.props.initParametersState(parametersObject);
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

    handleSubmit(e) {
      e.preventDefault();

      const loaded = this.props.parameters.formParametersLoaded;

      //if not yet loaded not possible to submit
      if(!loaded)
        return;

      //start with the process
      ////console.log("this.props.form.procedures : ",this.props.form);
      if(this.props.form.procedures.length > 0){
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

      //TODO redirect to _url parameter

      var parameters = this.props.parameters.formParameters;

      for(var key in parameters){
        if(key == "_redirectUrl") {
          window.location.href = parameters[key];
          return;
        }
      }

      if(this.props.finalRedirectUrl != ""){
        window.location.href = this.props.finalRedirectUrl+"?"+
          getUrlParameters(
            this.props.parameters.formParameters,
            true
          );
      }
      else {
        this.props.onFormFinished(this.props.parameters.formParameters);
      }
    }

    render() {

        const loaded = this.props.parameters.formParametersLoaded;

        const title = this.props.field.fields[0].value[LOCALE];
        const icon = this.props.field.fields[2].value[LOCALE];
        const buttonClass = this.props.field.settings['buttonClass'];

        return (
          <div 
              className={"form-button box-button-container-a "+(!loaded ? 'loading' : '')}
              onClick={this.handleSubmit.bind(this)}
            >

            <FormParametersIterator />
            <FormProceduresIterator
              values={this.state.values}
              onFinish={this.handleFinish.bind(this)}
              version={'2'}
            />

            <div className={
                "box-button-root box-button-container "+
                (!loaded?'disabled':'')+
                (buttonClass ? ' '+buttonClass : '')
              }>
              <div className="wrap-box-button">
                <div className="image-container">
                  <div className="wrap-icon"><i className={icon}></i></div>
                </div>
                <div class="label-container">
                  <div>
                    <p>{title}</p>
                  </div>
                </div>
              </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(FormButtonRedux);
