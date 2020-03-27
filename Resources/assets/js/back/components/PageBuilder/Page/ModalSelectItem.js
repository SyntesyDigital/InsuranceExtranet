import React, {Component} from 'react';
import { render } from 'react-dom';
import {connect} from 'react-redux';

import {
  cancelItem,
  itemSelected,
  addRow
} from './../actions/';

class ModalSelectItem extends Component {

  constructor(props){
    super(props);

    //console.log(" ModalSelectItem :: construct ",props);

    this.onModalClose = this.onModalClose.bind(this);
  }

  componentDidMount() {

    if(this.props.modalItem.displayModal){
        this.modalOpen();
    }

  }

  componentWillReceiveProps(nextProps)
  {
    if(nextProps.modalItem.displayModal){
        this.modalOpen();
    } else {
        this.modalClose();
    }
  }

  onModalClose(e){
      e.preventDefault();
      this.props.cancelItem();
  }

  handleSelectItem(item){

    this.props.itemSelected(
      item,
      this.props.modalItem.pathToIndex,
      this.props.modalItem.addPosition,
      this.props.app.layout
    );
  }

  modalOpen()
  {
    TweenMax.to($("#select-item-modal"),0.5,{opacity:1,display:"block",ease:Power2.easeInOut});
  }

  modalClose() {

    var self =this;
      TweenMax.to($("#select-item-modal"),0.5,{display:"none",opacity:0,ease:Power2.easeInOut,onComplete:function(){
        self.setState({
          imageSelected : null
        });
      }});
  }

  exploteToObject(fields) {

    if(fields == null){
      return null;
    }

    var result = {};

    for(var i=0;i<fields.length;i++){
      result[fields[i]] = null;
    }
    return result;
  }

  addRow(e) {

    e.preventDefault();

    this.handleSelectItem({
      type : 'row',
      settings : this.exploteToObject(ROW_SETTINGS),
      children : [
        {
          type : 'col',
          settings : this.exploteToObject(COL_SETTINGS),
          colClass : 'col-xs-12',
          children : []
        }
      ]
    });
  }

  exploteToObject(fields) {

    if(fields == null){
      return null;
    }

    var result = {};

    for(var i=0;i<fields.length;i++){
      result[fields[i]] = null;
    }
    return result;
  }

  addItem(field,e) {

    e.preventDefault();

    var newField = JSON.parse(JSON.stringify(field));

    newField.rules = this.exploteToObject(newField.rules);
    newField.settings = this.exploteToObject(newField.settings);
    newField.identifier = "temp_"+JSON.stringify(this.props.modalItem.pathToIndex);

    this.handleSelectItem({
      type : 'item',
      field : newField
    });
  }

  addElementField(field,e) {

    e.preventDefault();

    var newField = JSON.parse(JSON.stringify(field));

    this.handleSelectItem({
      type : 'element_field',
      field : newField
    });

  }

  addSeparator(e) {

    e.preventDefault();

    var newField = JSON.parse(JSON.stringify(WIDGETS['SEPARATOR']));

    newField.rules = this.exploteToObject(newField.rules);
    newField.settings = this.exploteToObject(newField.settings);

    this.handleSelectItem({
      type : 'item',
      field : newField
    });
  }

  renderFields() {

    var fields = [];

    var nonAllowed = this.props.nonAllowedFields;

    for( var key in FIELDS){

      if(nonAllowed.indexOf(FIELDS[key].type) == -1){
        fields.push(
          <div className="col-xs-3" key={key}>
            <a href="" onClick={this.addItem.bind(this,FIELDS[key])}>
              <div className="grid-item">
                <i className={"fa "+FIELDS[key].icon}></i>
                <p className="grid-item-name">
                  {FIELDS[key].name}
                </p>
              </div>
            </a>
          </div>
        );
      }

    }

    return fields;
  }

  renderWidget() {
      var widgets = [];

      var nonAllowed = [
      ];

      for( var key in WIDGETS){

        if(nonAllowed.indexOf(WIDGETS[key].type) == -1 && !WIDGETS[key].hidden){
          widgets.push(
            <div className="col-xs-4" key={key}>
              <a href="" onClick={this.addItem.bind(this,WIDGETS[key])}>
                <div className="grid-item with-image" style={{backgroundImage:'url('+ASSETS+'modules/architect/images/widgets/'+WIDGETS[key]['label'].toLowerCase()+'.jpg)'}}>
                  {/*<i className={"fa "+ WIDGETS[key].icon}></i>*/}
                  <p className="grid-item-name">
                    {WIDGETS[key].name}
                  </p>
                </div>
              </a>
            </div>
          );
        }

      }

      return widgets;
  }

  renderElementFields() {
    var fields = this.props.fields;

    if(fields === undefined)
      return;

    return fields.map((item) => 
      <div className="col-xs-3" key={item.identifier}>
        <a href="" onClick={this.addElementField.bind(this,item)}>
          <div className="grid-item">
            <i className={item.icon}></i>
            <p className="grid-item-name">
              {item.name}
            </p>
          </div>
        </a>
      </div>
    );
}

  render() {

      // <div className="col-xs-3">
      //   <a href="" onClick={this.addWidget.bind(this)}>
      //     <div className="grid-item">
      //       <i className="far fa-file"></i>
      //       <p className="grid-item-name">
      //         Widget Simple
      //       </p>
      //     </div>
      //   </a>
      // </div>

    return (
      <div className="custom-modal no-buttons" id="select-item-modal">
        <div className="modal-background"></div>


          <div className="modal-container">
            <div className="modal-header">
              <h2></h2>

              <div className="modal-buttons">
                <a className="btn btn-default close-button-modal" onClick={this.onModalClose}>
                  <i className="fa fa-times"></i>
                </a>
              </div>
            </div>

            <div className="modal-content">
              <div className="container">
                <div className="row">
                  <div className="col-xs-12 col-md-10 col-md-offset-1">

                    <h3 className="card-title">{Lang.get('fields.new_element')}</h3>
                    <h6>{Lang.get('modals.select_list_to_add')} </h6>


                    <div className="grid-items">
                      <div className="row">

                        <div className="col-xs-3">
                          <a href="" onClick={this.addRow.bind(this)}>
                            <div className="grid-item">
                              <i className="fa fa-columns"></i>
                              <p className="grid-item-name">
                                {Lang.get('fields.row')}
                              </p>
                            </div>
                          </a>
                        </div>

                        <div className="col-xs-3">
                          <a href="" onClick={this.addSeparator.bind(this)}>
                            <div className="grid-item">
                              <i className={"fa "+WIDGETS['SEPARATOR'].icon}></i>
                              <p className="grid-item-name">
                                {Lang.get('fields.separator')}
                              </p>
                            </div>
                          </a>
                        </div>

                        {this.renderFields()}

                      </div>

                      <hr />

                      <div className="row">

                          {this.renderElementFields()}

                        </div>

                      <br />

                      {this.props.enableWidgets && 
                        <div className="row">

                          {this.renderWidget()}

                        </div>
                      }

                    </div>

                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <a href="" className="btn btn-default" onClick={this.onModalClose}> {Lang.get('fields.cancel')} </a> &nbsp;
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
        modalItem : state.modalItem
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addRow : (layout) => {
          return dispatch(addRow(layout));
        },
        cancelItem: () => {
            return dispatch(cancelItem());
        },
        itemSelected: (item,pathToIndex,position,layout) => {
            return dispatch(itemSelected(item,pathToIndex,position,layout))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalSelectItem);
