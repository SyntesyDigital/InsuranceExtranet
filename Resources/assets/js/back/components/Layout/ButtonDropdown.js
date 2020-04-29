import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ButtonDropdown extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
          selected: '',
        }
    }

    renderList() {

      if(this.props.list === undefined)
        return null;
      
      return this.props.list.map((item,index) => 
        <li key={index}>
          <a href={item.route} className={'dropdown-item '+ item.className} onClick={item.onClick}>
            <i className={item.icon}></i>&nbsp;{item.label}
          </a>
        </li>
      );
    }

    render() {
        return (
          <div className="actions-dropdown button-dropdown">
            <a href="#" className="dropdown-toggle btn btn-default" data-toggle="dropdown" aria-expanded="false">
              {this.props.label}
              <b className="caret"></b>
              <div className="ripple-container"></div>
            </a>
            <ul className="dropdown-menu dropdown-menu-right default-padding">
              <li className="dropdown-header"></li>
              {this.renderList()}
            </ul>
          </div>
        );
    }
}

ButtonDropdown.propTypes = {
  label: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  disabled: PropTypes.string
   
};
