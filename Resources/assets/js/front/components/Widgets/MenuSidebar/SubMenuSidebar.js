import React, { Component } from 'react';
import PropTypes from 'prop-types';
import arrowLeft from './assets/img/menu_left.svg';
import { isMobile } from 'react-device-detect';


export default class SubMenuSidebar extends Component {

  constructor(props) {
    super(props);
  };

  handleSubmenuClose() {
    TweenMax.fromTo(".sub-menu-sidebar-container", 0.5, {
      display: "block",
      left: "0px"
    }, {
      left: (isMobile ? "100%" : STYLES.sidebarMenu.sidebarWidth),
      ease: Power2.easeInOut,
      onComplete: function () { }
    })
  }

  renderMenuItem() {
    const items = this.props.children;
    return (items.map((item, i) => (
      <li key={i} className={"menu-child " + (item.active ? 'active' : '')}>
        <a
          href={item.url}
          id={item.id}
          className={item.class + ' tooltip-link'}
          title={item.name ? item.name : null}>
          <i className={item.icon ? item.icon : null}></i>
          <span className="sidebar-text">{item.name ? item.name : null}</span>
          {item.children.length > 0 ?
            <span className="arrowright"><i className={'fas fa-angle-right'}></i></span>
            : null}
        </a>
      </li>
    )));
  }

  render() {
    return (
      <div className="container-submenu">
        <ul className="menu-children">
          <li className="menu-child parent">
            <a href="#" onClick={this.handleSubmenuClose.bind(this)}>
              <i className="fas fa-minus"></i>
              <span className="sidebar-text">{this.props.itemCurrent}</span>
              <span className="arrowLeft"><img src={arrowLeft} /></span>
            </a>
          </li>
          {this.renderMenuItem()}
        </ul>
      </div>
    );
  }
}

SubMenuSidebar.propTypes = {
  children: PropTypes.array,
  itemCurrent: PropTypes.string
};

