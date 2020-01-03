import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CollapsableGroup extends Component {

  constructor(props) {
    super(props);

    this.state = {
      display: false,
    };
  }

  openModal(e) {
    if (e !== undefined) {
      e.preventDefault();
    }

    this.setState({
      display: true
    });
  }

  handleModalClose() {
    this.setState({
      display: false
    });
  }

  render() {

    const hideTab = this.props.hideTab !== undefined && this.props.hideTab == true ? true : false;
    const { identifier, title, icon } = this.props;

    return (

      <div>
        <div className="field-item">
          <button style={{ display: (hideTab ? 'none' : 'block') }} id={"heading" + identifier} className="btn btn-link" data-toggle="collapse" data-target={"#collapse" + identifier} aria-expanded="true" aria-controls={"collapse" + identifier}>
            <span className="field-name">
              {title}
              {icon ? <a href="#" onClick={this.props.onClick}><i className={icon}></i></a> : false}
            </span>
          </button>
          <div id={"collapse" + identifier} className="collapse in" aria-labelledby={"heading" + identifier} aria-expanded="true" aria-controls={"collapse" + identifier}>
            <div className="row box">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CollapsableGroup.propTypes = {
  identifier: PropTypes.string.isRequired,
  title: PropTypes.string,
  hideTab: PropTypes.bool,
  icon: PropTypes.string,
};
