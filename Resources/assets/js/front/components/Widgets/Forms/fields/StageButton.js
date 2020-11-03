import React, { Component } from 'react';

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

    isDefined(field) {
        if (field !== undefined && field != null && field !== '') {
            return true;
        }
        return false;
    }

    getStageOperation(field) {
        if (this.isDefined(field.settings) && this.isDefined(field.settings.stageOperation)) {
            return field.settings.stageOperation;
        }
        return ''
    }

    getButtonLabel(field) {
        if (this.isDefined(field.value) && this.isDefined(field.value.title) && this.isDefined(field.value.title.fr)) {
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
        var params = formule.match(/[^[\]]+(?=])/g);
        for (var key in params) {
            var id = params[key];
            //check if is in values
            var value = 0;
            if (this.isDefined(this.props.values[id])) {
                value = this.props.values[id];
            }
            //check if is in parameters
            else if (this.isDefined(this.props.formParameters['_' + id])) {
                value = this.props.formParameters['_' + id];
            }

            formule = formule.replace('[' + id + ']', value);
        }

        var result = eval(formule);

        console.log("StageButton :: processOperation (formule,value)", formule, result);

        return result;
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
              break;
        }

    }

    render() {
        //TODO diferent styles depending on state.type
        return (
            <div>
                <a href="" className={"btn " + this.state.type} onClick={this.handleClick.bind(this)}>
                    {this.state.type !== 'btn-prev' ? this.state.label : null}
                    {ICONS.formStage[this.state.type.replace('btn-', '')] !== 'Sélectionner...' ?
                       <i className={ICONS.formStage[this.state.type.replace('btn-', '')]}></i>
                        : null}
                    {this.state.type === 'btn-prev' ?  this.state.label : null}
                </a>
            </div>
        );
    }
}
