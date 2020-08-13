import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import api from './../../../../../back/api';

import axios from 'axios';
import moment from 'moment';

import ImageField from './../../ElementCard/fields/ImageField';
import IconField from './../../ElementCard/fields/IconField';
import Label from './../../ElementCard/fields/Label';

import LayoutParser from './../../ElementCard/LayoutParser';

import {
  getFieldComponent,
  validateField,
  parameteres2Array,
  isVisible,
  getUrlParameters,
  getValueFromObject
} from '../functions';

import {
  initParametersState,
  checkParameters,
  loadProcedures,
  initProceduresIteration,
  updateParametersFromParent
} from './actions'

import FormParametersIterator from './FormParametersIterator';
import FormProceduresIterator from './FormProceduresIterator';
import FormPreload from './FormPreload';

var jp = require('jsonpath');

class FormComponent extends Component {

    constructor(props)
    {
        super(props);

        var parametersObject = parameteres2Array(props.parametersObject);

        //if parent parameters defined update
        parametersObject = this.updateFormParentParemeters(props.parentFormParameters,parametersObject);

        this.state = {
            elementObject : props.elementObject,
            values : this.initValues(props.elementObject),
            errors : {},
            parameters : parametersObject,

            template : props.template ? props.template : null,
            layout : null,
            templateLoaded : props.template ? false : true,
            sendingPreload : false,
            preloadFinish : false
        };

        this.props.initParametersState(parametersObject);

        this.handleOnChange = this.handleOnChange.bind(this);

        this.props.loadProcedures(props.elementObject.model_identifier);
    }

    componentDidMount() {
        if(this.state.template){
            this.loadTemplate(this.state.template);
        }
    }

    // ----------------------------------------------- //
    //      LOADERS
    // ----------------------------------------------- //

    loadTemplate(template) {
      api.elementTemplates.get(template)
          .then(response => {
              this.setState({
                  layout : JSON.parse(response.data.elementTemplate.layout),
                  templateLoaded : true
              });
          });
    }

    /**
     * Update parameters from parent parameters, needed when others form
     * linked to this one.
     */
    updateFormParentParemeters(parentParameters,parameters){
      if(parentParameters == null){
        return parameters;
      }

      for(var key in parentParameters){
        parameters[key.substr(1)] = parentParameters[key];
      }
      return parameters;
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

      //console.log("FormRedux :: componentDidUpdate  : (prevProps,this.props)",prevProps,this.props);
      if(this.props.preloadUpdate && !prevProps.preloadUpdate){
        
        console.log("FormRedux :: update formParameters : (parentFormParameters)",this.props.parentFormParameters);

        this.updateValuesFromParameters(this.props.parentFormParameters);

        //if form parameters has changed check if need to update form parameters
        this.props.updateParametersFromParent(
          this.props.parentFormParameters,
          this.props.parameters.formParameters
        )

        this.props.onPreloadUpdated();
      }

      //if is already loaded and has no fields, and is form of type preload, and is not yet send
      if(this.isLoaded() && this.hasNoFields() && this.props.isFormPreload && !this.state.sendingPreload){
        //send form automatically
        console.log("FormRedux :: submit automatically form");
        
        this.setState({
          sendingPreload : true
        },function(){
          this.handleSubmit(this.props.id);
        });
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


    hasTemplate() {
      if(this.state.templateLoaded && this.state.layout != null){
        return true;
      }
      return false;
    }

    renderItems() {

      if(this.state.elementObject.fields === undefined || this.state.elementObject.fields == null){
        return null;
      }

      if(this.hasTemplate()) {
        return this.renderTemplate();
      }
      else {
        return this.renderDefaultTemplate();
      }
    }

    renderField(field,key) {
        
        //console.log("renderField (field)",field);
        if(field === undefined || field.element_id === undefined){
          return null;
        }

        const FieldComponent = getFieldComponent(field.type);

        //check visibilitiy
        const visible = isVisible(field,this.props.parameters.formParameters,this.state.values);

        ////console.log("is visible ==> "+field.name,field,visible);

        if(!visible){
          return null;
        }

        var fieldComponent = <FieldComponent
          key={key}
          field={field}
          value={this.state.values[field.identifier]}
          error={this.state.errors[field.identifier] !== undefined ? true : false}
          onFieldChange={this.handleOnChange}
          parameters={getUrlParameters(
            this.props.parameters.formParameters
          )}
          values={this.state.values}
          inline={this.props.isFormPreload}
        />;
        
        if(this.props.isFormPreload){
          fieldComponent = 
            <div className="col-xs-12 col-md-6">
              {fieldComponent}
            </div>;
        }

        return fieldComponent;
    }

    renderDefaultTemplate() {

      var fields = [];

      for(var key in this.state.elementObject.fields) {

        var field = this.state.elementObject.fields[key];
        
        var fieldRendered = this.renderField(field,key);

        if(fieldRendered){
          fields.push(fieldRendered);
        }

      }

      return (
        <Grid
            className="layout"
            fluid={true}
          >
            <Row style={{paddingTop:20}}>
                <Col sm={12} className="container-fields-default"></Col>
            </Row>
            <Row>
                <Col sm={12} className="container-fields-default">
                    {fields}
                </Col>
            </Row>
        </Grid>
      );
    }

    fieldRender(node, key, settings) {

        //console.log("fieldRender :: settings merged : (settings) ",settings);

        if(node.type == 'element_field') {
            return this.renderField(node.field,key);
        }

        switch(node.field.type) {
          case 'label':
          case 'text':

              const textAlign = node.field && node.field.settings && node.field.settings.textAlign ? 
                  'text-'+node.field.settings.textAlign : '';

              return (
                  <Label
                      key={key}
                      text={node.field.value.fr}
                      textAlign={textAlign}
                  />
              );
          case 'icon':
            return (
                <IconField
                    key={key}
                    icon={node.field.value}
                    font={STYLES.elementForm.iconFontSizeElement}
                    color={STYLES.elementForm.iconColorElement}
                    circle={true}
                    checked={true}
                />
            );
          case 'image':
              return (
                  <ImageField
                      key={key}
                      field={node.field}
                  />
              );
              
        }
    }

    /**
     * Function to check if item is visible or not depending on the values and the parameters
     * @param {*} settings 
     */
    checkVisibility(field) {

      //parameters update after submit and process forms
      var visibility = isVisible(
          field,
          this.props.parameters.formParameters,
          this.state.values
      );

      //console.log("checkVisibility :: (field,parameters,values,return)",field,this.props.parameters.formParameters,this.state.values,visibility);

      return visibility;
    }

    renderTemplate() {

      return (
        <Grid
            className="layout"
            fluid={true}
        >
            {this.state.layout != null && 
                <LayoutParser 
                    layout={this.state.layout}
                    checkVisibility={this.checkVisibility.bind(this)}
                    fieldRender={this.fieldRender.bind(this)}
                />
            }
            {this.state.layout == null && 
                <div>Aucun modèle configuré</div>
            }
        </Grid>
      );

    }

    handleSubmit(formId,e) {
      if(e !== undefined){
        e.preventDefault();
      }

      console.log("handleSubmit :: formId",formId);

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

      if(!this.props.isFormPreload) {
        toastr.success('Formulaire traité avec succès');
      }
      else {
        //set preload finish to hide the button
        this.setState({
          preloadFinish : true
        });
      }

      if(this.props.finalRedirectUrl != ""){
        window.location.href = this.props.finalRedirectUrl+"?"+
          getUrlParameters(
            this.props.parameters.formParameters,
            true,
            this.props.finalRedirectParameters
          );
      }
      else {
        this.props.onFormFinished(this.props.parameters.formParameters);
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

    /**
     * Event fired when first GET preload is done. 
     * If done, it's necessary to process json result and update
     * values from init json.
     */
    handlePreload(newValues) {

      console.log("FormRedux :: handlePreload (newValues)",newValues);
      //if new values is != null, merge with current values 

      const values = this.state.values;

      this.setState({
        values : {
          ...values,
          ...newValues
        }
      });

    }

    /**
     * Read all form parameters and updapte values with form parameters. 
     * Needed when form is preloaded with other form.
     * @param {} formParameters 
     */
    updateValuesFromParameters(formParameters) {
      const values = this.state.values;

      for(var key in values){
        if(formParameters["_"+key] !== undefined){
          values[key] = formParameters["_"+key];
        }
      }

      this.setState({
        values : values
      });

    }

    hasNoFields() {
      return this.state.elementObject.fields.length == 0;
    }

    /**
     * To know if form is already loaded o no
     */
    isLoaded() {
      return this.props.preload.done && this.state.templateLoaded
    }

    render() {

        const loaded = this.isLoaded();
        const version = this.props.version;

        return (
          <div 
            className={"form-component element-form-wrapper row "+(this.props.form.loading == true ? 'loading' : '')}
            style={{display : (this.hasNoFields() ? "none" : "block")}}
          >
            
            <FormPreload 
              onPreloadDone={this.handlePreload.bind(this)}
              version={this.props.version}
            />

            <FormParametersIterator />
            <FormProceduresIterator
              values={this.state.values}
              onFinish={this.handleFinish.bind(this)}
              version={this.props.version}
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
                <form id={this.props.id} onSubmit={this.handleSubmit.bind(this,this.props.id)} >

                  {this.renderItems()}

                  <div className={"element-form-row "+(this.props.isFormPreload ? 'preload-form' : '')}>

                    <div className="col-md-12 buttons">
                        <button
                          className={"btn "+(!this.props.isFormPreload ? "btn-primary" : "btn-secondary")}
                          type="submit"
                          disabled={this.props.form.processing}
                        >
                          <i className={(!this.props.isFormPreload ? "fa fa-paper-plane" : "fas fa-redo-alt")}></i>

                        {(!this.props.isFormPreload ? "Valider" : "Précharger")}
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
        parameters : state.parameters,
        preload : state.preload,

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
      },
      updateParametersFromParent : (parentParameters,formParameters) => {
          return dispatch(updateParametersFromParent(parentParameters,formParameters))
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormComponent);
