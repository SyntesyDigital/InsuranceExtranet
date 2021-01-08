import React, { Component } from 'react';

import CustomIcon from './../../../Common/CustomIcon';

import {
    isDefined
}
from './../functions';

export default class StageButton extends Component {

    constructor(props) {
        super(props);

        console.log("LinkField :: construct props already info ? ", props);

        this.state = {
            type: this.getButtonType(props.field),
            label: this.getButtonLabel(props.field),
            stageOperation: this.getStageOperation(props.field)
        }
    }

    getButtonType(field) {
        if (field.settings !== undefined && field.settings.buttonType !== undefined && field.settings.buttonType != null &&
            field.settings.buttonType !== '') {
            return field.settings.buttonType;
        }
        else {
            return ''
        }
    }

    getStageOperation(field) {
        if (isDefined(field.settings) && isDefined(field.settings.stageOperation)) {
            return field.settings.stageOperation;
        }
        return ''
    }

    getButtonLabel(field) {
        if (isDefined(field.value) && isDefined(field.value.title) && isDefined(field.value.title.fr)) {
            return field.value.title.fr;
        }
        return ''
    }

    componentDidUpdate(prevProps, prevState) {
        //si es campo operacion
    }

    // ==============================
    // Processers
    // ==============================

    processOperation() {
        //miramos si ha cambiado un campo diferente al campo con formula para recalcular
        var formule = this.state.stageOperation;

        return this.computeOperation(formule);
    }

    computeOperation(formule) {
        var params = formule.match(/[^[\]]+(?=])/g);
        for (var key in params) {
            var id = params[key];
            //check if is in values
            var value = 0;
            if (isDefined(this.props.values[id])) {
                value = this.props.values[id];
            }
            //check if is in parameters
            else if (isDefined(this.props.formParameters['_' + id])) {
                value = this.props.formParameters['_' + id];
            }

            formule = formule.replace('[' + id + ']', value);
        }

        var result = eval(formule);

        console.log("StageButton :: processOperation (formule,value)", formule, result);

        return result;
    }

    hasFieldOperation() {
        var field = this.props.field;
        if (isDefined(field.settings) && isDefined(field.settings.fieldOperation)) {
            return true;
        }
        return false;
    }

    processFieldOperation() {
        var field = this.props.field;
        if(isDefined(field.settings.fieldOperation) 
            && isDefined(field.settings.fieldOperation.field)
            && isDefined(field.settings.fieldOperation.operation)){

            var identifier = field.settings.fieldOperation.field;
            var formule = field.settings.fieldOperation.operation;

            var result = this.computeOperation(formule);
            this.props.onFieldChange({
                name : identifier,
                value : result
            });
        }
    }

    handleClick(e) {
        e.preventDefault();

        switch (this.state.type) {

            case 'btn-prev':
              //process operation
              var value = this.processOperation();
      
              //send event to change stage
              this.props.onStageChange(value);
              break;
      
            case 'btn-next':
              //process operation
              var value = this.processOperation();
      
              //send event to change stage with validate
              this.props.onStageChange(value,true);
              break;
      
            case 'btn-submit':
              //process to finish form
              this.props.onSubmit(e);
              break;

            default :
                if(this.hasFieldOperation()){
                    this.processFieldOperation();
                }
                break;
        }

    }

    getIcon() {
        var field = this.props.field;
        if(isDefined(field.settings) && isDefined(field.settings.icon)){
            return field.settings.icon;
        }

        if(ICONS.formStage[this.state.type.replace('btn-', '')] !== 'Sélectionner...' ){
            return ICONS.formStage[this.state.type.replace('btn-', '')];
        }

        return '';
    }

    render() {
    
        var icon = this.getIcon();
        var operationEnabled = this.hasFieldOperation();
        
        return (
            <div>
                <a href="" className={ (operationEnabled ? 'btn-action ' : 'btn ') + this.state.type } onClick={this.handleClick.bind(this)}>
                    {this.state.type !== 'btn-prev' && !operationEnabled ? this.state.label : null} 
                    &nbsp;
                    <CustomIcon
                        icon={icon}
                    />
                    &nbsp;
                    {this.state.type === 'btn-prev' || operationEnabled ?  this.state.label : null}
                </a>
            </div>
        );
    }
}
