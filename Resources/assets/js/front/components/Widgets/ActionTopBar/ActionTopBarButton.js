import React, { Component } from 'react';
import ModalSidebar from './../ModalSidebar/ModalSidebar';
import MaskSvgDraft from './assets/img/MaskSvgDraft';
import './ActionTopBar.scss';

import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import ModalTable from './../Table/ModalTable';

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: STYLES.elementForm.backgroundColorTooltipDescForm,
        color: STYLES.elementForm.colorTooltipDescForm,
        maxWidth: 220,
        fontSize: STYLES.elementForm.fontSizeTooltipDescForm,
        borderRadius: 0,
        padding: '5px',
    },
}))(Tooltip);

export default class ActionTopBarButton extends Component {
    constructor(props) {
        super(props)

        
        this.state = {
            display: true,
            isHover: false,
            title : props.title,
            totalElement : props.totalElement,
            tableElement : props.tableElement,
            wsTotal : 0,
            loadingElement : true,
            elementModel : null,
            elementObject : null,

            displayModal : false,
            modalUrl : null,
            redirectUrl : null,
        }
        this.handleModalSidebar = this.handleModalSidebar.bind(this);
    }

    componentDidMount() {
        this.query();
        this.loadElement();

        var self = this;
        
        $(document).on('click',function(e){
            var container = $("#"+self.props.id);

            // if the target of the click isn't the container nor a descendant of the container
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                self.setState({
                    display : false
                });
            }
        });
        
    }

    query() {

        var self = this;
        const { totalElement } = this.state;

        /*
        //temporal fix to avoid local bug WS don't load
        if(ENV == 'local')
            return;
        */
        
        axios.get('/architect/extranet/' + totalElement + '/model_values/data/1')
            .then(function (response) {
                if (response.status == 200
                    && response.data.modelValues !== undefined) {
                    //console.log("ActionNotification  :: componentDidMount => ", response.data);

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
    }

    loadElement() {

        var self = this;
        axios.get(ASSETS+'/architect/extranet/element-modal/'+this.state.tableElement)
            .then(function(response) {
                if(response.status == 200
                    && response.data !== undefined)
                {
                //console.log("ModalTable :: data => ",response.data);

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
        TweenMax.to("#"+this.props.id, 0.5, {
            right: this.state.display ? "0px" : "-312px",
            visibility: "visible"
        }, {
            ease: Power2.easeInOut,
            onComplete: function () { }
        });
    }

    handleModalSidebar() {
        this.setState({
            display: !this.state.display
        });
        
    }

    /**
    * Open modal with url [element_id]?[params]
    */
    handleOpenModal(elementUrl,redirectUrl){
        console.log("ActionTopBarButton :: handleOpenModal : (elementUrl,redirectUrl)",elementUrl,redirectUrl);

        this.setState({
            displayModal : true,
            modalUrl : elementUrl,
            redirectUrl : redirectUrl
        });
    }

    handleModalClose(){
        this.setState({
          displayModal : false
        });
      }

    handleFormFinished() {

        this.setState({
            displayModal : false
        });

        //this.tableRef.current.refreshTable();
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
                        id={this.props.id}
                        title={this.state.title}
                        display={this.state.display}
                        elementObject={this.state.elementObject}
                        elementModel={this.state.elementModel}
                        onOpenModal={this.handleOpenModal.bind(this)}
                    />
                }

                {!this.state.loadingElement && 
                    <ModalTable
                        field={this.props.field}
                        display={this.state.displayModal}
                        id={"modal-table-component-"+this.props.id}
                        zIndex={1000}
                        onModalClose={this.handleModalClose.bind(this)}
                        modalUrl={this.state.modalUrl}
                        redirectUrl={this.state.redirectUrl}
                        onOpenModal={this.handleOpenModal.bind(this)}
                        onFormFinished={this.handleFormFinished.bind(this)}
                        size={'small'}
                    />
                }


                <HtmlTooltip
                    title={
                        <span className={'content-desc'}>
                            {this.state.title ? this.state.title : ''}
                        </span>
                    }
                    placement="bottom"
                >
                    <a
                        onClick={this.handleModalSidebar.bind(this)}
                        className="tooltip-link-action"
                    >
                        <span className="draft icon">
                            {this.props.icon}
                            {this.state.wsTotal > 0 &&
                                <span className="number">{this.state.wsTotal}</span>
                            }
                        </span>
                    </a>
                </HtmlTooltip>
            </div>
        )
    }
}
