import React, { Component } from 'react';
import ModalSidebar from './../ModalSidebar/ModalSidebar';
import MaskSvgNotificationHover from './assets/img/MaskSvgNotificationHover';
import MaskSvgNotification from './assets/img/MaskSvgNotification';
import './ActionTopBar.scss';


export default class ActionNotification extends Component {
    constructor(props) {
        super(props)
        this.state = {
            display: true,
            isHover: false
        }
        this.handleModalSidebar = this.handleModalSidebar.bind(this);
    }

    // ==============================
    // Handlers
    // ==============================

    handleModalSidebar() {
        this.setState({
            display: !this.state.display
        });
        TweenMax.to(".modal-sidebar", 0.5, {
            right: this.state.display ? "0px" : "-312px",
            visibility: "visible"
        }, {
            ease: Power2.easeInOut,
            onComplete: function () { }
        });
    }

    // ==============================
    // Setters
    // ==============================

    setIsHover(event) {
        this.setState({
            isHover: event,
        })
    }

    // ==============================
    // Renderers
    // ==============================

    render() {
        const title = SITE_CONFIG_GENERAL.TITLE_NOTIFICATION_BTN !== undefined
            && SITE_CONFIG_GENERAL.TITLE_NOTIFICATION_BTN.value !== null ?
            SITE_CONFIG_GENERAL.TITLE_NOTIFICATION_BTN.value
            : '';

        const wsTotal = SITE_CONFIG_GENERAL.WS_TOTAL_NOTIFICATION_BTN !== undefined
            && SITE_CONFIG_GENERAL.WS_TOTAL_NOTIFICATION_BTN.value !== null ?
            SITE_CONFIG_GENERAL.WS_TOTAL_NOTIFICATION_BTN.value
            : '';

        return (
            <div>
                <ModalSidebar />
                <a
                    onClick={this.handleModalSidebar.bind(this)}
                    className="tooltip-link-action"
                    title={title}
                    onMouseEnter={this.setIsHover.bind(this, true)}
                    onMouseLeave={this.setIsHover.bind(this, false)}
                >
                    <span className="notification icon">
                        {this.state.isHover ? <MaskSvgNotificationHover /> : <MaskSvgNotification />}
                        <span className="number">{wsTotal}</span>
                    </span>
                </a>
            </div>
        )
    }
}
