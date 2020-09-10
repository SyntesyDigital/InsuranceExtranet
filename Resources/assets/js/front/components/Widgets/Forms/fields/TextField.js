import React, { Component } from 'react';
import PropTypes from 'prop-types';
import iconSvg from '../assets/img/ico_info.svg';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: STYLES.elementForm.backgroundColorTooltipDescForm,
        color: STYLES.elementForm.colorTooltipDescForm,
        maxWidth: 220,
        fontSize: STYLES.elementForm.fontSizeTooltipDescForm,
        borderRadius: 0,
        padding: '15px',
    },
}))(Tooltip);

class TextField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addClassBordered: false,
        }
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        //si es campo operacion

        if (this.fieldHasOperationSettingsEnable()) {
            this.processOperation(prevProps);
        }
    }

    fieldHasOperationSettingsEnable() {
        return this.props.field.settings.operation !== undefined && this.props.field.settings.operation !== null && this.props.field.settings.operation !== '' ? true : false;
    }

    isReadOnly() {
        const field = this.props.field;
        const operation = field.settings.operation;
        return field.settings.readonly || (operation !== undefined && operation !== null && operation !== '') ?
            'readonly' : null;
    }

    // ==============================
    // Getters
    // ==============================

    getNumberFromRules(key) {
        const { rules } = this.props.field;

        if (rules[key] !== undefined && rules[key] != null && rules[key] != '') {
            return rules[key];
        }

        return '';
    }

    getMinValue() {
        var min = parseInt(this.getNumberFromRules('minNumber'));
        return min === 0 || (min && min !== "") ? min : -Number.MAX_VALUE;
    }

    getMaxValue() {
        var max = parseInt(this.getNumberFromRules('maxNumber'));
        return max === 0 || (max && max !== "") ? max : Number.MAX_VALUE;
    }

    // ==============================
    // Processers
    // ==============================

    processOperation(prevProps) {

        //miramos si ha cambiado un campo diferente al campo con formula para recalcular
        if (this.props.value === prevProps.value) {
            var formule = this.props.field.settings.operation;
            var params = formule.match(/[^[\]]+(?=])/g);
            for (var key in params) {
                var id = params[key];
                var value = this.props.values[id] !== undefined && this.props.values[id] !== null && this.props.values[id] !== '' ? this.props.values[id] : '0';
                formule = formule.replace('[' + id + ']', value);
            }
            var result = eval(formule);
            //miramos si ha cambiado o no el resultado de la formula para updatear el campo
            if (this.props.value != result) {
                this.props.onFieldChange({
                    name: this.props.field.identifier,
                    value: result
                });
            }
        }
    }

    // ==============================
    // Handlers
    // ==============================

    handleBlur(e) {
        this.setState({
            addClassBordered: false
        });
    }

    handleFocus(e) {
        this.setState({
            addClassBordered: true
        });
    }

    handleOnChange(event) {

        this.props.onFieldChange({
            name: event.target.name,
            value: event.target.value
        });

    }


    // ==============================
    // Renderers
    // ==============================

    render() {

        const { field } = this.props;
        const errors = this.props.error ? ' has-error' : '';

        let isRequired = field.rules.required !== undefined ?
            field.rules.required : false;

        let hasDescription = field.settings.description !== undefined ?
            field.settings.description : false;

        var maxCharacters = this.getNumberFromRules('maxCharacters');
        var minCharacters = this.getNumberFromRules('minCharacters');

        //required can be set also directly with modals
        if (this.props.isModal !== undefined && this.props.isModal &&
            field.required !== undefined) {
            isRequired = field.required;
        }

        let textFieldClass = ["text-field"];

        if (this.state.addClassBordered || this.props.value != "") {
            textFieldClass.push('bordered');
        }

        return (

            <div className={"form-group bmd-form-group" + (errors)}>
                <label className="bmd-label-floating">
                    {field.name}
                    {isRequired &&
                        <span className="required">&nbsp; *</span>
                    }
                    {hasDescription &&
                        <HtmlTooltip
                            title={
                                <span className={'content-desc'}>
                                    {field.settings.description ? field.settings.description : ''}
                                </span>
                            }
                        >
                            <Button>
                                <img
                                    className={'icon-desc-info'}
                                    src={iconSvg}
                                />
                            </Button>
                        </HtmlTooltip>
                    }
                </label>

                <input
                    type={field.settings.format == "password" ? "password" : "text"}
                    className={"form-control " + (textFieldClass.join(' '))}
                    name={field.identifier}
                    value={this.props.value}
                    onChange={this.handleOnChange.bind(this)}
                    onBlur={this.handleBlur.bind(this)}
                    onFocus={this.handleFocus.bind(this)}
                    maxLength={maxCharacters}
                    minLength={minCharacters}
                    placeholder={maxCharacters != "" ? 'Max: ' + maxCharacters + ' caractères' : ""}
                    readOnly={this.isReadOnly()}
                />
            </div>

        );
    }

}

export default TextField;

TextField.propTypes = {
    value: PropTypes.string,
    isFilled: PropTypes.bool,
    onChange: PropTypes.func
};