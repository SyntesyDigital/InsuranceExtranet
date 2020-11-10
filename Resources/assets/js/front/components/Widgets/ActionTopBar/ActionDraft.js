import React, { Component } from 'react';
import ModalSidebar from './../ModalSidebar/ModalSidebar';
import MaskSvgDraft from './assets/img/MaskSvgDraft';
import './ActionTopBar.scss';

export default class ActionDraft extends Component {
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
        const title = SITE_CONFIG_GENERAL.TITLE_DRAFT_BTN !== undefined
            && SITE_CONFIG_GENERAL.TITLE_DRAFT_BTN.value !== null ?
            SITE_CONFIG_GENERAL.TITLE_DRAFT_BTN.value
            : '';

        const wsTotal = SITE_CONFIG_GENERAL.WS_TOTAL_DRAFT_BTN !== undefined
            && SITE_CONFIG_GENERAL.WS_TOTAL_DRAFT_BTN.value !== null ?
            SITE_CONFIG_GENERAL.WS_TOTAL_DRAFT_BTN.value
            : '';

        return (
            <div>
                <ModalSidebar />
                <a
                    onClick={this.handleModalSidebar.bind(this)}
                    className="tooltip-link-action"
                    title={title}
                >
                    <span className="draft icon">
                        <MaskSvgDraft />
                        <span className="number">{wsTotal}</span>
                    </span>
                </a>
            </div>
        )
    }
}
