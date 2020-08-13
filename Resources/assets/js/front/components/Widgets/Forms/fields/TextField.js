import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TextField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addClassBordered: false,
        }
        this.handleOnChange = this.handleOnChange.bind(this);
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
    // Getters
    // ==============================

    getNumberFromRules(key) {
        const { rules } = this.props.field;

        if (rules[key] !== undefined && rules[key] != null && rules[key] != '') {
            return parseInt(rules[key]);
        }

        return '';
    }

    // ==============================
    // Processers
    // ==============================

    processReadOnly() {
        const field = this.props.field;
        const operation = field.settings.operation;
        return field.settings.readonly || (operation !== undefined && operation !== null && operation !== '') ?
            'readonly' : null;
    }

    // ==============================
    // Renderers
    // ==============================

    render() {

        const { field } = this.props;
        const errors = this.props.error ? ' has-error' : '';
        let isRequired = field.rules.required !== undefined ?
            field.rules.required : false;

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
        console.log("field", field)
        return (

            <div className={"form-group bmd-form-group" + (errors)}>
                <label className="bmd-label-floating">
                    {field.name}
                    {isRequired &&
                        <span className="required">&nbsp; *</span>
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
                    readonly={this.processReadOnly()}
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