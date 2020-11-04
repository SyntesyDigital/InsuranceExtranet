import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Label extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const textStyle = {
      paddingBottom: '15px',
      // borderBottom: '1px solid #ccc',
      textTransform : 'uppercase'
    };

    const divStyle = {};
    const type= this.props.type ? this.props.type : '' ;

    return (

      <div style={divStyle}>
        <div className={"row "+this.props.textAlign+" "+type}>
          <h3 style={textStyle} className={this.props.border ? 'non-bordered' : null}>
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
  border: PropTypes.bool,
};
