import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { fontAwesomeIcons } from './Icons/Icons-data';
import { creaticIcons } from './Icons/Creatic-icons';
import Select from 'react-select';

import { customFieldChange } from './../actions/';

class IconField extends Component {

    constructor(props) {

        super(props);

        var icons = [];

        const hasFontAwesome = SITE_CONFIG_GENERAL.FONTAWESOME_IS_ACTIVE !== undefined
            && SITE_CONFIG_GENERAL.FONTAWESOME_IS_ACTIVE !== null
            && SITE_CONFIG_GENERAL.FONTAWESOME_IS_ACTIVE.value == true
            ? true
            : false;

        const hasCreaticLib = SITE_CONFIG_GENERAL.CREATIC_LIB_IS_ACTIVE !== undefined
            && SITE_CONFIG_GENERAL.CREATIC_LIB_IS_ACTIVE !== null
            && SITE_CONFIG_GENERAL.CREATIC_LIB_IS_ACTIVE.value == true
            ? true
            : false;

        if (hasFontAwesome) {
            for (var key in fontAwesomeIcons) {
                icons.push({
                    value: key,
                    label: <span> <i className={key}></i> &nbsp; {key}</span>
                });
            }
        }

        if (hasCreaticLib) {
            for (var key in creaticIcons) {
                icons.push({
                    value: key,
                    label: <span>
                        <svg className={'icon ' + key}>
                            <use xlinkHref={'#' + key}></use>
                        </svg> &nbsp; {key}
                    </span>
                });
            }
        }

        this.state = {
            icons: icons
        };

        this.handleOnChange = this.handleOnChange.bind(this);
    }


    handleOnChange(option) {
        this.props.onFieldChange({
            identifier: this.props.field.identifier,
            value: option.value
        });
    }

    getOption(value) {
        if (value === undefined || value == null)
            return null;

        for (var index in this.state.icons) {
            if (this.state.icons[index]['value'] == value)
                return this.state.icons[index]
        }
        return null;
    }

    renderInputs() {

        const errors = this.props.app.errors[this.props.field.identifier];
        var error = errors ? true : false;

        // var value = this.props.field.value && this.props.field.value ? this.props.field.value : '';

        var value = this.getOption(this.props.field.value);

        // console.log("this.props.field.value:: ", this.props.field.value)

        return (
            <div className={'form-group bmd-form-group ' + (error ? 'has-error' : null)} >
                <label htmlFor={this.props.field.identifier} className="bmd-label-floating">{this.props.field.name}</label>
                {/* <input type="text" className="form-control" name="name" value={value} onChange={this.handleOnChange} /> */}

                <Select
                    name={'name'}
                    value={value}
                    onChange={this.handleOnChange.bind(this)}
                    options={this.state.icons}
                    placeholder={'Sélectionner...'}
                />
            </div>
        );
    }

    render() {

        const hideTab = this.props.hideTab !== undefined && this.props.hideTab == true ? true : false;

        return (
            <div className="field-item">
                <button style={{ display: (hideTab ? 'none' : 'block') }} id={"heading" + this.props.field.identifier} className="btn btn-link" data-toggle="collapse" data-target={"#collapse" + this.props.field.identifier} aria-expanded="true" aria-controls={"collapse" + this.props.field.identifier}>
                    <span className="field-type">
                        <i className={"fa " + ELEMENT_TEMPLATE_FIELDS.ICON.icon}></i> {ELEMENT_TEMPLATE_FIELDS.ICON.name}
                    </span>
                    <span className="field-name">
                        {this.props.field.name}
                    </span>
                </button>

                <div id={"collapse" + this.props.field.identifier} className="collapse in" aria-labelledby={"heading" + this.props.field.identifier} aria-expanded="true" aria-controls={"collapse" + this.props.field.identifier}>
                    <div className="field-form">
                        {this.renderInputs()}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        app: state.app
    }
}

const mapDispatchToProps = dispatch => {
    return {
        customFieldChange: (field) => {
            return dispatch(customFieldChange(field));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IconField);
