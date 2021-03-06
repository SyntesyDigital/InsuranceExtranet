import React, {Component} from 'react';
import { render } from 'react-dom';
import {connect} from 'react-redux';

import {
  closeModalElementParameters,
  updateElementParameter
} from './../../actions/';

import {
  isRequired,
  getRequiredIcon,
  checkValidParameters
} from './../../functions/';

class ModalElementParameters extends Component {

  constructor(props) {
    super(props);

    this.onModalClose = this.onModalClose.bind(this);

    this.state = {
      id : 'modal-element-parameters',
      isOpen : false,
      zIndex : 13000
    };

  }

  /*
  handleFieldSettingsChange(field) {
      this.props.changeFieldSettings(field);
  }
  */

  onModalClose(e) {
    e.preventDefault();

    this.props.closeModalElementParameters();
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
      <option value={item.identifier} key={index}>{item.name} ( {item.identifier} )</option>
    )
  }

  onChangeParameter(item,event) {
    //console.log("ModalParameters :: onChangeParameter => ",item,event.target.value);
    item.value = event.target.value;
    this.props.updateElementParameter(item);
  }

  renderParameters(params) {

    console.log("ModalParameters :: params => ",params);

    return params.map((item,index) => {

        return (

          <div className="parameter" key={index}>

            <div className="row parameter">
              <div className="col col-xs-6">

                <i className={getRequiredIcon(item)}></i> &nbsp;
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
    });
  }

  render() {

    const params = this.props.elements.element != null &&
      this.props.elements.element.params != null &&
      this.props.elements.element.params instanceof Array ?
      this.props.elements.element.params : [];

    console.log("ModalParameteres :: params => ",params);

    const valid = checkValidParameters(params);

    return (
      <div style={{zIndex:this.state.zIndex}}>
        <div className="custom-modal" id={this.state.id}>
          <div className="modal-background"></div>
            <div className="modal-container">
              <div className="modal-header">

                  <h2>Sélectionner des paramètres </h2> &nbsp;&nbsp;
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
        elements: state.elements,
        display: state.elements.displayParameters,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeModalElementParameters: () => {
            return dispatch(closeModalElementParameters());
        },
        updateElementParameter: (parameter) => {
            return dispatch(updateElementParameter(parameter));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalElementParameters);
