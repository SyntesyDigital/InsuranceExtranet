import React, { Component } from 'react';
import { connect } from 'react-redux';
import CustomIcon from './../../../../Common/CustomIcon';
import {
    parameteres2Array,
    getUrlParameters,
    b64toBlob,
    ext2mime
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

    constructor(props) {
        super(props);

        const parametersObject = parameteres2Array(props.parametersObject);

        this.state = {

            elementObject: props.elementObject,
            parameters: parametersObject,

            fileEnabled: false,
            filename: '',
            content: ''
        };

        this.props.initParametersState(parametersObject);
        this.props.loadProcedures(props.elementObject.model_identifier);
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

    }

    handleSubmit(e) {
        e.preventDefault();

        const loaded = this.props.parameters.formParametersLoaded;

        //if not yet loaded not possible to submit
        if (!loaded)
            return;

        //start with the process
        ////console.log("this.props.form.procedures : ",this.props.form);
        if (this.props.form.procedures.length > 0) {
            this.props.initProceduresIteration();
        }
        else {
            console.error("No procedures to process");
        }
    }

    getFilenameExtension(filename) {
        if (filename === undefined || filename == null || filename === '')
            return '';

        var filenameArray = filename.split('.');
        return filenameArray[filenameArray.length - 1];
    }


    processText(fields, key) {
        return fields[key].value != null && fields[key].value[LOCALE] !== undefined ?
            fields[key].value[LOCALE] : '';
    }

    processIcon(fields, key) {
        return fields[key].value != null && fields[key].value !== undefined ?
            fields[key].value : '';
    }

    processFusionForm(parameters) {

        if (parameters['_fusionContent'] === undefined || parameters['_fusionContent'] == null
            || parameters['_fusionContent'] === '') {

            toastr.error('Aucune donnée trouvée');
            return;
        }

        var filename = parameters['_fusionFilename'];

        //get extension and process extension to get mime type
        var extension = this.getFilenameExtension();
        const contentType = ext2mime(extension);
        const b64Data = parameters['_fusionContent'];

        //create file from base64 data
        const blob = b64toBlob(b64Data, contentType);
        const blobUrl = URL.createObjectURL(blob);

        //redirect to file
        //window.location = blobUrl;

        var downloadLink = document.createElement("a");
        downloadLink.href = blobUrl;
        downloadLink.download = filename;

        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        toastr.success('Téléchargement en cours');

        /*
        this.setState({
            fileEnabled : true,
            filename : parameters['_fusionFilename'] ? parameters['_fusionFilename'] : 'fichier',
            content : parameters['_fusionContent']
        },function(){
            toastr.success('Téléchargement en cours');
            //console.log("processFusionForm :: ");
            ///$("form#file-redirect-form").submit();
        })
        */

    }

    /**
    *  After all submits is necessary to redirect to url configured by the widget.
    *  The url comes from the field, and is necessary to add all route parameters, + modal parameters + response parameters
    */
    handleFinish() {

        var parameters = this.props.parameters.formParameters;
        //console.log("processFusionForm :: handleFinish :: (parameters) ",parameters)

        for (var key in parameters) {

            if (key == "_redirectUrl") {
                window.location.href = parameters[key];
                return;
            }
            else if (key == "_fusionContent") {
                this.processFusionForm(parameters);
                return;
            }

        }

        toastr.success('Formulaire traité avec succès');

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
     * TO REMOVE not used
     * Form to submit directly to redirect to post result
     */
    renderHiddenForm() {

        //only dislay if file is enabled
        if (!this.state.fileEnabled)
            return null;

        return (
            <form
                id="file-redirect-form"
                action={ASSETS + 'document/download-ws-fusion/'}
                className="hidden"
                method='POST'
            >
                <input type="hidden" name="_method" value="POST" />
                <input type="hidden" name="filename" value={this.state.filename} />
                <input type="hidden" name="content" value={this.state.content} />
                <input type="hidden" name="_token" value={$('meta[name="csrf-token"]').attr('content')} />
            </form>
        );
    }

    renderBoxButton() {

        return (
            <div className={
                "box-button-root box-button-container " +
                (!this.props.parameters.formParametersLoaded ? 'disabled' : '') +
                (this.props.field.settings['buttonClass'] ? ' ' + this.props.field.settings['buttonClass'] : '')
            }>
                <div className="wrap-box-button">
                    <div className="image-container">
                        <div className="wrap-icon">
                            {this.props.field.fields[3].value != '' &&
                                <CustomIcon
                                    icon={this.processIcon(this.props.field.fields, 3)}
                                />
                            }
                        </div>
                    </div>
                    <div className="label-container">
                        <div>
                            <p>{this.processText(this.props.field.fields, 0)}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderDocumentButton() {
        return (
            <div className={"document-button-container" +
                (!this.props.parameters.formParametersLoaded ? 'disabled' : '') +
                (this.props.field.settings['buttonClass'] ? ' ' + this.props.field.settings['buttonClass'] : '')
            }>
                <div className="wrap-box-button">
                    <div className="image-container">
                        <div className="wrap-icon">
                            {this.props.field.fields[3].value != '' &&
                                <CustomIcon
                                    icon={this.processIcon(this.props.field.fields, 3)}
                                />
                            }
                        </div>
                    </div>
                    <div className="label-container">
                        <div className="title-doc">
                            <p>{this.processText(this.props.field.fields, 0)}</p>
                        </div>
                        <div className="subtitle-doc">
                            <p>{this.processText(this.props.field.fields, 1)}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    renderTypeButton(type, loaded) {

        switch (type) {

            case "box_button":
                return (
                    this.renderBoxButton()
                );

            case "document_button":
                return (
                    this.renderDocumentButton()
                );


            case "simple_button":
                return (
                    <div className="simple-button-container">
                        <a
                            className={
                                'simple-btn ' +
                                (this.props.field.settings.btnClass ? this.props.field.settings.btnClass
                                    : '') +
                                (!loaded ? ' disabled ' : '') +
                                (this.props.field.settings['buttonClass'] ? ' ' + this.props.field.settings['buttonClass'] : '')
                            }
                        >
                            {this.props.field.fields[3].value != '' &&
                                <CustomIcon
                                    icon={this.processIcon(this.props.field.fields, 3)}
                                />
                            }
                            &nbsp;{this.processText(this.props.field.fields, 0)}
                        </a>
                    </div>
                );

            default:
                return (
                    this.renderBoxButton()
                );
        }
    }


    render() {

        console.log("this.props.field.fields", this.props.field.fields)
        return (
            <div>
                {this.renderHiddenForm()}
                <div
                    className={"form-button box-button-container-a " + (!this.props.parameters.formParametersLoaded ? 'loading' : '')}
                    onClick={this.handleSubmit.bind(this)}
                >
                    <FormParametersIterator />
                    <FormProceduresIterator
                        values={this.state.values}
                        onFinish={this.handleFinish.bind(this)}
                        version={'2'}
                    />
                    {this.renderTypeButton(this.props.field.settings['renderButton'], this.props.parameters.formParametersLoaded)}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        form: state.form,
        parameters: state.parameters
    }
}

const mapDispatchToProps = dispatch => {
    return {
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormButtonRedux);
