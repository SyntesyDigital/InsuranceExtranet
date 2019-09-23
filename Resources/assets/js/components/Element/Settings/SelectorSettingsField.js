import React, {Component} from 'react';
import { render } from 'react-dom';

class SelectorSettingsField extends Component {

  constructor(props) {
    super(props);

    this.state = {
        checkbox : null,
        value : '',
        display : false
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount()
  {
      this.processProps(this.props);
  }

  componentWillReceiveProps(nextProps)
  {
    this.processProps(nextProps);
    /*
      var display = false;
      var value = "";

      if(nextProps.field != null
          && nextProps.field[nextProps.source] != null
          && nextProps.field[nextProps.source][nextProps.name] !== undefined)
      {
        display = true;
        if(nextProps.field[nextProps.source][nextProps.name] != null ) {
            value = nextProps.field[nextProps.source][nextProps.name];
        }
      }

      this.setState({
          value : value,
          display : display
      });
      */
  }

  handleFieldChange(event) {

    var field = {
      name : this.props.name,
      source : this.props.source,
      value : event.target.checked ?
        this.props.options[0].value : null
    };

    this.props.onFieldChange(field);
  }

  handleInputChange(event) {

    var field = {
      name : this.props.name,
      source : this.props.source,
      value : event.target.value
    };

    this.props.onFieldChange(field);

  }

  processProps(nextProps){
    var checkbox = null;
    var value = "";
    var display = false;

    //console.log("InputSettingsField :: componentWillRecieveProps");
    //console.log(nextProps);

    if(nextProps.field != null && nextProps.field[nextProps.source] != null &&
       nextProps.field[nextProps.source][nextProps.name] !== undefined){

      checkbox = nextProps.field[nextProps.source][nextProps.name] != null;
      display = true;

      value = nextProps.field[nextProps.source][nextProps.name] == null ?
        '' : nextProps.field[nextProps.source][nextProps.name];
    }

    this.setState({
      checkbox : checkbox,
      value : value,
      display : display
    });
  }


  renderOptions() {
    return (this.props.options.map((item,i) => (
        <option value={item.value} key={i}>{item.name}</option>
      ))
    );
  }

  render() {

    const {checkbox,value,display} = this.state;

    console.log("SelectorSettingsValue => ",value);

    return (
      <div style={{display : display ? 'block' : 'none'}}>
        <div className="setup-field">

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

          <div className="setup-field-config" style={{display : checkbox != null && checkbox ? "block" : "none" }}>
            <div className="form-group bmd-form-group">
              <select className="form-control" name={this.props.name} value={value} onChange={this.handleInputChange} >
                {this.renderOptions()}
              </select>
            </div>
          </div>

        </div>
      </div>
    );
  }

}
export default SelectorSettingsField;
