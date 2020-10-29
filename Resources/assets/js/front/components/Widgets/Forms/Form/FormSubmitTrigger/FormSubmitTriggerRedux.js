import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    parameteres2Array,
    getUrlParameters,
    b64toBlob,
    ext2mime
} from '../../functions';

import {
    initParametersState,
    checkParameters,
    loadProcedures,
    initProceduresIteration
} from '../actions'

import FormParametersIterator from '../FormParametersIterator';
import FormProceduresIterator from '../FormProceduresIterator';

var jp = require('jsonpath');

class FormSubmitTriggerRedux extends Component {

    constructor(props) {
        super(props);

        const parametersObject = parameteres2Array(props.parametersObject);

        this.state = {
            elementObject: props.elementObject,
            parameters: parametersObject,
        };

        this.props.initParametersState(parametersObject);
        this.props.loadProcedures(props.elementObject.model_identifier);
    }

    componentDidUpdate(prevProps, prevState) {
        //when procedures are loaded
        if (prevProps.form.loading && !this.props.form.loading) {

            if (this.props.form.procedures.length > 0) {
                this.props.initProceduresIteration();
            } else {
                console.error("FormSubmitTriggerRedux : No procedures to process");
            }
            //check parameters with a modal
            // this.props.checkParameters(
            //     this.props.parameters.formParameters,
            //     this.props.form.procedures,
            //     this.state.parameters
            // );
        }
    }
    
    /**
    *  After all submits is necessary to redirect to url configured by the widget.
    *  The url comes from the field, and is necessary to add all route parameters, + modal parameters + response parameters
    */
    handleFinish() {
        alert('ok?');
        this.props.onFormFinished(this.props.parameters.formParameters);
    }

    render() {
        return (
            <div>            
                <FormParametersIterator />
                <FormProceduresIterator
                    values={this.state.values}
                    onFinish={this.handleFinish.bind(this)}
                    version={'2'}
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(FormSubmitTriggerRedux);
