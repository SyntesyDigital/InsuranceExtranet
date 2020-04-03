import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Label extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const textStyle = {
      paddingBottom: '15px',
      borderBottom: '1px solid #ccc',
      marginBottom: '0'
    };

    const divStyle = {};

    return (

      <div style={divStyle}>
        <div className={"row "+this.props.textAlign}>
          <h3 style={textStyle}>
            {this.props.text}
          </h3>
        </div>
      </div>
    );
  }
}

Label.propTypes = {
  text: PropTypes.string.isRequired,
  textAlign: PropTypes.string,
};
