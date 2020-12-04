import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class CustomIcon extends Component {

    constructor(props) {
        super(props);
        this.isCreaticEnable = this.isCreaticEnable.bind(this);
        this.isFontAwesomeEnable = this.isFontAwesomeEnable.bind(this);
        this.isCreaticIcon = this.isCreaticIcon.bind(this);

    }

    isCreaticEnable() {
        const hasCreaticLib = SITE_CONFIG_GENERAL.CREATIC_LIB_IS_ACTIVE !== undefined
            && SITE_CONFIG_GENERAL.CREATIC_LIB_IS_ACTIVE !== null
            ? SITE_CONFIG_GENERAL.CREATIC_LIB_IS_ACTIVE.value
            : false;

        return hasCreaticLib;
    }

    isFontAwesomeEnable() {
        const hasFontAwesome = SITE_CONFIG_GENERAL.FONTAWESOME_IS_ACTIVE !== undefined
            && SITE_CONFIG_GENERAL.FONTAWESOME_IS_ACTIVE !== null
            ? !SITE_CONFIG_GENERAL.FONTAWESOME_IS_ACTIVE.value
            : true;

        return hasFontAwesome;
    }

    isCreaticIcon() {
        let word = "creatic";
        if (this.props.icon.indexOf(word)) {
            console.log("La palabra está dentro ");
            return true;
        }
        else {
            return false;
        }
    }

    renderFontAwesome() {
        return (
            <i className={this.props.icon}></i>
        );
    }


    renderCreaticLib() {
        return (
            <svg className={'icon ' + this.props.icon}>
                <use xlinkHref={'#' + this.props.icon}></use>
            </svg>
        )
    }

    render() {


        return (
            <React.Fragment>
                { this.isCreaticEnable() && this.isCreaticIcon() ?
                    this.renderCreaticLib()
                    : this.isFontAwesomeEnable() ?
                        this.renderFontAwesome()
                        : null
                }
            </React.Fragment>
        );
    }
}

CustomIcon.propTypes = {
    icon: PropTypes.string
};
