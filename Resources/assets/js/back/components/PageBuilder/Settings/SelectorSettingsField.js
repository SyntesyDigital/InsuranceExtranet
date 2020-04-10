import React, {Component} from 'react';

import SettingsField from './SettingsField';

class SelectorSettingsField extends Component {

  constructor(props) {
    super(props);
  }

  handleInputChange(event) {

    var field = {
      name : this.props.name,
      source : this.props.source,
      value : event.target.value
    };

    this.props.onFieldChange(field);
  }

  renderOptions() {
    return (this.props.options.map((item,i) => (
        <option value={item.value} key={i}>{item.name}</option>
      ))
    );
  }

  render() {
    
    if(this.props.field == null || this.props.field[this.props.source] == null || 
      this.props.field[this.props.source][this.props.name] === undefined)
      return null;

    const value = this.props.field[this.props.source][this.props.name];


    //console.log("SelectorSettingsValue => ",value);

    return (
      <SettingsField
        field={this.props.field}
        onFieldChange={this.props.onFieldChange}
        label={this.props.label}
        name={this.props.name}
        source={this.props.source}
        defaultValue={''}
      >
        <div className="form-group bmd-form-group">
          <select className="form-control" 
            name={this.props.name} 
            value={value} 
            onChange={this.handleInputChange.bind(this)} 
          >
            {this.renderOptions()}
          </select>
        </div>
       </SettingsField>
    );
  }

}
export default SelectorSettingsField;
