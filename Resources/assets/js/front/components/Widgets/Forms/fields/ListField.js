import React, {Component} from 'react';
import { render } from 'react-dom';

import ModalListField from './ModalListField';
import Label from './../../ElementCard/fields/Label';

class ListField extends Component
{
  constructor(props)
  {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);

    ////console.log("ListField => ",this.props.field);

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

      //only a maximum of 4 render previews are available
      if(item.type == 'file' || index >= 4){
        return null;
      }

      return (
        <div className="col-xs-3" key={index}>{value[item.identifier]}</div>
      )
    });
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

      var _this = this;

      bootbox.confirm({
        message: this.props.rempoveMessage !== undefined ?
            this.props.rempoveMessage : 'Êtes-vous sûr de vouloir supprimer cette ligne et son contenu ?',
        buttons: {
            confirm: {
                label: Lang.get('Oui'),
                className: 'btn-primary'
            },
            cancel: {
                label: Lang.get('Non'),
                className: 'btn-default'
            }
        },
        callback: function (result) {
            if (result) {
                value.splice(index,1);
                _this.setState({
                  value : value
                });
            }
        }
    });
  }

  renderTable() {

    const {value} = this.state;
    const {fields} = this.props.field.settings;
    const {field} = this.props;

    if(this.state.value.length == 0)
      return null;

    console.log("renderTable => (field,value,fields)",field,value,fields);

    return value.map((item,key) => 
      <div className="typology-field field-list-item" key={key}>
          <div className="field-type">
              <i class="fa fa-file"></i> &nbsp;
          </div>
          <div className="field-labels">
              <div className="row">
                {this.renderCols(item,fields)}
              </div>
          </div>
          <div className="field-actions text-primary" style={{ paddingRight: '15px' }}>
              <a href="#" className="text-primary" onClick={this.handleEditItem.bind(this,item)}>
                <i className="fas fa-pencil-alt"></i>
              </a>
              <a href="#" className="text-danger" onClick={this.handleRemoveItem.bind(this,key)}>
                <i className="fa fa-trash"></i>
              </a>
          </div>
        </div>
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

    const divStyle = {
      cursor: 'pointer',
      textAlign: 'center',
      border: '1px dashed #ccc',
      padding: '15px',
      marginBottom: '25px',
    };

    const {field} = this.props;

    //console.log("List Field => ",field);

    return (
      <div className="list-field">

        <Label 
          text={field.name}
        />

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


        <div className="fields-list-container">
            <div class="list-items">
              {this.renderTable()}
            </div>
            <div id={field.identifier} style={divStyle} className="more-btn">
                <a href="#" className="btn"  onClick={this.openModal.bind(this)} style={{ borderRadius: '20px' }}>
                    <span className="field-name"><i className="fas fa-plus-circle"></i> Ajouter</span>
                </a>
            </div>
        </div>



        {/*

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
        */}
      </div>
    );
  }

}

export default ListField;
