import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class InputField extends Component {

    constructor(props) {
        super(props);
    }

    handleOnChange(e) {
        this.props.onChange(this.props.name,e.target.value);
    }

    render() {
        const { label, error } = this.props;
        return (
            <div className={"form-group bmd-form-group" + (error ? ' has-error' : '')}>
                {label !== undefined && label != "" && 
                    <label className="bmd-label-floating">
                        {label}
                    </label>
                }
                <input
                    type="text"
                    className="form-control"
                    name={this.props.name}
                    value={this.props.value}
                    placeholder={this.props.placeholder}
                    onChange={this.handleOnChange.bind(this)}
                />
            </div>
        );
    }
}

InputField.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    onChange : PropTypes.func
};
