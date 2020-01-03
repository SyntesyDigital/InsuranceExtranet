import React, { Component } from "react";
import Switch from "react-switch";
import PropTypes from 'prop-types';
import './../../../../sass/backend/layout/_toggle-switch.scss';

export default class ToggleSwitch extends Component {
  constructor(props) {
    super(props);
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
  }

  render() {
    const {title, disabled} = this.props;
    return (
      <div className="container-toggle-switch">
        <label>
        <span>{title}</span>
        <Switch
          checked={this.state.checked}
          onChange={this.handleChange}
          onColor="#86d3ff"
          onHandleColor="#2693e6"
          handleDiameter={30}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          height={20}
          width={48}
          className="react-switch"
          id="material-switch"
          disabled={disabled}
        />
      </label>
      </div>
    );
  }

  
}

ToggleSwitch.propTypes = {
  title: PropTypes.string,
  disabled: PropTypes.bool
};