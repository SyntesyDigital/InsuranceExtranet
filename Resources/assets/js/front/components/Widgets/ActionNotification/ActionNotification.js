import React, { Component } from 'react';
import ModalSidebar from './../ModalSidebar/ModalSidebar';
import './ActionNotification.scss';


export default class ActionNotification extends Component {
    constructor(props) {
        super(props)
        this.state = {
            display: true,
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
    // Renderers
    // ==============================

    render() {
        return (
            <div>
                <ModalSidebar />
                <a
                    onClick={this.handleModalSidebar.bind(this)}
                    className="tooltip-link-action"
                    title={'Notification'}
                >
                    <span className="notification icon">
                        <span className="number">6</span>
                    </span>
                </a>
            </div>
        )
    }
}
