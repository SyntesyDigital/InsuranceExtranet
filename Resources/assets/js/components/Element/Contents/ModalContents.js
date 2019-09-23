import React, {Component} from 'react';
import { render } from 'react-dom';
import {connect} from 'react-redux';

import {
  closeModalContents,
  selectContent
} from './../actions/';

import ContentDataTable from './ContentDataTable';

class ModalContents extends Component {

  constructor(props) {
    super(props);

    this.handleFieldSettingsChange = this.handleFieldSettingsChange.bind(this);
    this.onModalClose = this.onModalClose.bind(this);


    this.state = {
      id : 'modal-contents',
      isOpen : false,
      zIndex : 12000
    };

  }

  handleFieldSettingsChange(field) {
      this.props.changeFieldSettings(field);
  }

  onModalClose(e) {
    e.preventDefault();

    this.props.closeModalContents();
  }

  componentWillReceiveProps(nextProps) {
      console.log("ModalContents :: ",nextProps);

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

  getModalRoute() {
    return routes["contents.data"]+'?is_page=1&has_slug=1';
  }

  processContent(content) {


    var data = {
      id : content.id,
      title : content.title,
      params : []
    };

    return data;
  }

  handleSelectItem(item){

    console.log("ContentSelectModal :: handleSelectItem => ",item);

    if(item != null){
      this.props.selectContent(this.processContent(item));
    }
  }

  render() {

    var route = this.getModalRoute();

    return (
      <div style={{zIndex:this.state.zIndex}}>
        <div className="custom-modal" id={this.state.id}>
          <div className="modal-background"></div>
            <div className="modal-container">
              <div className="modal-header">

                  <h2>{Lang.get('fields.select_content')}</h2>

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

                        <ContentDataTable
                          init={this.state.isOpen}
                          route={route}
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
        display: state.contents.display,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeModalContents: () => {
            return dispatch(closeModalContents());
        },
        selectContent: (content) => {
            return dispatch(selectContent(content));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalContents);
