import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';

import {
  cancelLayout,
  saveSelectedLayout
} from './../actions/';

import LayoutDataTable from './LayoutDataTable';

class LayoutSelectModal extends Component {

    constructor(props)
    {
        super(props);
    }

    componentDidMount(){
      if(this.props.modalLayout.displayModal){
          this.modalOpen();
      }
    }

    componentWillReceiveProps(nextProps)
    {
      if(nextProps.modalLayout.displayModal){
          this.modalOpen();
      } else {
          this.modalClose();
      }
    }

    onModalClose(e){
        e.preventDefault();
        this.props.cancelLayout();
    }

    modalOpen()
    {
        TweenMax.to($("#layout-select"),0.5,{opacity:1,display:"block",ease:Power2.easeInOut});
    }

    modalClose() {
      var self =this;
        TweenMax.to($("#layout-select"),0.5,{display:"none",opacity:0,ease:Power2.easeInOut,onComplete:function(){

        }});
    }

    handleLayoutSelected(layoutId) {

      //console.log("PageContainer :: handleLayoutSelected => "+layoutId);

      var _this = this;

      bootbox.confirm({
         message: Lang.get('modals.load_template_alert'),
         buttons: {
           confirm: {
               label: Lang.get('fields.si'),
               className: 'btn-primary'
           },
           cancel: {
               label: Lang.get('fields.no'),
               className: 'btn-default'
           }
         },
         callback: function (result) {
            if(result) {
              _this.props.saveSelectedLayout(layoutId);
            }
         }
       });

       this.setState({
         displayLayoutModal : false
       })
    }


    render() {

        var zIndex = this.props.zIndex !== undefined ? this.props.zIndex : 10000;

        return (
          <div style={{zIndex:zIndex}}>
            <div className="custom-modal" id="layout-select">
              <div className="modal-background"></div>


                <div className="modal-container">
                    <div className="modal-header">

                      <h2>{Lang.get('fields.select_template')}</h2>

                      <div className="modal-buttons">
                        <a className="btn btn-default close-button-modal" onClick={this.onModalClose.bind(this)}>
                          <i className="fa fa-times"></i>
                        </a>
                      </div>
                    </div>
                  <div className="modal-content">
                    <div className="container">
                      <div className="row">
                        <div className="col-xs-12">

                          <LayoutDataTable
                            route={routes["pagelayouts.data"]}
                            onSelectItem={this.handleLayoutSelected.bind(this)}
                          />

                        </div>
                      </div>
                    </div>

                    <div className="modal-footer">
                      <a href="" className="btn btn-default" onClick={this.onModalClose.bind(this)}> {Lang.get('fields.cancel')} </a> &nbsp;
                    </div>

                  </div>

              </div>
            </div>
          </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        app: state.app,
        modalLayout : state.modalLayout
    }
}

const mapDispatchToProps = dispatch => {
    return {
        cancelLayout: () => {
            return dispatch(cancelLayout());
        },
        saveSelectedLayout : (layoutId) => {
            return dispatch(saveSelectedLayout(layoutId));
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LayoutSelectModal);
