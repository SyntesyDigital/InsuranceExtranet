import React, {Component} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {connect} from 'react-redux';

import {customFieldChange} from './../actions/';

class RichTextField extends Component {

  constructor(props){
    super(props);

    var values = this.props.field.value ? this.props.field.value : {};

    for(var key in this.props.app.translations){
        if(values[key] === undefined) {
            values[key] = '';
        }
    }

    //console.log("RichTextField :: constructor : ",values);

    this.state = {
        value : values
    };

  }

  handleOnChange(content, delta, source, editor)
  {
    var _this = this.parent;
    var language = this.language ? this.language : null;

    _this.state.value[language] = content;

    _this.props.onFieldChange({
        identifier : _this.props.field.identifier,
        value : _this.state.value
    });
  }

  renderInputs() {

    var modules = {
      toolbar: [
        [{ 'header': [1, 2, 3, 4, 5, false] }],
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        [{ 'align': '' }, { 'align': 'center' }, { 'align': 'right' }, { 'align': 'justify' }],
        ['link'],
        ['clean']
      ],
     };
 
      var formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent', 'align',
        'link', 'image'
      ];

    var inputs = [];

    const errors = this.props.app.errors[this.props.field.identifier];

    for(var key in this.props.app.translations){
      //if(this.props.app.translations[key]){

        var value = this.props.field.value && this.props.field.value[key] ? this.props.field.value[key] : '';
        var error = errors && errors[key] ? errors[key] : null;

        inputs.push(
        <div className={'form-group bmd-form-group ' + (error !== null ? 'has-error' : null)} key={key}>
         <label htmlFor={this.props.field.identifier} className="bmd-label-floating">{this.props.field.name} - {key}</label>
         <ReactQuill
            id={key}
            language={key}
            parent={this}
            value={value}
            onChange={this.handleOnChange}
            modules={modules}
            formats={formats}
          />
        </div>
        );
      //}
    }
    return inputs;
  }


  render() {

    const hideTab = this.props.hideTab !== undefined && this.props.hideTab == true ? true : false;

    return (
      <div className="field-item">
        <button  style={{display:(hideTab ? 'none' : 'block')}}  id={"heading"+this.props.field.identifier} className="btn btn-link" data-toggle="collapse" data-target={"#collapse"+this.props.field.identifier} aria-expanded="true" aria-controls={"collapse"+this.props.field.identifier}>
          <span className="field-type">
            <i className={"fa "+FIELDS.RICHTEXT.icon}></i> {FIELDS.RICHTEXT.name}
          </span>
          <span className="field-name">
            {this.props.field.name}
          </span>
        </button>

        <div id={"collapse"+this.props.field.identifier} className="collapse in" aria-labelledby={"heading"+this.props.field.identifier} aria-expanded="true" aria-controls={"collapse"+this.props.field.identifier}>
          <div className="field-form">
            {this.renderInputs()}
          </div>
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
        customFieldChange: (field) => {
            return dispatch(customFieldChange(field));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RichTextField);
