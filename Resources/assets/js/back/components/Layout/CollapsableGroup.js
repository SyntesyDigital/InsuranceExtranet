import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CollapsableGroup extends Component {

  constructor(props) {
    super(props);

    this.state = {
      display: false,
    };
  }

  handleEdit(e) {
    console.log("handleEdit");
    this.props.onEdit();
  }

  handleRemove(e) {
    console.log("handleRemove");
    var _this = this;

    bootbox.confirm({
        message: this.props.rempoveMessage !== undefined ? 
          this.props.rempoveMessage : Lang.get('fields.delete_row_alert'),
        buttons: {
            confirm: {
                label: Lang.get('fields.si') ,
                className: 'btn-primary'
            },
            cancel: {
                label:  Lang.get('fields.no'),
                className: 'btn-default'
            }
        },
        callback: function (result) {
            if(result){
              _this.props.onRemove();
            }
        }
    });
  }

  handleUp(e) {
    console.log("handleUp");
    this.props.onUp();
  }

  handleDown(e) {
    console.log("handleDown");
    this.props.onDown();
  }

  render() {

    const hideTab = this.props.hideTab !== undefined && this.props.hideTab == true ? true : false;
    const { identifier, title, icon, editable, sortable, length, index } = this.props;

    let first = false;
    let last = false;
    if(sortable !== undefined && sortable){
      first = index !== undefined && index == 0 ? true : false;
      last = index !== undefined && length !== undefined && index == length-1 ? true : false;
    }

    return (

      <div>
        <div className={
          "field-item collapsable-group"+
          (this.props.editable ? ' editable' : '')+ 
          (this.props.sortable ? ' sortable' : '')
          }>
          {this.props.sortable && 
            <div className="actions left">
              {!last && 
                <a href="#" onClick={this.handleDown.bind(this)}><i className='fas fa-angle-down'></i></a>  
              }
              {!first && 
                <a href="#" onClick={this.handleUp.bind(this)}><i className='fas fa-angle-up'></i></a>
              }
            </div>
          }
          
          <div className="actions">
            {editable ? <a href="#" onClick={this.handleEdit.bind(this)}><i className='far fa-edit'></i></a> : false}
            {editable ? <a href="#" onClick={this.handleRemove.bind(this)}><i className='fa fa-trash-alt'></i></a> : false}
          </div>
          <button style={{ display: (hideTab ? 'none' : 'block') }} id={"heading" + identifier} className="btn btn-link" data-toggle="collapse" data-target={"#collapse" + identifier} aria-expanded="true" aria-controls={"collapse" + identifier}>
            <span className="field-name">
              <i className={icon}></i>
              {' '}{title}              
            </span>
          </button>
          <div id={"collapse" + identifier} className="collapse in" aria-labelledby={"heading" + identifier} aria-expanded="true" aria-controls={"collapse" + identifier}>
            <div className="row box">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CollapsableGroup.propTypes = {
  identifier: PropTypes.string.isRequired,
  title: PropTypes.string,
  hideTab: PropTypes.bool,
  icon: PropTypes.string,
  editable: PropTypes.bool, //enable edit, remove
  sortable: PropTypes.bool, //enable arrows
  index: PropTypes.number,  //if sortable, then need to know array position
  length: PropTypes.number, //to check if last
  rempoveMessage: PropTypes.string,

  onEdit: PropTypes.func,
  onRemove : PropTypes.func,
  onUp : PropTypes.func,
  onDown : PropTypes.func,
};

