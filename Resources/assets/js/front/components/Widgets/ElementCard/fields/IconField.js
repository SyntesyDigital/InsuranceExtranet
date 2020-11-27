import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class IconField extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { icon, circle, color, font } = this.props;

        const divStyle = {
            textAlign: 'center',
            margin: '30px'
        };

        const iconStyle = {
            color: color,
            fontSize: font,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)'
        };

        const spanStyle = {
            display: 'inline-block',
            paddingTop: '20px',
            paddingBottom: '20px',
            paddingLeft: '20px',
            paddingRight: '20px',
            border: '1px solid',
            borderColor: color,
            width: 'calc(2* ' + font + ')',
            height: 'calc(2* ' + font + ')',
        };

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


        return (
            <div className="container-icon" style={divStyle}>
                <span style={spanStyle} className={circle ? 'border-radius' : null}>
                    {icon != '' && hasFontAwesome &&
                        <i className={icon} style={iconStyle}></i>
                    }
                    {icon != '' && hasCreaticLib &&
                        <svg className={'icon ' + icon}>
                            <use xlinkHref={'#' + icon}></use>
                        </svg>
                    }
                </span>
            </div>
        );
    }
}

IconField.propTypes = {
    icon: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    circle: PropTypes.bool,
    color: PropTypes.string,
    font: PropTypes.string
};
