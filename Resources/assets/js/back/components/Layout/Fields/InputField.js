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
                <label className="bmd-label-floating">
                    {label}
                </label>
                <input
                    type="text"
                    className="form-control"
                    name={this.props.name}
                    value={this.props.value}
                    onChange={this.handleOnChange.bind(this)}
                />
            </div>
        );
    }
}

InputField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange : PropTypes.func
};
