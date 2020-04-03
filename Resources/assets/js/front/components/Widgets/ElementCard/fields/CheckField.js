import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default class CheckField extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { 
            text, 
            disabled, 
            checked, 
            value, 
            onChange 
        } = this.props;
    
        return (
            <div style={divStyle} className={(stripped ? 'stripped' : null)}>
                <Row>
                    {checked && 
                        <i className="fas fa-check-square"></i>
                    }
                    {!checked && 
                        <i className="far fa-square"></i>
                    }
                    {text}
                </Row>
            </div>
        );
    }
}

CheckField.propTypes = {
    text: PropTypes.string.isRequired,
    name: PropTypes.string,
    value: PropTypes.string,
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
    stripped: PropTypes.bool,
};
