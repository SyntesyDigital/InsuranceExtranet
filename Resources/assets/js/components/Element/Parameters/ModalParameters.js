import React, {Component} from 'react';
import { render } from 'react-dom';
import {connect} from 'react-redux';

import {
  closeModalParameters,
  updateParameter
} from './../actions/';

class ModalParameters extends Component {

  constructor(props) {
    super(props);

    this.onModalClose = this.onModalClose.bind(this);

    this.state = {
      id : 'modal-parameters',
      isOpen : false,
      zIndex : 13000
    };

  }

  /*
  handleFieldSettingsChange(field) {
      this.props.changeFieldSettings(field);
  }
  */

  checkValidParameters(params) {

    if(params != null && params.length > 0){
        for(var key in params){
            if(params[key].value == ""){
              return false;
            }
        }
    }

    return true;
  }

  onModalClose(e) {
    e.preventDefault();

    this.props.closeModalParameters();
  }

  componentWillReceiveProps(nextProps) {
      console.log("ModalParameters :: ",nextProps);

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

  renderOptions() {
    return this.props.app.fieldsList.map((item,index) =>
      <option value={item.identifier} key={index}>{item.name}</option>
    )
  }

  onChangeParameter(item,event) {
    //console.log("ModalParameters :: onChangeParameter => ",item,event.target.value);
    item.value = event.target.value;
    this.props.updateParameter(item);
  }

  renderParameters(params) {

    console.log("ModalParameters :: params => ",params);

    return params.map((item,index) =>
        <div className="parameter" key={index}>

          <div className="row parameter">
            <div className="col col-xs-6">
              {item.name} ( {item.identifier} )
            </div>
            <div className="col col-xs-6 float-right">
              <div className="form-group bmd-form-group">
                <select className="form-control" value={item.value} onChange={this.onChangeParameter.bind(this,item)}>
                  <option value="" key="-1">---</option>
                  {this.renderOptions()}
                </select>
              </div>
            </div>
          </div>

        </div>
    );
  }

  render() {

    const params = this.props.contents.content != null &&
      this.props.contents.content.params != null &&
      this.props.contents.content.params instanceof Array ?
      this.props.contents.content.params : [];

    console.log("ModalParameteres :: params => ",params);

    const valid = this.checkValidParameters(params);

    return (
      <div style={{zIndex:this.state.zIndex}}>
        <div className="custom-modal" id={this.state.id}>
          <div className="modal-background"></div>
            <div className="modal-container">
              <div className="modal-header">

                  <h2>Sélectionner des paramètres</h2> &nbsp;&nbsp;
                  {!valid &&
                  <span className="text-danger">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                  }
                  {valid &&
                    <span className="text-success">
                      <i className="fas fa-check"></i>
                    </span>
                  }

                <div className="modal-buttons">
                  <a className="btn btn-default close-button-modal" onClick={this.onModalClose}>
                    <i className="fa fa-times"></i>
                  </a>
                </div>
              </div>

              <div className="modal-content">
                <div className="container">
                  <div className="row">
                    <div className="col-xs-12 col-md-8 col-md-offset-2">
                      {this.renderParameters(params)}
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
        contents: state.contents,
        display: state.contents.displayParameters,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeModalParameters: () => {
            return dispatch(closeModalParameters());
        },
        updateParameter: (parameter) => {
            return dispatch(updateParameter(parameter));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalParameters);
