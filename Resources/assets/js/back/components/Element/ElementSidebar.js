import React, {Component} from 'react';
import { render } from 'react-dom';
import {connect} from 'react-redux';

import {inputChange, deleteElement} from './actions/';
import ParameterManager from "./ParameterManager";

import Select from 'react-select';

import SelectOption from './SelectOption';
import SelectValue from './SelectValue';

class ElementSidebar extends Component {

  constructor(props) {

    super(props);

    this.state = {
        fields : {}
    };

    //console.log("ElementSidebar :: icon : ");
    //console.log(this.props.fields.icon);


    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleDeleteElement = this.handleDeleteElement.bind(this);

    this.fontIcons = [];
    for(var key in props.icons){
      this.fontIcons.push({
          value : props.icons[key],
          label : props.icons[key]
      });
    }

  }

  handleDeleteElement(event) {

    var self = this;

    bootbox.confirm({
        message:  Lang.get('fields.sure'),
        buttons: {
            confirm: {
                label: Lang.get('fields.si'),
                className: 'btn-primary'
            },
            cancel: {
                label:  Lang.get('fields.no'),
                className: 'btn-default'
            }
        },
        callback: function (result) {
          if(result){
            self.props.deleteElement(self.props.app.element.id);
          }
        }
    });


  }

  handleChange(event) {

    var field = null;

    if(event.target.type == "text" || event.target.type == "select-one"){
      field = {
        name : event.target.name,
        value : event.target.value
      };
    }
    else if(event.target.type == "checkbox"){
      field = {
        name : event.target.name,
        value : event.target.checked
      };
    }

    if(field != null)
      this.props.inputChange(field);
  }


  handleSelectChange(selectedOption) {
    var field = {
      name : "icon",
      value : selectedOption
    };

    this.props.inputChange(field);
  }

  render() {

    return (
      <div className="sidebar">
        <div className={"form-group bmd-form-group " + (this.props.app.errors.name ? 'has-error' : '')}>
           <label htmlFor="name" className="bmd-label-floating">{ Lang.get('fields.name')}</label>
           <input type="text" className="form-control" id="name" name="name" value={this.props.app.inputs.name} onChange={this.handleChange} />
        </div>

        <div className={"form-group bmd-form-group " + (this.props.app.errors.identifier ? 'has-error' : '')}>
           <label htmlFor="identifier" className="bmd-label-floating">{ Lang.get('fields.identifier')}</label>
           <input type="text" className="form-control" id="identifier" name="identifier" value={this.props.app.inputs.identifier} onChange={this.handleChange} />
        </div>

        <div className="form-group bmd-form-group">
           <label htmlFor="icon" className="bmd-label-floating">{ Lang.get('fields.icon')}</label>
           <Select
                id="icon"
                name="icon"
                value={this.props.app.inputs.icon}
                onChange={this.handleSelectChange}
                options={this.fontIcons}
            />
        </div>

        <hr/>

        <div className="form-group bmd-form-group sidebar-item">
          <ParameterManager
          /*  parameters={this.props.parameters}
            parametersList={this.props.parametersList}
            element={this.props.element}
            onParameterAdded={this.props.onParameterAdded}
            onRemovePArameter={this.props.onParametereTag}*/
          />
        </div>

        <hr/>


        <h3>{ Lang.get('fields.add_fields')}</h3>

        <div className="field-list">
          {this.props.children}
        </div>

        <hr/>

        {this.props.app.element != null &&
          <div className="text-right">
            <a className="btn btn-link text-danger" onClick={this.handleDeleteElement}><i className="fa fa-trash"></i> Supprimer</a>
          </div>
        }

      </div>
    );
  }

}

const mapStateToProps = state => {
    return {
        app: state.app,
        icons : state.fontawesome.icons
    }
}

const mapDispatchToProps = dispatch => {
    return {
        inputChange: (field) => {
            return dispatch(inputChange(field));
        },
        deleteElement: (elementId) => {
            return dispatch(deleteElement(elementId));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ElementSidebar);
