import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CollapsableGroup extends Component {

  constructor(props) {
    super(props);

    this.state = {
      display: false,
    };
  }



  render() {

    const hideTab = this.props.hideTab !== undefined && this.props.hideTab == true ? true : false;
    const { identifier, title, iconHovered, iconDefault, isEdit } = this.props;

    return (

      <div>
        <div className="field-item">
          <button style={{ display: (hideTab ? 'none' : 'block') }} id={"heading" + identifier} className="btn btn-link" data-toggle="collapse" data-target={"#collapse" + identifier} aria-expanded="true" aria-controls={"collapse" + identifier}>
            <span className="field-name">
              <i className={iconDefault}></i>
              {' '}{title}
              {isEdit ? <a href="#" className="no-collapsable" style={{ color: "#455660" }} onClick={this.props.onClick}><i className={iconHovered}></i></a> : false}
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
  iconHovered: PropTypes.string,
  iconDefault: PropTypes.string,
  isEdit: PropTypes.bool
};

