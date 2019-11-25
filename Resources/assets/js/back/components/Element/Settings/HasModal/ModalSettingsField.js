import React, {Component} from 'react';
import { render } from 'react-dom';
import {connect} from 'react-redux';

import {
  openModalElements,
  clearElement,
  initElement,
  elementUpdated,
  unselectElement,
  initElementParameters,
} from './../../actions/';

import ElementParametersButton from './ElementParametersButton';

class ModalSettingsField extends Component {

  constructor(props) {
    super(props);

    var checkbox = null;
    var input = "";
    var display = false;

    this.initialised = false;

    this.state = {
      checkbox : checkbox,
      display : display,
      //element : null
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

  }

  componentDidMount(){
    this.processProps(this.props);
  }

  componentWillReceiveProps(nextProps){
    this.processProps(nextProps);
  }

  loadElementParameters(elementId) {

    var route = routes['extranet.element.parameters'].replace(':element',elementId);
    console.log("ModalSettingsField :: loadElementParameters :: ",route);

    var self = this;

    axios.get(route)
      .then(function (response) {
          if(response.status == 200
              && response.data !== undefined)
          {
            console.log("ModalSettingsField  :: data => ",response.data);

            //self.processData(response.data.modelValues);
            self.props.initElementParameters(response.data);
          }

      }).catch(function (error) {
         console.log(error);
       });
  }

  processProps(nextProps){
    var checkbox = null;
    var display = false;
    var element = null;
    var initialised = false;

    console.log("ModalSettingsField :: componentWillRecieveProps :: ",nextProps);
    //console.log(nextProps);

    if(nextProps.field != null && nextProps.field[nextProps.source] != null &&
       nextProps.field[nextProps.source][nextProps.name] !== undefined){

      checkbox = nextProps.field[nextProps.source][nextProps.name] != null;
      display = true;

      /*
      element = nextProps.field[nextProps.source][nextProps.name] == null ?
        null : nextProps.field[nextProps.source][nextProps.name];
      */

      console.log("ModalSettingsField :: processProps : nextProps.elements.element => ", nextProps.elements.element);
      //element came always from redux
      element = nextProps.elements.element != null ?
        nextProps.elements.element : null;
    }

    //if element changed
    console.log("ModalSettingsField :: need updated :: => checkbox => ", checkbox," , needupdate => ",nextProps.elements.needUpdate);
    if(checkbox && nextProps.elements.needUpdate){
      this.handleElementUpdate(element);
    }

    this.setState({
      checkbox : checkbox,
      display : display,
      //element : element
    });


    //check if state is changing
    if(nextProps.field == null && this.initialised){
      //destroying the component
      console.log("ModalSettingsField :: Destroying!");
      this.initialised = false;
      this.props.clearElement();

    }
    else if(nextProps.field != null && !this.initialised &&
      nextProps.field[nextProps.source][nextProps.name] !== undefined){
      //constructing the component
      var newElement = nextProps.field[nextProps.source][nextProps.name];
      console.log("ModalSettingsField :: Constructing => ", newElement);
      this.initialised = true;
      if(newElement != null){
        this.props.initElement(newElement);
        this.loadElementParameters(newElement.id);
      }
    }
  }

  getDefaultValue() {
    return {
      id : null,
      title : '',
      params : {}
    };
  }

  handleFieldChange(event) {

    var field = {
      name : this.props.name,
      source : this.props.source,
      value : event.target.checked ?
        this.getDefaultValue() : null
    };

    this.props.onFieldChange(field);
  }

  handleElementUpdate(element) {

    console.log("ModalSettingsField :: handleElementUpdate => , initialised => ",this.initialised,"element =>", element);

    if(this.initialised) {

        var elementValue = this.getDefaultValue();

        if(element != null){
          elementValue = element;
          this.loadElementParameters(element.id);
        }

        var field = {
          name : this.props.name,
          source : this.props.source,
          value : elementValue
        };

        //update the state for comparision
        /*
        this.setState({
          element : element
        });
        */

        //console.log("handleElementUpdate => ",field);

        //propagate to main field
        this.props.onFieldChange(field);
        this.props.elementUpdated();
    }
  }

  handleInputChange(event) {

    var field = {
      name : this.props.name,
      source : this.props.source,
      value : event.target.value
    };

    this.props.onFieldChange(field);

  }

  onElementSelect(event) {
    event.preventDefault();

    this.props.openModalElements();
  }

  onRemoveField(event) {
    event.preventDefault();

    console.log("onRemoveField => ",this.props.elements.element);
    this.props.unselectElement();

  }

  renderSelectedPage() {

    const {element} = this.props.elements;

    if(element != null){
      return (
        <div className="field-form fields-list-container">

          <div className="typology-field">
            <div className="field-type large">
              <i className={element.icon}></i>
              &nbsp; {element.title}
            </div>

            <div className="field-inputs">
              <div className="row">
                <div className="field-name col-xs-6">

                </div>

                <div className="field-name col-xs-6">
                  <ElementParametersButton
                  />
                </div>
              </div>
            </div>

            <div className="field-actions">
              <a href="" className="remove-field-btn" onClick={this.onRemoveField.bind(this)}> <i className="fa fa-trash"></i> {Lang.get('fields.delete')} </a>
              &nbsp;&nbsp;
            </div>
          </div>

        </div>
      );
    }
    else {
      return (
        <div className="add-content-button">
          <a href="" className="btn btn-default" onClick={this.onElementSelect.bind(this)}><i className="fa fa-plus-circle"></i> {Lang.get('fields.select')} </a>
        </div>
      );
    }

  }

  render() {

    const {checkbox,input} = this.state;

    return (

      <div style={{display : this.state.display ? 'block' : 'none'}}>
        <div className="setup-field" >
          <div className="togglebutton">
            <label>
                <input type="checkbox"
                  name={this.props.name}
                  checked={ this.state.checkbox != null ? checkbox : false }
                  onChange={this.handleFieldChange}
                />
                {this.props.label}
            </label>
          </div>


          <div className="setup-field-config settings-field" style={{display : this.state.checkbox != null && this.state.checkbox ? "block" : "none" }}>
            <div className="form-group bmd-form-group">
               <label htmlFor="num" className="bmd-label-floating">{this.props.inputLabel}</label>
               {this.renderSelectedPage()}
            </div>
          </div>

        </div>
      </div>

    );
  }

}

const mapStateToProps = state => {
    return {
        elements: state.elements,
        app: state.app
    }
}

const mapDispatchToProps = dispatch => {
    return {
        initElement : (element) => {
            return dispatch(initElement(element));
        },
        openModalElements : () => {
            return dispatch(openModalElements());
        },
        clearElement : () => {
            return dispatch(clearElement());
        },
        elementUpdated : () => {
            return dispatch(elementUpdated());
        },
        unselectElement : () => {
            return dispatch(unselectElement());
        },
        initElementParameters : (element) => {
            return dispatch(initElementParameters(element))
        }

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalSettingsField);
