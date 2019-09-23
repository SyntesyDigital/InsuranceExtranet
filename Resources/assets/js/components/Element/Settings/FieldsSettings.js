import React, {Component} from 'react';
import { render } from 'react-dom';

class FieldsSettings extends Component {

  constructor(props) {
    super(props);

    var checkbox = null;
    var input = "";
    var display = false;

    this.state = {
      input : input,
      display : display
    };

  }

  componentDidMount(){
    this.processProps(this.props);
  }

  componentWillReceiveProps(nextProps){
    this.processProps(nextProps);
  }

  processProps(nextProps){
    var checkbox = null;
    var input = "";
    var display = false;

    console.log("FieldsSettings :: componentWillRecieveProps",nextProps);

    if(nextProps.field != null && nextProps.field[nextProps.source] != null &&
       nextProps.field[nextProps.source][nextProps.name] !== undefined){

      checkbox = nextProps.field[nextProps.source][nextProps.name] != null;
      display = true;

      input = nextProps.field[nextProps.source][nextProps.name] == null ?
        '' : nextProps.field[nextProps.source][nextProps.name];
    }

    this.setState({
      input : input,
      display : display
    });
  }

  renderFields() {

    if(this.state.input == "")
      return null;

    return this.state.input.map((item,index) =>
      <div className="typology-field" key={index}>
        <div className="field-type">
          <i className={item.icon}></i>
          {item.type}
        </div>

        <div className="field-inputs">
          <div className="row">
            <div className="field-name col-xs-6">
              {item.name}
            </div>
            <div className="field-name col-xs-6">
              {/* {item.identifier} */} 
            </div>
          </div>
        </div>

        <div className="field-actions">

        </div>
      </div>
    );
  }

  render() {

    const {input} = this.state;

    return (

      <div style={{display : this.state.display ? 'block' : 'none'}}>
        <div className="setup-field" >
          <div className="togglebutton">
            <label>
                {this.props.label}
            </label>
          </div>


          <div className="setup-field-config">
            <div className="form-group bmd-form-group">
              <div className="field-form fields-list-container">
               {this.renderFields()}
              </div>
            </div>
          </div>

        </div>
      </div>

    );
  }

}
export default FieldsSettings;
