import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class IconField extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { icon, circle, checked, color, font } = this.props;

        const divStyle = {
            textAlign: 'center'
        };

        const iconStyle = {
            color: color,
            fontSize: font,
        };

        const spanStyle = {
            display: 'inline-block',
            paddingTop: '20px',
            paddingBottom: '20px',
            paddingLeft: '20px',
            paddingRight: '20px',
            borderRadius: '50%',
            border: '1px solid',
            borderColor: '#a2a8b3'  
        };

        return (
            <div className="container-icon" style={divStyle}>
                <span style={spanStyle}><i className={icon} style={iconStyle}></i></span>
            </div>
        );
    }
}

IconField.propTypes = {
    icon: PropTypes.string.isRequired,
    checked: PropTypes.string,
    circle: PropTypes.bool,
    color: PropTypes.string,
    font: PropTypes.string
};
