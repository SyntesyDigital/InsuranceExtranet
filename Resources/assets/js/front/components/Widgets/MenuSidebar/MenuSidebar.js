import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SubMenuSidebar from './SubMenuSidebar';
import arrowRight from './assets/img/menu_right.svg';

export default class MenuSidebar extends Component {

    constructor(props) {
        super(props);
        const menu = props.menu ? JSON.parse(atob(props.menu)) : null;
        this.state = {
            menu: menu,
            asideOpen: false,
            children: [],
            itemCurrent: null,
            form: null,
            active: false
        }
    }

    handleLogOut(event) {
        event.preventDefault();
        this.state.form.submit();
    }

    handleSubmenuOpen(item) {

        this.setState({
            children: item.children,
            itemCurrent: item.name,
        });

        TweenMax.fromTo(".sub-menu-sidebar-container", 0.5, {
            // display: "block",
            left: "100%",
            visibility: "visible"
        }, {
            left: "0px",
            ease: Power2.easeInOut,
            onComplete: function () { }
        });

    }

    componentDidMount() {

        var children = [];
        var active = false;
        var itemCurrent = null;

        this.state.menu.map(function (item, i) {
            if (item) {
                item.children.map(function (child, i) {
                    if (item.children.length > 0) {
                        if (child.active == true) {
                            children = item.children;
                            active = true;
                            itemCurrent = item.name
                        }
                    }
                });
            }
        });

        this.setState({
            children: children,
            active: active,
            itemCurrent: itemCurrent
        });

        if (active) {
            TweenMax.fromTo(".sub-menu-sidebar-container", 0.5, {
                visibility: "visible",
                left: "100%"
            }, {
                left: "0px",
                ease: Power2.easeInOut,
                onComplete: function () { }
            });
        };
    }

    renderMenuItem() {

        const items = this.state.menu;

        return items.map((item, i) => {

            if (item) {
                var className = item.class !== undefined ? item.class : null;
                var id = item.id !== undefined ? item.id : null;
                var name = item.name !== undefined ? item.name : null;
                var icon = item.icon !== undefined ? item.icon : null;
                var url = item.url !== undefined ? item.url : null;
                var active = item.active !== undefined ? item.active : null;
                var children = item.children !== undefined && item.children.length > 0 ? item.children : null;

                return (
                    <li key={i} className={'menu-item ' + (active ? 'active' : '')}>
                        <a
                            onClick={children ? this.handleSubmenuOpen.bind(this, item) : null}
                            href={!children ? url : null}
                            id={id}
                            className={className + ' tooltip-link'}
                            title={name}
                        >
                            <i className={icon}></i>
                            <span className="sidebar-text">{name}</span>
                            {children &&
                                <span className="arrowright"><img src={arrowRight} /></span>
                            }
                        </a>
                    </li>
                )
            }

        });
    }

    render() {
        return (
            <div>
                <div className="menu-container">
                    <div id="sidebar-button" className="menu btn-ham open">
                        <div className="icon"></div>
                    </div>
                </div>
                <div className="logo-container">
                    <a href={this.props.routeHome}>
                        <img src={'/' + this.props.logo} alt="Logo" />
                    </a>
                </div>
                <div>
                    <div className="wrapper-menu">
                        <div className="sub-menu-sidebar-container">
                            <SubMenuSidebar
                                children={this.state.children ? this.state.children : []}
                                itemCurrent={this.state.itemCurrent}
                            />
                        </div>
                        <ul className="container-menu">
                            <li className="user-item">
                                <span className="sidebar-text">{this.props.currentUser}</span>
                                <a href="#" onClick={this.handleLogOut.bind(this)}>
                                    <i className="fas fa-power-off"></i>
                                </a>
                                <form
                                    ref={(ref) => { !this.state.form ? this.setState({ form: ref }) : null; }}
                                    id="logout-form"
                                    action={this.props.routeLogout}
                                    method="POST"
                                    style={{ display: 'none' }}
                                >
                                    <input
                                        type="hidden"
                                        name="_token"
                                        value={document.querySelector('meta[name="csrf-token"]').getAttribute('content')} />
                                </form>
                            </li>
                            <div className="wrapper-items">
                                {this.renderMenuItem()}
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('menuSidebar')) {

    document.querySelectorAll('[id=menuSidebar]').forEach(function (element) {
        var menu = element.getAttribute('menu');
        var routeHome = element.getAttribute('routeHome');
        var currentUser = element.getAttribute('currentUser');
        var logo = element.getAttribute('logo');
        var routeLogout = element.getAttribute('routeLogout');

        ReactDOM.render(<MenuSidebar
            menu={menu}
            routeHome={routeHome}
            currentUser={currentUser}
            logo={logo}
            routeLogout={routeLogout}
        />, element);
    });
}
