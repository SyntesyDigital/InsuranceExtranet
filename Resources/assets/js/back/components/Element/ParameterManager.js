import React, {Component} from 'react';
import { render } from 'react-dom';
import {connect} from 'react-redux';
import Autosuggest from 'react-autosuggest';

import {
  addParameter,
  removeParameter,
  openElementParametersSettings,

} from './actions/';

import {
  isRequired,
  getSettingsType,
  getTypeIcon,
  getRequiredIcon
} from './functions/';

const charMap = {
    'a': /[àáâ]/gi,
    'c': /[ç]/gi,
    'e': /[èéêë]/gi,
    'i': /[ìíï]/gi,
    'o': /[òóô]/gi,
    'oe': /[œ]/gi,
    'u': /[üú]/gi
  };

class ParameterManager extends Component {

  constructor(props){
    super(props);
    this.suggestions = props.app.parametersList ? props.app.parametersList : [];

    this.state = {
        value: '',
        suggestions: this.suggestions
    };

    console.log("suggestions => ",this.suggestions);

    this.onRemoveParameter = this.onRemoveParameter.bind(this);
    this.handleClickOnSuggest = this.handleClickOnSuggest.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);

  }

  onChange(event, { newValue })
  {
      this.setState({
          value: newValue
      });
  }

  normalize(str) {

    $.each(charMap, function (normalized, regex) {
        str = str.replace(regex, normalized);
    });
    return str.toLowerCase();
  }

  getSuggestions(value)
  {
      const inputValue = this.normalize(value.trim().toLowerCase());
      const inputLength = inputValue.length;

      var _this = this;
      return inputLength === 0 ? [] : this.suggestions.filter(function(item) {
          //return item.name.toLowerCase().slice(0, inputLength) === inputValue
          return _this.normalize(item.name.toLowerCase()).indexOf(inputValue) != -1;
      });
  }

  getSuggestionValue(suggestion)
  {
      return suggestion.name;
  }

  renderSuggestion(suggestion)
  {
      return (
          <span onClick={() => this.handleClickOnSuggest(suggestion.id)}>{suggestion.name}</span>
      );
  }

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested({ value })
  {
      this.setState({
          suggestions: this.getSuggestions(value)
      });
  }

    // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested()
  {
      this.setState({
          suggestions: []
      });
  }

  /*
  *   Set settings from PARAMETERS configuration.
  */
  setSettings(parameter,type) {

    if(parameter.settings === undefined || parameter.settings == null){
      parameter.settings = {};
    }

    //necessary for all parameters added before changes
    for(var key in PARAMETERS.settings){
      if(parameter.settings[PARAMETERS.settings[key]] === undefined || parameter.settings[PARAMETERS.settings[key]] == null){
        if(PARAMETERS.settings[key] == "required"){
            //by default required must be set to true
            parameter.settings[PARAMETERS.settings[key]] =  true;
        }
        else {
            parameter.settings[PARAMETERS.settings[key]] =  null;
        }
      }
    }

    return parameter;

  }

  handleParameterAdded(parameter) {

    parameter = this.setSettings(parameter);

    //console.log("handleParameterAdded => ", parameter);

    this.props.addParameter(parameter);
  }

  handleRemoveParameter(parameterId) {

    console.log("handleRemoveParameter => ", parameterId);
    this.props.removeParameter(parameterId);

  }


  handleClickOnSuggest(id)
  {
      var self = this;

      this.suggestions.map((item, index) => {
          if(item.id === id) {
              self.handleParameterAdded(item);
          }
      });
  }

  handleKeyPress(event)
  {
    if(event.key == 'Enter'){
      var self = this;
      this.suggestions.map((parameter, index) => {
          if(this.normalize(parameter.name) == this.normalize(this.state.value)) {
              self.handleParameterAdded(parameter);
          }
      });
    }
  }

  onRemoveParameter(id,e) {
    e.preventDefault();

    var self = this;

    bootbox.confirm({
				message: 'Êtes-vous sûr de supprimer définitivement ce paramètre',
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
						self.handleRemoveParameter(id)
					}
				}
		});


  }

  onEditParameter(parameter,e) {
    e.preventDefault();

    this.props.openModal(parameter);
  }

  existInModelParameters(identifier) {
    for( var key in this.props.app.modelParameters){
      if(this.props.app.modelParameters[key] == identifier){
        return true;
      }
    }
    return false;
  }

  existInModelVariables(identifier) {
    for( var key in this.props.app.modelVariables){
      if(key == identifier){
        return true;
      }
    }
    return false;
  }

  renderParameters() {
    //console.log('RENDER PARAMETER::',this.props.app.parameters);
    if(this.props.app.parameters ===undefined)
      return;

    return (
      this.props.app.parameters.map((parameter,i) => {

        const isLocked = this.existInModelParameters(parameter.identifier) ||
          this.existInModelVariables(parameter.identifier);
        const required = isRequired(parameter);
        const icon = getTypeIcon(parameter);

        //style={{color:"#a3a3a3"}}

        return (

            <span key={i} className="parameter" style={{
              display:'block',
              borderBottom: '1px solid #ccc',
              padding:'10px'
            }}>

              <span className="text-success" >
                <i className={getRequiredIcon(parameter)}></i>

                {icon != null &&
                  <span>
                    &nbsp; <i className={icon}></i>
                  </span>
                }
              </span>

              &nbsp; {parameter.name}


              {!isLocked &&
                <a href="" style={{float:'right'}} className="remove-btn text-danger" onClick={this.onRemoveParameter.bind(this,parameter.id)}>
                  <i className="fas fa-trash"></i>
                </a>
              }
              {isLocked &&
                <span style={{float:'right',color:'#666'}}>
                  <i className="fa fa-lock"></i>
                </span>
              }

              <a href="" style={{float:'right'}} className="edit-btn" id={parameter.id} onClick={this.onEditParameter.bind(this,parameter)}>
                <i className="fas fa-pencil-alt"></i> &nbsp;
              </a>

            </span>
          );
        }
      )
    );
  }

  render() {
    console.log('RENDER GRAL::');
    const { value, suggestions } = this.state;

    const inputProps = {
        placeholder: 'Sélectionner parametre',
        className: 'form-control',
        value,
        onChange: this.onChange.bind(this)
    };

    return (
      <div className="parameter-manager" onKeyPress={this.handleKeyPress}>
        <label htmlFor="template" className="bmd-label-floating">Parametres</label>

        <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            inputProps={inputProps}
        />

        {/* <a className="input-button"><i className="fa fa-plus"></i></a> */}

        <div className="parameters">
          {this.renderParameters()}
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => {
    return {
        app: state.app
    }
}

const mapDispatchToProps = dispatch => {
    return {
      addParameter: (parameter) => {
          return dispatch(addParameter(parameter));
      },
      removeParameter: (parameterId) => {
          return dispatch(removeParameter(parameterId));
      },
      openModal : (parameter) => {
          return dispatch(openElementParametersSettings(parameter))
      }

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ParameterManager);
