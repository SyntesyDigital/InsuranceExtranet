import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class InputField extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { title } = this.props;
        return (
            <div>
                <label className="bmd-label-floating">
                    {title}
                </label>
                <input
                    type="text"
                    className="form-control"
                    name={this.props.name}
                />
            </div>
        );
    }
}

InputField.propTypes = {
    title: PropTypes.string,
    name: PropTypes.string,
};
