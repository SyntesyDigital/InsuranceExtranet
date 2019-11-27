import React, {Component} from 'react';
import { render } from 'react-dom';
import {connect} from 'react-redux';

import {
  closeModalElements,
  selectElement
} from './../../actions/';

import ElementDataTable from './ElementDataTable';

class ModalElements extends Component {

  constructor(props) {
    super(props);

    this.handleFieldSettingsChange = this.handleFieldSettingsChange.bind(this);
    this.onModalClose = this.onModalClose.bind(this);

    this.state = {
      id : 'modal-elements',
      isOpen : false,
      zIndex : 12000
    };

  }

  handleFieldSettingsChange(field) {
      this.props.changeFieldSettings(field);
  }

  onModalClose(e) {
    e.preventDefault();

    this.props.closeModalElements();
  }

  componentWillReceiveProps(nextProps) {
      console.log("ModalElements :: ",nextProps);

      if(nextProps.display != this.state.isOpen){
          if(nextProps.display){
            this.openModal();
          }
          else {
            this.closeModal();
          }
      }
  }

  openModal() {
      $("#"+this.state.id).css({
          display: "block"
      });
      TweenMax.to($("#"+this.state.id), 0.5, {
          opacity: 1,
          ease: Power2.easeInOut
      });
      this.setState({
          isOpen : true
      });

  }

  closeModal() {
      var self = this;

      TweenMax.to($("#"+this.state.id), 0.5, {
          display: "none",
          opacity: 0,
          ease: Power2.easeInOut,
          onComplete: function() {
              self.setState({
                  isOpen : false
              });
          }
      });
  }

  processElement(element) {



    var data = {
      id : element.id,
      title : element.name,
      icon : element.icon,
      params : []
    };

    return data;
  }

  handleSelectItem(item){

    console.log("ElementSelectModal :: handleSelectItem => ",item);

    if(item != null){
      this.props.selectElement(this.processElement(item));
    }
  }

  render() {

    return (
      <div style={{zIndex:this.state.zIndex}}>
        <div className="custom-modal" id={this.state.id}>
          <div className="modal-background"></div>
            <div className="modal-container">
              <div className="modal-header">

                  <h2>Sélectionner l'element</h2>

                <div className="modal-buttons">
                  <a className="btn btn-default close-button-modal" onClick={this.onModalClose}>
                    <i className="fa fa-times"></i>
                  </a>
                </div>
              </div>

              <div className="modal-content">
                <div className="container">
                  <div className="row">
                    <div className="col-xs-12">

                        <ElementDataTable
                          init={this.state.isOpen}
                          onSelectItem={this.handleSelectItem.bind(this)}
                        />

                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <a href="" className="btn btn-default" onClick={this.onModalClose}> Fermer </a> &nbsp;
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
        display: state.elements.display,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeModalElements: () => {
            return dispatch(closeModalElements());
        },
        selectElement: (element) => {
            return dispatch(selectElement(element));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalElements);
