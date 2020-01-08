import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class BoxAddGroup extends Component {

  constructor(props) {
    super(props);

    this.state = {
      display: false
    };
  }



  render() {

    const { identifier, title } = this.props;

    const divStyle = {
      cursor: 'pointer',
      padding: '12px 20px',
      textAlign: 'center',
      border: '1px solid #ccc'
    };


    return (

      <div>
        <div id={"heading" + identifier} style={divStyle} onClick={this.props.onClick}>
          <span className="field-name">
            <i className="fa fa-plus"></i> {title}
          </span>
        </div>
      </div>
    );
  }
}

BoxAddGroup.propTypes = {
  identifier: PropTypes.string.isRequired,
  title: PropTypes.string,
  hideTab: PropTypes.bool,
};
