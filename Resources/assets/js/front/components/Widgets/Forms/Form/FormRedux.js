import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import api from './../../../../../back/api';
import ImageField from './../../ElementCard/fields/ImageField';
import IconField from './../../ElementCard/fields/IconField';
import Label from './../../ElementCard/fields/Label';
import RichText from './../../ElementCard/fields/RichTextField';
import StageButton from './../fields/StageButton';
import LayoutValidator from './LayoutValidator';
import EventBus from './../../../../../services/EventBus';
import LayoutParser from './../../ElementCard/LayoutParser';
import Autosave from './Autosave';

import {
    getFieldComponent,
    validateField,
    parameteres2Array,
    isVisible,
    getUrlParameters,
    isDefined,
    getFieldsByStage
} from '../functions';

import {
    initParametersState,
    checkParameters,
    loadProcedures,
    initProceduresIteration,
    updateParametersFromParent,
    startValidation,
    updateStageParameter
} from './actions'

import FormParametersIterator from './FormParametersIterator';
import FormProceduresIterator from './FormProceduresIterator';
import FormValidator from './FormValidator';
import FormPreload from './FormPreload';

var jp = require('jsonpath');

class FormComponent extends Component {

    constructor(props) {
        super(props);

        var parametersObject = parameteres2Array(props.parametersObject);

        //if parent parameters defined update
        parametersObject = this.updateFormParentParemeters(props.parentFormParameters, parametersObject);

        var hasStages = isDefined(props.hasStages) ? props.hasStages : false;
        var initStage = isDefined(props.initStage) ? props.initStage : 1;
        var stageParameter = isDefined(props.stageParameter) ? props.stageParameter : null;

        if(hasStages){
           parametersObject = this.updateParametersFromStage(parametersObject,initStage,stageParameter);
        }

        this.state = {
            elementObject: props.elementObject,
            values: this.initValues(props.elementObject),
            errors: {},
            parameters: parametersObject,

            template: props.template ? props.template : null,
            layout: null,
            templateLoaded: props.template ? false : true,
            sendingPreload: false,
            preloadFinish: false,

            hasStages : hasStages,
            stageParameter : stageParameter,
            currentStage : isDefined(stageParameter) && isDefined(parametersObject[stageParameter]) ? parametersObject[stageParameter] :  initStage,
            fieldsByStage : {},  //object with all fields sorted by stage config

            autosave: null, // Autosave key for detect if we must do an update or a create query
            autosaveLoaded : this.getKeyParameterValue() == null ? true : false //if key is not defined autosave is done by default
        };

        this.props.initParametersState(parametersObject);

        this.handleOnChange = this.handleOnChange.bind(this);

        this.props.loadProcedures(props.elementObject.model_identifier);

        //validator to check if layout is valid
        this.layoutValidator = new LayoutValidator();
    }

    /**
     * Check if autosave is loaded or not
     */
    isAutosaveLoaded() {
        if(!this.props.autosaveEnabled)
            return true;

        return this.state.autosaveLoaded;
    }

    /**
     * If has stages then is necssary to update the form paramters with init value
     */
    updateParametersFromStage(parametersObject,initStage,stageParameter) {

        if(stageParameter == null){
            console.error("Staged form : stageParameter is not defined. Please fill 'Paramètrè de l'etape' into the Staged Form widget")
            return parametersObject;
        }

        //if parameters is not defined by url or by other component
        if(!isDefined(parametersObject[stageParameter])){
            parametersObject[stageParameter] = initStage;
        }
        
        return parametersObject;
    }

    componentDidMount() {
        
        if (this.state.template) {
            this.loadTemplate(this.state.template);
        }
    }

    // ----------------------------------------------- //
    //          AUTOSAVE
    // ----------------------------------------------- //

    getKeyParameterValue() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const key = urlParams.get('key');

        if(key) {
            return key;
        }
        return null;
    }

    loadAutosave() {

        if(!this.props.autosaveEnabled)
            return null;

        const key = this.getKeyParameterValue();

        if(key) {
            Autosave.get({
                codec: 'form',
                payload: {
                    key: key,
                }
            }).then(response => {

                var currentStage = Autosave.processCurrentStage(response.stage);
                var self = this;

                if(response.values == null){
                    console.error("Autosave.get error : values is null");
                }

                this.setState({
                    autosave: key,
                    values: response.values != null ? response.values : this.state.values,
                    autosaveLoaded : true
                },function() {
                    //update current stage and dispatch events
                    self.handleStageChange(currentStage,true);
                });
            });
        }
    }

    deleteAutosave() {
        if(!this.props.autosaveEnabled || !this.state.autosave)
            return null;

        Autosave.delete({
            key: this.state.autosave
        }).then(response => {
            /*
            this.setState({
                autosave: key,
                values: response.values
            });
            */
        });
        
    }

    /**
     * Update autosave with current values, and has option to callback if defined
     * @param {*} values 
     * @param {*} callback 
     */
    updateAutosave(values,callback) {
        
        if(!this.props.autosaveEnabled)
            return null;

        Autosave.save({
            codec: 'form',
            payload: {
                key: this.state.autosave,
                url: '/' + window.location.href.replace(/^(?:\/\/|[^/]+)*\//, ''),
                stage: this.state.hasStages ? 
                    this.state.currentStage + ' ' + Object.keys(this.state.fieldsByStage).length
                    : '',
                values: values
            }
        }).then(key => {
            this.setState({
                autosave: key
            },function(){
                if(callback !== undefined){
                    callback();
                }
            });
        });
    }

    // ----------------------------------------------- //
    //      LOADERS
    // ----------------------------------------------- //

    loadTemplate(template) {
        api.elementTemplates.get(template)
            .then(response => {

                var layout = JSON.parse(response.data.elementTemplate.layout);
                var self = this;

                this.setState({
                    layout: layout,
                    templateLoaded: true,
                    fieldsByStage : this.state.hasStages ? getFieldsByStage(layout) : {}
                },function(){
                    //after load template check if necesstary to autosave
                    self.loadAutosave();
                });
            });
    }

    /**
     * Update parameters from parent parameters, needed when others form
     * linked to this one.
     */
    updateFormParentParemeters(parentParameters, parameters) {
        if (parentParameters == null) {
            return parameters;
        }

        for (var key in parentParameters) {
            parameters[key.substr(1)] = parentParameters[key];
        }
        return parameters;
    }

    componentDidUpdate(prevProps, prevState) {

        ////console.log("FormParametersIterator :: start interate",this.props.parameters.checked);

        //when procedures are loaded
        if (prevProps.form.loading && !this.props.form.loading) {
            //console.log("FormRedux :: checkParameters",this.props.parameters.formParameters);

            //check parameters with a modal
            this.props.checkParameters(
                this.props.parameters.formParameters,
                this.props.form.procedures,
                this.state.parameters
            );
        }

        //console.log("FormRedux :: componentDidUpdate  : (prevProps,this.props)",prevProps,this.props);
        if (this.props.preloadUpdate && !prevProps.preloadUpdate) {

            console.log("FormRedux :: update formParameters : (parentFormParameters)", this.props.parentFormParameters);

            this.updateValuesFromParameters(this.props.parentFormParameters);

            //if form parameters has changed check if need to update form parameters
            this.props.updateParametersFromParent(
                this.props.parentFormParameters,
                this.props.parameters.formParameters
            )

            this.props.onPreloadUpdated();
        }

        //if is already loaded and has no fields, and is form of type preload, and is not yet send
        if (this.isLoaded() && this.hasNoFields() && this.props.isFormPreload && !this.state.sendingPreload) {
            //send form automatically
            console.log("FormRedux :: submit automatically form");

            this.setState({
                sendingPreload: true
            }, function () {
                this.handleSubmit(this.props.id);
            });
        }
    }

    initValues(elementObject) {
        //console.log("initValues => ",elementObject);

        var values = {};

        for (var key in elementObject.fields) {
            var field = elementObject.fields[key];

            //labels are not processed
            if (field.type != 'label') {
                //TODO process different values depending of type ?

                if (field.settings !== undefined && field.settings.defaultValue !== undefined &&
                    field.settings.defaultValue !== null && field.settings.defaultValue !== '') {
                    values[field.identifier] = field.settings.defaultValue;
                }
                else {
                    values[field.identifier] = '';
                }
            }

        }

        return values;
    }

    getElementObjectField(identifier) {
        const { fields } = this.state.elementObject;

        for (var key in fields) {
            if (fields[key].identifier == identifier) {
                return fields[key];
            }
        }
        return null;
    }

    handleOnChange(field) {

        //console.log("FormComponent :: handleOnChange",field);

        const { values } = this.state;

        values[field.name] = field.value;

        var self = this;

        if(this.state.timer !== undefined) {
            clearTimeout(this.state.timer);
        }
        
        this.setState({
            values: values,
            timer: setTimeout(() => { // Autosave
                this.updateAutosave(values);
            }, 1000)
        }, function () {
            self.validateFieldChange(
                self.getElementObjectField(field.name)
            )
        });
    }

    

    handleStageChange(stage,validate) {

        var validate = isDefined(validate) ? validate : false;
        console.log("handleStageChange :: stage, state", stage, this.state);

        if(stage == null){
            console.error("Stage Button Click error : stage not defined.");
            return;
        }
        
        if(validate){
            //validate stage
            const hasErrors = this.validateFields();

            if (hasErrors) {
                toastr.error('Vous devez remplir tous les champs obligatoires.');
                //console.log("handleSubmit :: Form has errors");
                return;
            }
        }

        var self = this;

        EventBus.publish('STAGE_UPDATE',{
            parameter : this.state.stageParameter,
            stage : stage
        });


        this.setState({
            currentStage : stage
        },function(){

            //update form parameters
            self.props.updateStageParameter(
                self.state.stageParameter,
                stage,
                self.props.parameters.formParameters
            );

            self.updateAutosave(self.state.values);
        });

    }


    hasTemplate() {
        if (this.state.templateLoaded && this.state.layout != null) {
            return true;
        }
        return false;
    }

    renderItems() {

        if (this.state.elementObject.fields === undefined || this.state.elementObject.fields == null) {
            return null;
        }

        if (this.hasTemplate()) {
            return this.renderTemplate();
        }
        else {
            return this.renderDefaultTemplate();
        }
    }

    renderField(field, key) {

        //console.log("renderField (field)",field);
        if (field === undefined || field.element_id === undefined) {
            return null;
        }

        const FieldComponent = getFieldComponent(field.type);

        //check visibilitiy
        const visible = isVisible(field, this.props.parameters.formParameters, this.state.values);

        ////console.log("is visible ==> "+field.name,field,visible);

        if (!visible) {
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

        if (this.props.isFormPreload) {
            fieldComponent =
                <div className="col-xs-12 col-md-6">
                    {fieldComponent}
                </div>;
        }

        return fieldComponent;
    }

    renderDefaultTemplate() {

        var fields = [];

        for (var key in this.state.elementObject.fields) {

            var field = this.state.elementObject.fields[key];

            var fieldRendered = this.renderField(field, key);

            if (fieldRendered) {
                fields.push(fieldRendered);
            }

        }

        return (
            <Grid
                className="layout"
                fluid={true}
            >
                <Row style={{ paddingTop: 20 }}>
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

        if (node.type == 'element_field') {
            return this.renderField(node.field, key);
        }

        switch (node.field.type) {
            case 'label':
            case 'text':

                const textAlign = node.field && node.field.settings && node.field.settings.textAlign ?
                    'text-' + node.field.settings.textAlign : '';

                return (
                    <Label
                        key={key}
                        text={node.field.value.fr}
                        textAlign={textAlign}
                        type={'form-label'}
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

            case 'richtext':
                return (
                    <RichText
                        key={key}
                        field={node.field}
                    />
                );

            case 'link':
                return (
                    <StageButton
                        key={key}
                        field={node.field}
                        onStageChange={this.handleStageChange.bind(this)}
                        onSubmit={this.handleSubmit.bind(this, this.props.id)}
                        values={this.state.values}
                        formParameters={this.props.parameters.formParameters}
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
            this.state.values,
            this.state.stageParameter
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

    handleSubmit(formId, e) {
        if (e !== undefined) {
            e.preventDefault();
            //add stop propagation to avoid parent submit in nested forms ( example select search )
            e.stopPropagation();
        }

        console.log("handleSubmit :: formId", formId);

        const hasErrors = this.validateFields();

        if (hasErrors) {
            toastr.error('Vous devez remplir tous les champs obligatoires.');
            //console.log("handleSubmit :: Form has errors");
            return;
        }

        //start with the process
        ////console.log("this.props.form.procedures : ",this.props.form);
        if (this.props.form.procedures.length > 0) {

            //start processing
            var self = this;

            this.props.startValidation();
            //this.props.initProceduresIteration();

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

        if (!this.props.isFormPreload) {
            toastr.success('Formulaire traité avec succès');
        }
        else {
            //set preload finish to hide the button
            this.setState({
                preloadFinish: true
            });
        }

        //delete autosave when form is processed
        this.deleteAutosave();

        if (this.props.finalRedirectUrl != "") {
            window.location.href = this.props.finalRedirectUrl + "?" +
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
        if (field == null)
            return;

        const { errors, values } = this.state;

        //console.log("validateFieldChange :: field ",field);

        var valid = validateField(field, values);

        if (!valid) {
            errors[field.identifier] = true;
        }
        else {
            delete errors[field.identifier];
        }

        this.setState({
            errors: errors
        });
    }

    clearAllToasts() {
        $('#toast-container .toast').remove();
    }

    /**
    *   When submit is preseed
    */
    validateFields() {
        if (this.state.elementObject.fields === undefined || this.state.elementObject.fields == null) {
            return {};
        }

        var errors = {};
        var fields = this.state.elementObject.fields;
        var currentStage = this.state.hasStages ? this.state.currentStage : null;

        this.clearAllToasts();
        
        
        //if has template process the validation depending on the visible layout
        if(this.hasTemplate()){
            errors = this.layoutValidator.validateLayout(
                this.state.layout,
                this.state.values,
                this.props.parameters.formParameters,
                this.state.stageParameter   //if stage is null, the is not considered for visibility
            );
        }
        else {
            errors = this.layoutValidator.validateFields(
                    fields,
                    this.state.values,
                    this.props.parameters.formParameters
                );
        }

        this.setState({
            errors: errors
        });

        //if errors has variables, return true
        var hasErrors = Object.keys(errors).length > 0;

        return hasErrors;
    }

    /**
     * Event fired when first GET preload is done. 
     * If done, it's necessary to process json result and update
     * values from init json.
     */
    handlePreload(newValues) {

        console.log("FormRedux :: handlePreload (newValues)", newValues);
        //if new values is != null, merge with current values 

        const values = this.state.values;

        this.setState({
            values: {
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

        for (var key in values) {
            if (formParameters["_" + key] !== undefined) {
                values[key] = formParameters["_" + key];
            }
        }

        this.setState({
            values: values
        });

    }

    hasNoFields() {
        return this.state.elementObject.fields.length == 0;
    }

    /**
     * To know if form is already loaded o no
     */
    isLoaded() {
        return this.props.preload.done && this.state.templateLoaded && this.isAutosaveLoaded()
    }

    renderSubmitButton() {

        //if has stages submit button is added directy to layout, then listen to bnt-submit click
        if(this.state.hasStages){
            return (
                <div style={{height:30}}></div>
            );
        }

        return (
            <div className={"element-form-row " + (this.props.isFormPreload ? 'preload-form' : '')}>
                <div className="col-md-12 buttons">
                    <button
                        className={"btn " + (!this.props.isFormPreload ? "btn-primary" : "btn-secondary")}
                        type="submit"
                        disabled={this.props.form.processing}
                    >
                        <i className={(!this.props.isFormPreload ? "fa fa-paper-plane" : "fas fa-redo-alt")}>{" "}</i>{(!this.props.isFormPreload ? " Valider" : " Précharger")}
                    </button>
                </div>
            </div>
        );
    }

    render() {

        const loaded = this.isLoaded();
        const version = this.props.version;

        return (
            <div
                className={"form-component element-form-wrapper row " + (this.props.form.loading == true ? 'loading' : '')}
                style={{ display: (this.hasNoFields() ? "none" : "block") }}
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
                <FormValidator
                    values={this.state.values}
                />

                {
                    !loaded &&
                    <div className="" style={{
                        padding: 40,
                        textAlign: 'center'
                    }}>
                        En cours de chargement
              </div>
                }
                {loaded &&
                    <form id={this.props.id} onSubmit={this.handleSubmit.bind(this, this.props.id)} >

                        {this.renderItems()}

                        {this.renderSubmitButton()}
                    </form>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        form: state.form,
        parameters: state.parameters,
        preload: state.preload,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        startValidation: () => {
            return dispatch(startValidation());
        },
        initProceduresIteration: () => {
            return dispatch(initProceduresIteration());
        },
        initParametersState: (payload) => {
            return dispatch(initParametersState(payload));
        },
        checkParameters: (formParameters, procedures, parameters) => {
            return dispatch(checkParameters(formParameters, procedures, parameters))
        },
        loadProcedures: (modelIdentifier) => {
            return dispatch(loadProcedures(modelIdentifier))
        },
        updateParametersFromParent: (parentParameters, formParameters) => {
            return dispatch(updateParametersFromParent(parentParameters, formParameters))
        },
        updateStageParameter : (identifier,stage,formParameters) => {
            return dispatch(updateStageParameter(identifier,stage,formParameters))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormComponent);
