import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';

class ImageField extends Component {

    constructor(props)
    {
        super(props);

        console.log("ImageField :: props => ",props);

        var crop = "original";
        if(props.field.settings != null && props.field.settings.cropsAllowed !== undefined
          && props.field.settings.cropsAllowed != null ){

              crop = props.field.settings.cropsAllowed;
        }

        var url = null;
        var alt = "";
        var title = "";
        if(props.field.values !== undefined && props.field.values != null){
          if(props.field.values.urls[crop] !== undefined){
            url = props.field.values.urls[crop];
          }
          //alt = props.field.values.metadata.fields.alt[LOCALE].value;
          //title = props.field.values.metadata.fields.title[LOCALE].value;
        }

        this.state = {
          id : null,
          className : null,
          url : url,
          alt : alt,
          title : title
        };

        console.log("ImageField :: state => ",this.state);

    }

    componentDidMount() {

    }

    render() {

      //alt={this.state.alt}
      //title={this.state.title}

      return (
        <img
          id={this.state.id}
          className={this.state.className}
          src={ASSETS+this.state.url}
        />
      );

    }
}
export default ImageField;
