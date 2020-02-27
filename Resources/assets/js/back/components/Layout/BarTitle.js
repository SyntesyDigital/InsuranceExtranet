import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class BarTitle extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="page-bar">
        <div className="container">
          <div className="row">

            <div className="col-md-12">
              {this.props.backRoute !== undefined &&
                <a href={this.props.backRoute} className="btn btn-default"> <i className="fa fa-angle-left"></i> </a>
              }
              <h1><i className={this.props.icon}></i>{'\u00A0'}{this.props.title}</h1>
              <div className={'container-tabs'}>
                {this.props.slot}
              </div>
              <div className={'float-buttons pull-right'}>
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

BarTitle.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  backRoute: PropTypes.string,
};
