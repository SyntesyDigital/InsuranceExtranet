import React, {Component} from 'react';
import { render } from 'react-dom';

import ColorField from '../../../Layout/Fields/ColorField';

class Condition extends Component {

  constructor(props) {
    super(props);    
  }

  handleConditionRemove(index,e) {
    e.preventDefault();

    var _index = index;
    var _this = this;

    bootbox.confirm({
				message: 'Êtes-vous sûr de supprimer définitivement ce condition',
				buttons: {
						confirm: {
								label: Lang.get('fields.si'),
								className: 'btn-primary'
						},
						cancel: {
								label: Lang.get('fields.no'),
								className: 'btn-default'
						}
				},
				callback: function (result) {
					if(result){
            _this.props.onRemove(_index);
					}
				}
		});
  }

  handleOnChange(e) {
    this.props.onFieldChange(e.target.name, e.target.value);
  }

  render() {

    return (
      <div className="condition-item row">
        <div className="col-sm-10">
          <div className="field-name col-xs-4">
            <input 
              type="text" 
              className="form-control" 
              name="value" 
              value={this.props.item.value} 
              placeholder={'Valeur'}
              onChange={this.handleOnChange.bind(this)} 
            />
          </div>
          <div className="col-sm-4">
            <ColorField 
              name={'color'}
              label={'Couleur'}
              value={this.props.item.color}
              inline={true}
              onChange={this.props.onFieldChange} 
            />
          </div>
          <div className="col-sm-4">
            <ColorField 
              name={'backgroundColor'}
              label={'Fond'}
              value={this.props.item.backgroundColor}
              inline={true}
              onChange={this.props.onFieldChange} 
            />
          </div>
          
        </div>
        <div className="col-sm-2 text-right">
          <a href="" onClick={this.handleConditionRemove.bind(this,this.props.index)} className="text-danger">
            <i className="fas fa-trash"></i>
          </a>
        </div>
      </div>

    );
  }

}
export default Condition;
