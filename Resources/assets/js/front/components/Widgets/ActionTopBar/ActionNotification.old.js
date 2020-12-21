import React, { Component } from 'react';
import ModalSidebar from './../ModalSidebar/ModalSidebar';
import MaskSvgNotificationHover from './assets/img/MaskSvgNotificationHover';
import MaskSvgNotification from './assets/img/MaskSvgNotification';
import './ActionTopBar.scss';


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
            display: false,
            //isHover: false,
            title : title,
            totalElement : totalElement,
            tableElement : tableElement,
            wsTotal : 0,
            loadingElement : true,
            elementModel : null,
            elementObject : null
        }
        this.handleModalSidebar = this.handleModalSidebar.bind(this);
    }

    componentDidMount() {
        this.query();
        this.loadElement();
    }

    query() {

        var self = this;
        const { totalElement } = this.state;

        /*
        axios.get('/architect/extranet/' + totalElement + '/model_values/data/1')
            .then(function (response) {
                if (response.status == 200
                    && response.data.modelValues !== undefined) {
                    console.log("ActionNotification  :: componentDidMount => ", response.data);

                    self.setState({
                        wsTotal: response.data.modelValues !== undefined ? parseInt(response.data.modelValues[0].val1) : 0,
                    });
                } 

            }).catch(function (error) {
                console.log(error);
                self.setState({
                    loading: false
                });
            });
            */
    }

    loadElement() {

        var self = this;
        axios.get(ASSETS+'/architect/extranet/element-modal/'+this.state.tableElement)
            .then(function(response) {
                if(response.status == 200
                    && response.data !== undefined)
                {
                console.log("ModalTable :: data => ",response.data);

                self.setState({
                    elementModel : response.data.model,
                    elementObject : response.data.element,
                    loadingElement : false
                });

                }
            }).catch(function (error) {
                console.log(error);
            });
    }

    // ==============================
    // Handlers
    // ==============================

    handleModalSidebar() {
        this.setState({
            display: !this.state.display
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
        
        return (
            <div>
                {!this.state.loadingElement && 
                    <ModalSidebar 
                        title={this.state.title}
                        display={this.state.display}
                        elementObject={this.state.elementObject}
                        elementModel={this.state.elementModel}
                    />
                }
                <a
                    onClick={this.handleModalSidebar.bind(this)}
                    className="tooltip-link-action"
                    title={this.state.title}
                    //onMouseEnter={this.setIsHover.bind(this, true)}
                    //onMouseLeave={this.setIsHover.bind(this, false)}
                >
                    <span className="notification icon">
                        {/*{this.state.isHover ? <MaskSvgNotificationHover /> : <MaskSvgNotification />}*/}
                        <MaskSvgNotification />
                        {this.state.wsTotal > 0 &&
                            <span className="number">{this.state.wsTotal}</span>
                        }
                    </span>
                </a>
            </div>
        )
    }
}
