import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CustomIcon from './../../../Common/CustomIcon';

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

        const spanStyle = {
            display: 'inline-block',
            border: '1px solid',
            borderColor: color,
            width: 'calc(2* ' + font + ')',
            height: 'calc(2* ' + font + ')',
        };

        return (
            <div className="container-icon icon-field" style={divStyle}>
                <span style={spanStyle} className={circle ? 'border-radius' : ''}>
                    {icon != '' &&
                        <CustomIcon
                            icon={icon}
                        />
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
