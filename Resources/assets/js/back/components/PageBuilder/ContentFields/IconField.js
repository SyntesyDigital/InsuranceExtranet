import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fontAwesomeIcons } from './Icons/Icons-data';
import { creaticIcons } from './Icons/Creatic-icons';
import Select from 'react-select';

import { customFieldChange } from './../actions/';

class IconField extends Component {

    constructor(props) {
        super(props);
        this.state = {
            icons: []
        };

        this.handleOnChange = this.handleOnChange.bind(this);
        this.getLibIcons = this.getLibIcons.bind(this);

    }

    componentDidMount() {
        this.getLibIcons();
    }

    // ==============================
    // Handlers
    // ==============================

    handleOnChange(option) {
        this.props.onFieldChange({
            identifier: this.props.field.identifier,
            value: option.value
        });
    }

    // ==============================
    // Getters
    // ==============================

    getLibIcons() {

        var icons = [];

        if (hasFontAwesome()) {
            for (var key in fontAwesomeIcons) {
                icons.push({
                    value: key,
                    label: <span> <i className={key}></i> &nbsp; {key}</span>
                });
            }
        }

        if (hasCreaticLib()) {
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

        this.setState({
            icons: icons
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

    //procesamos el field si viene o no con idioma
    getFieldValue(field) {

        if (field.value) {
            if (field.value[DEFAULT_LOCALE]) {
                return field.value[DEFAULT_LOCALE];
            }
            else {
                return field.value;
            }
        }
        return '';
    }

    // procesamos la clave del icono para convertir a fontawesome v.4 ->
    // -> o retornar el value que tenga
    getFontAwesomeIcon(key) {

        var explode = key.split(' ');

        if (explode[0] == 'fa') {
            explode[0] = 'fas';
            return explode.join(' ');

        } else {
            return key;
        }
    }


    renderInputs() {

        const errors = this.props.app.errors[this.props.field.identifier];
        var error = errors ? true : false;

        var fieldValue = this.getFieldValue(this.props.field);
        fieldValue = this.getFontAwesomeIcon(fieldValue);

        var value = this.getOption(fieldValue);

        return (
            <div className={'form-group bmd-form-group ' + (error ? 'has-error' : null)} >
                <label
                    htmlFor={this.props.field.identifier}
                    className="bmd-label-floating"
                >
                    {this.props.field.name}
                </label>
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


    // ==============================
    // Renderers
    // ==============================

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

function hasFontAwesome() {
    return SITE_CONFIG_GENERAL.FONTAWESOME_IS_ACTIVE !== undefined
        && SITE_CONFIG_GENERAL.FONTAWESOME_IS_ACTIVE !== null
        ? !SITE_CONFIG_GENERAL.FONTAWESOME_IS_ACTIVE.value
        : true;
}

function hasCreaticLib() {
    return SITE_CONFIG_GENERAL.CREATIC_LIB_IS_ACTIVE !== undefined
        && SITE_CONFIG_GENERAL.CREATIC_LIB_IS_ACTIVE !== null
        ? SITE_CONFIG_GENERAL.CREATIC_LIB_IS_ACTIVE.value
        : false;
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
