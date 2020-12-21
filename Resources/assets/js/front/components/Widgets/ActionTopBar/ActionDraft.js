import React, { Component } from 'react';
import ModalSidebar from './../ModalSidebar/ModalSidebar';
import MaskSvgDraft from './assets/img/MaskSvgDraft';
import './ActionTopBar.scss';
import ActionTopBarButton from './ActionTopBarButton';

export default class ActionDraft extends Component {
    constructor(props) {
        super(props)

        const title = SITE_CONFIG_GENERAL.TITLE_DRAFT_BTN !== undefined
            && SITE_CONFIG_GENERAL.TITLE_DRAFT_BTN.value !== null ?
            SITE_CONFIG_GENERAL.TITLE_DRAFT_BTN.value
            : '';

        const totalElement = SITE_CONFIG_GENERAL.WS_TOTAL_DRAFT_BTN !== undefined
            && SITE_CONFIG_GENERAL.WS_TOTAL_DRAFT_BTN.value !== null ?
            SITE_CONFIG_GENERAL.WS_TOTAL_DRAFT_BTN.value
            : '';

        const tableElement = SITE_CONFIG_GENERAL.MODEL_EXECUTE_DRAFT !== undefined
            && SITE_CONFIG_GENERAL.MODEL_EXECUTE_DRAFT.value !== null ?
            SITE_CONFIG_GENERAL.MODEL_EXECUTE_DRAFT.value
            : '';

        this.state = {
            title : title,
            totalElement : totalElement,
            tableElement : tableElement,
        }
    }


    // ==============================
    // Renderers
    // ==============================

    render() {
        

        return (
            <ActionTopBarButton 
                id={'action-draft'}
                title={this.state.title}
                totalElement={this.state.totalElement}
                tableElement={this.state.tableElement}
                icon={<MaskSvgDraft />}
            />
                
        )
    }
}
