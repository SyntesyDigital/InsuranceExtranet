import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { creaticIcons } from './../Icons/Creatic-icons';
import { fontAwesomeIcons } from './../Icons/';

export default class IconField extends Component {

    constructor(props) {
        super(props);
        this.state = {
            icons: []
        };
        this.getLibIcons = this.getLibIcons.bind(this);
    }

    componentDidMount() {
        this.getLibIcons();
    }

    // ==============================
    // Handlers
    // ==============================

    handleOnChange(option) {
        this.props.onChange(this.props.name, option.value);
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

    render() {

        var fieldValue = this.getFieldValue(this.props.field);
        fieldValue = this.getFontAwesomeIcon(fieldValue);

        var value = this.getOption(fieldValue);

        return (
            <div className="form-group bmd-form-group icon-field">
                {!this.props.labelHide ? <label htmlFor={this.props.name} className="bmd-label-floating">{this.props.label}</label> : null}
                <Select
                    id={this.props.name}
                    name={this.props.name}
                    value={value}
                    onChange={this.handleOnChange.bind(this)}
                    options={this.state.icons}
                />
            </div>
        )
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

IconField.propTypes = {
    label: PropTypes.string.isRequired,
    labelHide: PropTypes.bool,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func
};
