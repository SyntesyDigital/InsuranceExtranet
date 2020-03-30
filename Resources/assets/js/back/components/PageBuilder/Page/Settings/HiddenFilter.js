import React, {Component} from 'react';
import { render } from 'react-dom';
import {connect} from 'react-redux';

import axios from 'axios';

class HiddenFilter extends Component {

  constructor(props) {
    super(props);

    var checkbox = null;
    var input = "";
    var display = false;

    this.state = {
      checkbox : checkbox,
      input : input,
      display : display,
      filters : [],
      variable : null,
      value : null,
      parametersLoaded : false
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  componentDidMount(){
    this.processProps(this.props);
  }

  loadFilterVariables() {

    var self = this;

    axios.get(ASSETS+'/architect/extranet/filters')
      .then(function (response) {
          if(response.status == 200
              && response.data.data !== undefined
              && response.data.data.length > 0)
          {

            ////console.log("original categories => ",response.data.data);

            var filters = [{
              value:'',
              name:'----',
              values : []
            }];

            for(var i=0; i < response.data.data.length ; i++){
              var filter = response.data.data[i];

              var parameterId = self.getParameterId(filter.name);
              //console.log("getParameterId :: ",filter.name,parameterId);

              //if parameter exist then add filter. Filter need to be added to DDBB
              if(parameterId != null){
                filters.push({
                  value : filter.name,
                  name : filter.label,
                  values : filter.values,
                  id : parameterId
                });
              }
            }

            self.setState({
              filters : filters
            });

          }

      }).catch(function (error) {
         console.log(error);
      });
  }

  /**
  *   Check correspondance between parameters of DDBB and filters from Boby
  */
  getParameterId(identifier) {

    const {parameters} = this.props.modalEdit;

    if(parameters === undefined){
      console.error("Parameters not yet defined.");
      return null;
    }



    for(var i in parameters){
      if(parameters[i].identifier == identifier){
        return parameters[i].id;
      }
    }
  }

  componentWillReceiveProps(nextProps){

    //don't load filters before parameters are loaded
    if(Object.keys(nextProps.modalEdit.parameters).length > 0 && !this.state.parametersLoaded){
        var self = this;

        this.setState({
          parametersLoaded : true
        },function(){
            self.loadFilterVariables();
            self.processProps(nextProps);
        })
    }
    else {
      this.processProps(nextProps);
    }
  }

  processProps(nextProps){
    var checkbox = null;
    var input = "";
    var display = false;
    var variable = null;
    var value = null;

    //console.log("InputSettingsField :: componentWillRecieveProps");
    //console.log(nextProps);

    if(nextProps.field != null && nextProps.field[nextProps.source] != null &&
       nextProps.field[nextProps.source][nextProps.name] !== undefined){

      checkbox = nextProps.field[nextProps.source][nextProps.name] != null;
      display = true;

      input = nextProps.field[nextProps.source][nextProps.name] == null ?
        '' : nextProps.field[nextProps.source][nextProps.name];
    }

    if(input != '' && input.indexOf(':') != -1){
      var inputArray = input.split(":");
      //set variable from filters

      const filters = this.state.filters;

      for(var i=0;i<filters.length;i++){
        if(inputArray[0] == filters[i].id){
          variable = filters[i];
        }
      }

      //set value second parameter
      value = inputArray[1];
    }

    this.setState({
      checkbox : checkbox,
      input : input,
      display : display,
      variable : variable,
      value : value
    });
  }

  handleFieldChange(event) {

    var field = {
      name : this.props.name,
      source : this.props.source,
      value : event.target.checked ? "" : null
    };

    this.props.onFieldChange(field);
  }

  renderVariables() {
    return this.state.filters.map((item,index) =>
      <option value={item.value} key={index}>{item.name}</option>
    );
  }

  renderVarabileValues() {
    if(this.state.variable == null || this.state.variable == '')
      return null;

    return this.state.variable.values.map((item,index) =>
      <option value={item.val} key={index}>{item.lib}</option>
    )

  }

  handleVariableChange(event) {
    console.log("handleVariableChange :: variable value => ",event.target.value);

    var field = {
      name : this.props.name,
      source : this.props.source,
      value : ""
    };

    const filters = this.state.filters;

    for(var key in filters){
      console.log("handleVariableChange :: filters[key].value => ",filters[key])
      if(filters[key].value != "" && filters[key].value == event.target.value){

        /*
        this.setState({
          variable : filters[key]
        });
        */

        field.value = filters[key].id+":"+filters[key].values[0].val+":"+filters[key].value;
      }
    }

    /*
    this.setState({
      variable : null
    });
    */

    console.log("HiddenFilter :: fieldChange :: ",field);
    this.props.onFieldChange(field);

  }

  handleValueChange(event) {
    console.log("handleValueChange :: variable value => ",event.target.value);

    var field = {
      name : this.props.name,
      source : this.props.source,
      value : this.state.variable.id+":"+event.target.value+":"+this.state.variable.value
    };

    console.log("HiddenFilter :: fieldChange :: ",field);
    this.props.onFieldChange(field);
  }

  render() {

    const {checkbox,input} = this.state;

    const variableValue = this.state.variable != null ?
      this.state.variable.value : null;

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


          <div className="setup-field-config" style={{display : this.state.checkbox != null && this.state.checkbox ? "block" : "none" }}>
            <div className="form-group bmd-form-group" style={{paddingLeft:0}}>
               <label htmlFor="num" className="bmd-label-floating">{this.props.inputLabel}</label>

               <div className="row">
                <div className="col-sm-6">
                  <select className="form-control" value={variableValue} onChange={this.handleVariableChange.bind(this)} >
                  {this.renderVariables()}
                  </select>
                </div>
                <div className="col-sm-6">
                  <select className="form-control" value={this.state.value} onChange={this.handleValueChange.bind(this)} >
                  {this.renderVarabileValues()}
                  </select>
                </div>
               </div>
            </div>
          </div>

        </div>
      </div>

    );
  }

}

const mapStateToProps = state => {
    return {
        modalEdit : state.modalEdit
    }
}

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(HiddenFilter);
