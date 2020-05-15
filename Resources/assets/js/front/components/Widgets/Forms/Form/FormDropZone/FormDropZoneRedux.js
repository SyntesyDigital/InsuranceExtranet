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
  loadProcedures,
  initProceduresIteration,
} from './../actions'

import FormParametersIterator from './../FormParametersIterator';
import FormProceduresIterator from './../FormProceduresIterator';
import DropZoneField from './../../fields/DropZoneField';

var jp = require('jsonpath');

class FormDropZoneRedux extends Component {

    constructor(props)
    {
        super(props);

        const parametersObject = parameteres2Array(props.parametersObject);

        console.log("construct FormDropZoneRedux : (props) ",props);
        
        this.state = {
            elementObject : props.elementObject,
            values : this.initValues(props.elementObject),
            errors : {},
            parameters : parametersObject,
            done : false,
            processing : false
        };

        this.props.initParametersState(parametersObject);
        this.props.loadProcedures(props.modelId);
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

    componentDidUpdate(prevProps, prevState) {

    }

    handleSubmit(formId,e) {
      e.preventDefault();
      
      console.log("handleSubmit :: formId",formId);
      //const loaded = this.props.parameters.formParametersLoaded;

      //if not yet loaded not possible to submit
      /*
      if(!loaded)
        return;
      */

      //start with the process
      console.log("Submit form :: this.props.form.procedures : ",this.props.form);
      if(this.props.form.procedures.length > 0){
        var self = this;
         this.setState({
          processing : true
        },function(){
          self.props.initProceduresIteration();
        });
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

      toastr.success('Document envoyé avec succès');

      //TODO redirect to _url parameter
      
      this.props.onFormFinished();

      this.setState({
        done : true,
        processing : true
      });

    }

    handleOnChange(field) {

      //console.log("FormComponent :: handleOnChange",field);

      const {values} = this.state;

      values[field.name] = field.value;

      var self = this;

      this.setState({
        values : values
      });
    }

    renderField(field,key) {
        
      console.log("renderField (field,key)",field,key);
      
      return <DropZoneField
        key={key}
        field={field}
        label={this.props.label}
        value={this.state.values[field.identifier]}
        error={this.state.errors[field.identifier] !== undefined ? true : false}
        onFieldChange={this.handleOnChange.bind(this)}
        //onSubmit={this.handleSubmit.bind(this)}
        parameters={getUrlParameters(
          this.props.parameters.formParameters
        )}
        values={this.state.values}
        done={this.state.done}
        processing={this.state.processing}
      />
    }



    renderItems() {

      if(this.state.elementObject.fields === undefined || this.state.elementObject.fields == null){
        console.error("FormDropZoneRedux : objets not defined into missing documents procedure.");
        return null;
      }

      for(var key in this.state.elementObject.fields) {

        var field = this.state.elementObject.fields[key];
        
        if(field.type == "file"){
          return this.renderField(field,key);
        }
      }

      console.error("FormDropZoneRedux : non object of type file defined");

    }

    render() {

        return (
          <span>
            <FormProceduresIterator
              values={this.state.values}
              onFinish={this.handleFinish.bind(this)}
              version={this.state.elementObject.type == "form" ? "1" : "2"}
            />
            <form id={this.props.id} onSubmit={this.handleSubmit.bind(this,this.props.id)} >
              {this.renderItems()}
            </form>
          </span>
        )
        
        /*
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
        */
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
      loadProcedures : (modelIdentifier) => {
          return dispatch(loadProcedures(modelIdentifier))
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormDropZoneRedux);
