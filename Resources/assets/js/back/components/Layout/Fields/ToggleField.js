import React, { Component } from "react";
import Switch from "react-switch";
import PropTypes from 'prop-types';

export default class ToggleField extends Component {
  constructor(props) {
    super(props);

  }

  handleOnChange(value) {
    this.props.onChange(this.props.name,value);
  }

  render() {
    const {label, disabled} = this.props;
    return (
      <div className="container-toggle-switch">
        <label>
        <span>{label}</span>
        <Switch
          checked={this.props.checked}
          onChange={this.handleOnChange.bind(this)}
          onColor="#86d3ff"
          onHandleColor="#2693e6"
          handleDiameter={20}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          height={10}
          width={35}
          className="react-switch"
          id="material-switch"
          disabled={disabled}
        />
      </label>
      </div>
    );
  }

  
}

ToggleField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  checked : PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  onChange : PropTypes.func
};