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

        return (items.map((item, i) => {

            if (item) {
                var className = item.class !== undefined ? item.class : null;
                var id = item.id !== undefined ? item.id : null;
                var name = item.name !== undefined ? item.name : null;
                var icon = item.icon !== undefined ? item.icon : null;
                var url = item.url !== undefined ? item.url : null;
                var active = item.active !== undefined ? item.active : null;
                var children = item.children !== undefined && item.children.length > 0 ? item.children : null;

                return (
                    <li key={i} className={"menu-child " + (active ? 'active' : '')}>
                        <a
                            href={url}
                            id={id}
                            className={className + ' tooltip-link'}
                            title={name}>
                            <i className={icon}></i>
                            <span className="sidebar-text">{name}</span>
                            {children &&
                                <span className="arrowright"><i className={'fas fa-angle-right'}></i></span>
                            }
                        </a>
                    </li>
                )
            }
        }));
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

