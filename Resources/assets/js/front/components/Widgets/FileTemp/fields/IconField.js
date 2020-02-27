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
        };

        const spanStyle = {
            display: 'inline-block',
            paddingTop: '20px',
            paddingBottom: '20px',
            paddingLeft: '20px',
            paddingRight: '20px',
            border: '1px solid',
            borderColor: '#a2a8b3'  
        };

        return (
            <div className="container-icon" style={divStyle}>
                <span style={spanStyle} className={circle ? 'border-radius' : null}><i className={icon} style={iconStyle}></i></span>
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
