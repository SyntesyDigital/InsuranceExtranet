import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class SelectField extends Component {

    constructor(props) {
        super(props)
    }

    // ==============================
    // Handlers
    // ==============================

    handleChange(event) {
        this.props.onChange(this.props.name, event.target.value);
    }

    // ==============================
    // Renderers
    // ==============================

    render() {

        const { label } = this.props;

        const selectStyle = {
            backgroundImage: 'linear-gradient(45deg, transparent 50%, gray 50%), linear-gradient(135deg, gray 50%, transparent 50%), linear-gradient(to right, #ccc, #ccc)',
            backgroundPosition: 'calc(100% - 20px) calc(1em + 2px), calc(100% - 15px) calc(1em + 2px), calc(100% - 2.5em) 0.5em',
            backgroundSize: '5px 5px, 5px 5px, 1px 1.5em',
            backgroundRepeat: 'no-repeat',
            borderBottom: '1px solid #ccc',
        };

        let arrayOfOptions = this.props.arrayOfOptions;

        let options = arrayOfOptions.map((data, index) =>
            <option
                key={index}
                value={data.value}
            >
                {data.name}
            </option>
        );

        return (
            <div className={"form-group bmd-form-group sidebar-item" + (this.props.error ? ' has-error' : '')}>
                <label htmlFor="parent_id" className="bmd-label-floating">
                    {label}
                </label>
                <select
                    className="form-control"
                    name={this.props.name}
                    onChange={this.handleChange.bind(this)}
                    style={selectStyle}
                    value={this.props.value}
                >
                    {options}
                </select>
            </div>
        )
    }
}

SelectField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func
};
