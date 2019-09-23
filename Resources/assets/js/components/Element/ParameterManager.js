import React, {Component} from 'react';
import { render } from 'react-dom';
import {connect} from 'react-redux';
import Autosuggest from 'react-autosuggest';

import {addParameter,removeParameter} from './actions/';

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

  handleParameterAdded(parameter) {

    console.log("handleParameterAdded => ", parameter);
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

  onRemoveParameter(e) {
    e.preventDefault();
    this.handleRemoveParameter($(e.target).closest('.remove-btn').attr('id'))
  }

  existInModelParameters(identifier) {
    for( var key in this.props.app.modelParameters){
      if(this.props.app.modelParameters[key] == identifier){
        return true;
      }
    }
    return false;
  }

  renderParameters() {
    console.log('RENDER PARAMETER::',this.props.app.parameters);
    if(this.props.app.parameters ===undefined)
      return;

    return (
      this.props.app.parameters.map((parameter,i) => (
        <span key={i} className="parameter" style={{
          display:'block',
          borderBottom: '1px solid #ccc',
          padding:'10px'
        }}>
          {parameter.name}

          {!this.existInModelParameters(parameter.identifier) &&
            <a href="" style={{float:'right'}} className="remove-btn" id={parameter.id} onClick={this.onRemoveParameter}>
              <i className="fa fa-times-circle"></i>
            </a>
          }
          {this.existInModelParameters(parameter.identifier) &&
            <span style={{float:'right',color:'#666'}}>
              <i className="fa fa-lock"></i>
            </span>
          }

        </span>
      ))
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
      }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ParameterManager);
