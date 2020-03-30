import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';


export default class CheckField extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { text, disabled } = this.props;
    
        return (
            <div className="check-field">
                <FormControlLabel
                    disabled={disabled}
                    control={
                        <Checkbox
                            checked={this.props.value}
                            value={this.props.name}
                            color="primary"
                            onChange={this.props.onChange}
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
    value: PropTypes.bool,
    disabled: PropTypes.bool
};
