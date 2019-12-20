import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class CollapsableGroup extends Component {

    constructor(props)
    {
        super(props);
    }

    render() {

      const hideTab = this.props.hideTab !== undefined && this.props.hideTab == true ? true : false;
      const {identifier,title} = this.props;

      return (
        <div className="field-item">
          <button  style={{display:(hideTab ? 'none' : 'block')}}  id={"heading"+identifier} className="btn btn-link" data-toggle="collapse" data-target={"#collapse"+identifier} aria-expanded="true" aria-controls={"collapse"+identifier}>
            <span className="field-name">
              {title}
            </span>
          </button>
          <div id={"collapse"+identifier} className="collapse in" aria-labelledby={"heading"+identifier} aria-expanded="true" aria-controls={"collapse"+identifier}>
            <div className="row box">
              {this.props.children}
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
};
