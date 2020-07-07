import React, {Component} from 'react';
import { render } from 'react-dom';


import {
  OPERATOR_EQUAL,
  OPERATOR_DIFFERENT,
  CONDITION_FIELD_TYPE_PARAMETER,
  CONDITION_FIELD_TYPE_CONFIGURABLE
} from './../../../constants';

class ConditionsModal extends Component {

  constructor(props) {
    super(props);

    this.onModalClose = this.onModalClose.bind(this);

    this.state = {
      id : 'modal-conditions',
      isOpen : false,
      zIndex : 13000,
      fields : []
    };

    this.operators = [
      {
        name : "Égal",
        value : OPERATOR_EQUAL
      },
      {
        name : "Différent",
        value : OPERATOR_DIFFERENT
      }
    ];

    this.types = [
      {
        name : "Paramètre",
        value : CONDITION_FIELD_TYPE_PARAMETER
      },
      {
        name : "Champ configurable",
        value : CONDITION_FIELD_TYPE_CONFIGURABLE
      }
    ];

    this.handleInputChange = this.handleInputChange.bind(this);

  }

  loadFields() {
    //TODO load all fileds types
  }

  onModalClose(e) {
    e.preventDefault();

    this.props.onModalClose();
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

  handleInputChange(e) {
    //TODO
    const conditions = this.props.conditions;

    conditions[this.props.conditionIndex][e.target.name] = e.target.value;
    this.props.onConditionChange(conditions);
  }

  renderOperators() {

    console.log("this.operators => ",this.operators);

    return this.operators.map((item,index) =>
      <option key={index} value={item.value}> {item.name}</option>
    );
  }

  renderTypes() {
    return this.types.map((item,index) =>
      <option key={index} value={item.value}> {item.name}</option>
    );
  }

  renderParameters() {

    const condition = this.props.conditions[this.props.conditionIndex];

    if(condition.type == CONDITION_FIELD_TYPE_CONFIGURABLE) {
      return this.props.fields.map((item,index) =>
        <option key={index} value={item.identifier}> {item.name}</option>
      );
    }
    else {
      return this.props.parameters.map((item,index) =>
        <option key={index} value={item.identifier}> {item.name}</option>
      );
    }
  }

  render() {

    if(this.props.conditionIndex == null)
      return null;

    const condition = this.props.conditions[this.props.conditionIndex];

    if(condition === undefined)
      return null;

    return (
      <div style={{zIndex:this.state.zIndex}}>
        <div className="custom-modal" id={this.state.id}>
          <div className="modal-background"></div>
            <div className="modal-container">
              <div className="modal-header">

                  <h2>conditions de visibilité</h2> &nbsp;&nbsp;

                <div className="modal-buttons">
                  <a className="btn btn-default close-button-modal" onClick={this.onModalClose}>
                    <i className="fa fa-times"></i>
                  </a>
                </div>
              </div>

              <div className="modal-content">
                <div className="container">
                  <div className="row">
                    <div className="col-xs-12 col-md-6 col-md-offset-3">

                      <h3>
                        {this.props.initialValue.name} si :
                      </h3>
                      <br/>

                      <div className="form-group bmd-form-group">
                         <label htmlFor="type" className="bmd-label-floating">
                            Type of field
                         </label>
                         <select className="form-control" name="type" value={condition.type} onChange={this.handleInputChange} >
                            {this.renderTypes()}
                         </select>
                      </div>

                      <div className="form-group bmd-form-group">
                         <label htmlFor="name" className="bmd-label-floating">
                            Field
                         </label>
                         <select type="text" className="form-control" name="name" value={condition.name} onChange={this.handleInputChange} >
                            <option key={-1} value=""> Sélectionner </option>
                            {this.renderParameters()}
                         </select>

                      </div>

                      <div className="form-group bmd-form-group">
                         <label htmlFor="operator" className="bmd-label-floating">
                            Operator
                         </label>
                         <select className="form-control" name="operator" value={condition.operator} onChange={this.handleInputChange} >
                            {this.renderOperators()}
                         </select>
                      </div>

                      <div className="form-group bmd-form-group">
                         <label htmlFor="values" className="bmd-label-floating">
                            Values separated by comas
                         </label>
                         <input type="text" className="form-control" name="values" value={condition.values} onChange={this.handleInputChange} />
                      </div>

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
export default ConditionsModal;
