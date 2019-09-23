import React, {Component} from 'react';
import { render } from 'react-dom';
import {connect} from 'react-redux';

import {openModalContents, clearContent, initContent,
  contentUpdated, unselectContent,
  initParameters,
} from './../actions/';

import ParametersButton from '../Parameters/ParametersButton';


class LinkSettingsField extends Component {

  constructor(props) {
    super(props);

    var checkbox = null;
    var input = "";
    var display = false;

    this.initialised = false;

    this.state = {
      checkbox : checkbox,
      display : display,
      //content : null
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

  }

  componentDidMount(){
    this.processProps(this.props);
  }

  componentWillReceiveProps(nextProps){
    this.processProps(nextProps);
  }

  loadContentParameters(contentId) {

    var route = routes['extranet.content.parameters'].replace(':content',contentId);
    //console.log("LinkSettingsField :: loadContentParameters :: ",route);

    var self = this;

    axios.get(route)
      .then(function (response) {
          if(response.status == 200
              && response.data !== undefined)
          {
            //console.log("LinkSettingsField  :: data => ",response.data);

            //self.processData(response.data.modelValues);
            self.props.initParameters(response.data);
          }

      }).catch(function (error) {
         console.log(error);
       });
  }

  processProps(nextProps){
    var checkbox = null;
    var display = false;
    var content = null;
    var initialised = false;

    console.log("LinkSettingsField :: componentWillRecieveProps :: ",nextProps);
    //console.log(nextProps);

    if(nextProps.field != null && nextProps.field[nextProps.source] != null &&
       nextProps.field[nextProps.source][nextProps.name] !== undefined){

      checkbox = nextProps.field[nextProps.source][nextProps.name] != null;
      display = true;

      /*
      content = nextProps.field[nextProps.source][nextProps.name] == null ?
        null : nextProps.field[nextProps.source][nextProps.name];
      */

      console.log("LinkSettingsField :: processProps : nextProps.contents.content => ", nextProps.contents.content);
      //content came always from redux
      content = nextProps.contents.content != null ?
        nextProps.contents.content : null;
    }

    //if content changed
    if(nextProps.contents.needUpdate){
      this.handleContentUpdate(content);
    }

    this.setState({
      checkbox : checkbox,
      display : display,
      //content : content
    });

    //check if state is changing
    if(nextProps.field == null && this.initialised){
      //destroying the component
      console.log("LinkSettingsField :: Destroying!");
      this.initialised = false;
      this.props.clearContent();

    }
    else if(nextProps.field != null && !this.initialised &&
      nextProps.field[nextProps.source][nextProps.name] !== undefined){
      //constructing the component
      var newContent = nextProps.field[nextProps.source][nextProps.name];
      console.log("LinkSettingsField :: Constructing => ", newContent);
      this.initialised = true;
      if(newContent != null){
        this.props.initContent(newContent);
        this.loadContentParameters(newContent.id);
      }
    }



  }

  getDefaultValue() {
    return {
      id : null,
      title : '',
      params : {}
    };
  }

  handleFieldChange(event) {

    var field = {
      name : this.props.name,
      source : this.props.source,
      value : event.target.checked ?
        this.getDefaultValue() : null
    };

    this.props.onFieldChange(field);
  }

  handleContentUpdate(content) {

    console.log("LinkSettingsField :: handleContentUpdate => , initialised => ",this.initialised,"content =>", content);

    if(this.initialised) {

        var contentValue = this.getDefaultValue();

        if(content != null){
          contentValue = content;
          this.loadContentParameters(content.id);
        }

        var field = {
          name : this.props.name,
          source : this.props.source,
          value : contentValue
        };

        //update the state for comparision
        /*
        this.setState({
          content : content
        });
        */

        //console.log("handleContentUpdate => ",field);

        //propagate to main field
        this.props.onFieldChange(field);
        this.props.contentUpdated();
    }
  }

  handleInputChange(event) {

    var field = {
      name : this.props.name,
      source : this.props.source,
      value : event.target.value
    };

    this.props.onFieldChange(field);

  }

  onContentSelect(event) {
    event.preventDefault();

    this.props.openModalContents();
  }

  onRemoveField(event) {
    event.preventDefault();

    console.log("onRemoveField => ",this.props.contents.content);
    this.props.unselectContent();

  }

  renderSelectedPage() {

    const {content} = this.props.contents;

    if(content != null){
      return (
        <div className="field-form fields-list-container">

          <div className="typology-field">
            <div className="field-type">
              <i className="far fa-file"></i>
              &nbsp; {Lang.get('fields.page')}
            </div>

            <div className="field-inputs">
              <div className="row">
                <div className="field-name col-xs-6">
                  {content.title ? content.title : ""}
                </div>

                <div className="field-name col-xs-6">
                  <ParametersButton
                  />
                </div>
              </div>
            </div>

            <div className="field-actions">
              <a href="" className="remove-field-btn" onClick={this.onRemoveField.bind(this)}> <i className="fa fa-trash"></i> {Lang.get('fields.delete')} </a>
              &nbsp;&nbsp;
            </div>
          </div>

        </div>
      );
    }
    else {
      return (
        <div className="add-content-button">
          <a href="" className="btn btn-default" onClick={this.onContentSelect.bind(this)}><i className="fa fa-plus-circle"></i> {Lang.get('fields.select')} </a>
        </div>
      );
    }

  }

  render() {

    const {checkbox,input} = this.state;

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


          <div className="setup-field-config settings-field" style={{display : this.state.checkbox != null && this.state.checkbox ? "block" : "none" }}>
            <div className="form-group bmd-form-group">
               <label htmlFor="num" className="bmd-label-floating">{this.props.inputLabel}</label>
               {this.renderSelectedPage()}
            </div>
          </div>

        </div>
      </div>

    );
  }

}

const mapStateToProps = state => {
    return {
        contents: state.contents,
        app: state.app
    }
}

const mapDispatchToProps = dispatch => {
    return {
        initContent : (content) => {
            return dispatch(initContent(content));
        },
        openModalContents : () => {
            return dispatch(openModalContents());
        },
        clearContent : () => {
            return dispatch(clearContent());
        },
        contentUpdated : () => {
            return dispatch(contentUpdated());
        },
        unselectContent : () => {
            return dispatch(unselectContent());
        },
        initParameters : (content) => {
            return dispatch(initParameters(content))
        }

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkSettingsField);
