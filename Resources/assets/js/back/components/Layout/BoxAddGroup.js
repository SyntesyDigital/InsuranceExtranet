import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ButtonSecondary from './ButtonSecondary';

export default class BoxAddGroup extends Component {

  constructor(props) {
    super(props);

    this.state = {
      display: false
    };
  }

  handleClick(e) {
    e.preventDefault();

    this.props.onClick();
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

      <div id={identifier} className="box-add-group add-row-block">
        <ButtonSecondary
          label={title}
          icon='fa fa-plus-circle'
          onClick={this.handleClick.bind(this)}
        />
      </div>
    );
  }
}

BoxAddGroup.propTypes = {
  identifier: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClick : PropTypes.func.isRequired,
};
