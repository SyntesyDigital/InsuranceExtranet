import React, {Component} from 'react';
import { render } from 'react-dom';

import TextField from './TextField';

import {
  getFieldComponent
} from './../functions/';

class ModalListField extends Component {

  constructor(props){
    super(props);

    //console.log(" ModalListField :: construct ",props);

    this.state = {
      values : {},
      inModal : false
    };

    this.isOn = false;

    this.onModalClose = this.onModalClose.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  static getDerivedStateFromProps(props, state) {

    if($("#modal-list-field-"+props.id,'#modal-table-component').length == 1) {
      return {
        ...state,
        inModal : true
      }
    }

    return  null;
  }

  componentDidMount() {

    if(this.props.display){
        this.modalOpen();
    }

  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.display){
      if(!this.isOn){
        this.isOn = true;
        this.modalOpen(this.props.initValue);
      }
    } else {
      if(this.isOn)
        this.modalClose();
    }
  }

  onModalClose(e){
      e.preventDefault();
      this.props.onModalClose();
  }

  modalOpen(initValues)
  {
    this.setState({
      values : initValues != null ? initValues : this.initValues()
    });
    console.log("is in modal ? ",this.state.inModal);

    if(!this.state.inModal)
      $('body').css({overflow:'hidden'});

    TweenMax.to($("#modal-list-field-"+this.props.id),0.5,{opacity:1,display:"block",ease:Power2.easeInOut});
  }

  modalClose() {

    this.isOn = false;

    var self = this;
      TweenMax.to($("#modal-list-field-"+this.props.id),0.5,{display:"none",opacity:0,ease:Power2.easeInOut,onComplete:function(){

        if(!self.state.inModal)
          $('body').css({overflow:'auto'});
      }});
  }

  handleOnChange(field) {
    const {values} = this.state;

    values[field.name] = field.value;

    this.setState({
      values : values
    });
  }

  renderItems() {

    console.log("ModalListFields :: renderItems => ",this.props.fields);

    if(this.props.fields === undefined || this.props.fields == null){
      return null;
    }

    var fields = [];

    for(var key in this.props.fields) {
      var field = this.props.fields[key];
      const FieldComponent = getFieldComponent(field.type);
      fields.push(<FieldComponent
          key={key}
          field={field}
          value={this.state.values[field.identifier]}
          onFieldChange={this.handleOnChange}
          values={this.state.values}
        />);
    }

    return fields;

  }

  initValues() {

    //else just empty object
    if(this.props.fields === undefined || this.props.fields == null){
      return {};
    }
    var result = {};
    for(var key in this.props.fields) {
      result[this.props.fields[key].identifier] = '';
    }

    return result;
  }

  checkAllFilled() {
    const {values} = this.state;

    for(var key in values){
      if(values[key] === undefined || values[key] == null
        || values[key] == ''){
          return false;
      }
    }

    return true;
  }


  checkAnyFilled() {
    const {values} = this.state;

    for(var key in values){
      if(values[key] !== undefined && values[key] != null
        && values[key] != ''){
          return true;
      }
    }

    return false;

  }

  onSubmit(e) {
    e.preventDefault();

    const {values} = this.state;

    var self = this;

    if(!this.checkAnyFilled()){
      toastr.error('Vous devez remplir les champs.');
    }
    else {
      self.props.onAjouter(values);
      self.props.onModalClose();
    }

  }

  render() {

    return (
      <div
        className="custom-modal modal-list-field"
        id={"modal-list-field-"+this.props.id}
        style={{
          zIndex: this.props.zIndex !== undefined ? this.props.zIndex : 500
        }}
      >
          <div className="modal-background"></div>


          <div className="modal-container">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Ajouter {this.props.name}</h2>

                <div className="modal-buttons">
                  <a className="btn btn-default close-button-modal" onClick={this.onModalClose}>
                    <i className="fa fa-times"></i>
                  </a>
                </div>
              </div>

              <div className="modal-body">

                <div className="row">
                  <div className="col-xs-12 col-md-10 col-md-offset-1">
                    {this.renderItems()}
                  </div>
                </div>

              </div>

              <div className="modal-footer">

                <a href="" className="btn btn-default" onClick={this.onModalClose}>
                  <i className="fa fa-angle-left"></i> Retour
                </a> &nbsp;
                <a href="" className="btn btn-primary" onClick={this.onSubmit.bind(this)}>
                  <i className="fas fa-plus"></i> Ajouter
                </a>
              </div>

            </div>
         </div>
      </div>
    );
  }

}

export default ModalListField;
