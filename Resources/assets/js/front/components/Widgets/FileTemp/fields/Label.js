import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Label extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const h1Style = {
      paddingBottom: '15px',
      borderBottom: '1px solid'
    };

    const divStyle = {
      textAlign: this.props.textAlign
    };

    return (

      <div className="row label-field" style={divStyle}>
        <div className="col-sm-12">
          <h3 style={h1Style}>
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
