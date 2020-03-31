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
            <div className="check-field">
                <FormControlLabel
                    disabled={disabled}
                    control={
                        <Checkbox
                            name={name}
                            checked={checked}
                            value={value}
                            color="primary"
                            onChange={onChange}
                        />
                    }
                    label={text}
                />
            </div>
        );
    }
}

CheckField.propTypes = {
    text: PropTypes.string.isRequired,
    name: PropTypes.string,
    value: PropTypes.string,
    disabled: PropTypes.bool,
    checked: PropTypes.bool
};
