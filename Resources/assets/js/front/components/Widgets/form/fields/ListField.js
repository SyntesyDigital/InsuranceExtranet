import React, {Component} from 'react';
import { render } from 'react-dom';

import ModalListField from './ModalListField';

class ListField extends Component
{
  constructor(props)
  {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);

    //console.log("ListField => ",this.props.field);

    this.state = {
      value : [],
      display : false,
      initItem : null
    };
  }


  handleOnChange(event)
  {

    /*
    this.props.onFieldChange({
      name : event.target.name,
      value : event.target.value
    });
    */

  }

  openModal(e) {
    e.preventDefault();

    this.setState({
      initItem : null,
      display : true
    });

  }

  renderFields() {
    const {fields} = this.props.field.settings;
    return fields.map((item,index) => {

      if(item.identifier == 'datas'){
        return null;
      }

      return (
        <th key={index}>{item.name}</th>
      );
    });
  }

  renderCols(value,fields) {

    return fields.map((item,index) => {

      if(item.identifier == 'datas'){
        return null;
      }

      return (
        <th key={index}>{value[item.identifier]}</th>
      )
    });

    /*
    return Object.keys(value).map((key) => {
      var item = value[key];

      //if is a base64 string print null
      if(item === undefined || item == null ||
        item == '' || item.indexOf('data:') != -1){
          return (<td></td>);
      }

      return (
        <td>{item}</td>
      );
    });
    */
  }

  handleEditItem(item,e) {
      e.preventDefault();

      this.setState({
        initItem : item,
        display : true
      });
  }

  handleRemoveItem(index,e) {
      e.preventDefault();

      const {value} = this.state;

      value.splice(index,1);
      this.setState({
        value : value
      });
  }

  renderValues() {
    const {value} = this.state;
    const {fields} = this.props.field.settings;

    return value.map((item,key) => {

      return (
          <tr key={key}>
            {this.renderCols(item,fields)}
            <td className="text-right">
              <a href="#" className="btn btn-link"
                onClick={this.handleEditItem.bind(this,item)}
              >
                <i className="fas fa-pencil-alt"></i>
              </a> &nbsp;
              <a href="#" className="btn btn-link btn-danger"
                onClick={this.handleRemoveItem.bind(this,key)}
              >
                <i className="fas fa-trash-alt"></i>
              </a>
            </td>
          </tr>
        )
    });
  }

  renderTable() {
    return (
      <table className="table">
        <thead>
          <tr>
            {this.renderFields()}
            <th></th>
          </tr>
        </thead>
        <tbody>
            {this.state.value.length > 0 &&
              this.renderValues()
            }
        </tbody>
      </table>
    );
  }

  handleModalClose(){
    this.setState({
      display : false,
    });
  }

  handleModalSubmit(item) {
    const {value,initItem} = this.state;

    //if we are editing
    if(initItem == null){
      value.push(item);
    }

    this.setState({
      value,
      initItem : null
    });

    this.props.onFieldChange({
      name : this.props.field.identifier,
      value : value
    });
  }

  render() {

    const {field} = this.props;

    console.log("List Field => ",field);

    return (
      <div className="list-field">

        <ModalListField
          id={field.id}
          name={field.name}
          display={this.state.display}
          initValue={this.state.initItem}
          onModalClose={this.handleModalClose.bind(this)}
          zIndex={1000}
          fields={this.props.field.settings.fields}
          onAjouter={this.handleModalSubmit.bind(this)}
        />

        <div className="row element-form-row">
          <div className="col-sm-4">
            <label>{field.name}</label>
          </div>
          <div className="col-sm-6">
            <a href="" className="btn btn-default" onClick={this.openModal.bind(this)}>
              <i className="fas fa-plus"></i> Ajouter
            </a>
          </div>
        </div>
        {this.state.value.length > 0 &&
          <div className="row element-form-row">
            <div className="col-sm-6 col-sm-offset-4">
              {this.renderTable()}
            </div>
          </div>
        }
      </div>
    );
  }

}

export default ListField;
