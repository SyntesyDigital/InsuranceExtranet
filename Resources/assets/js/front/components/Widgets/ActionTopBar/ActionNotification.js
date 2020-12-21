import React, { Component } from 'react';
import ModalSidebar from './../ModalSidebar/ModalSidebar';
import MaskSvgNotificationHover from './assets/img/MaskSvgNotificationHover';
import MaskSvgNotification from './assets/img/MaskSvgNotification';
import './ActionTopBar.scss';

import ActionTopBarButton from './ActionTopBarButton';


export default class ActionNotification extends Component {
    constructor(props) {
        super(props)

        const title = SITE_CONFIG_GENERAL.TITLE_NOTIFICATION_BTN !== undefined
            && SITE_CONFIG_GENERAL.TITLE_NOTIFICATION_BTN.value !== null ?
            SITE_CONFIG_GENERAL.TITLE_NOTIFICATION_BTN.value
            : '';

        const totalElement = SITE_CONFIG_GENERAL.WS_TOTAL_NOTIFICATION_BTN !== undefined
            && SITE_CONFIG_GENERAL.WS_TOTAL_NOTIFICATION_BTN.value !== null ?
            SITE_CONFIG_GENERAL.WS_TOTAL_NOTIFICATION_BTN.value
            : '';

        const tableElement = SITE_CONFIG_GENERAL.MODEL_EXECUTE_NOTIFICATION !== undefined
            && SITE_CONFIG_GENERAL.MODEL_EXECUTE_NOTIFICATION.value !== null ?
            SITE_CONFIG_GENERAL.MODEL_EXECUTE_NOTIFICATION.value
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
                id={'action-notification'}
                title={this.state.title}
                totalElement={this.state.totalElement}
                tableElement={this.state.tableElement}
                icon={<MaskSvgNotification />}
            />
        )
    }
}
