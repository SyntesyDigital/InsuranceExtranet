import React, { Component } from 'react';
import ReactDOM from 'react-dom';


class TranslatedFileField extends Component {

    constructor(props)
    {
        super(props);
    }

    render() {

      const field = this.props.field;
      var url = '';
      const label = this.props.label !== undefined ?
        this.props.label : window.localization['GENERAL_WIDGET_DOWNLOAD_PDF'];

      console.log("TranslatedFileField => ",field);

      if(field.values != null && field.values !== undefined && field.values != null
        && field.values[LOCALE] !== undefined && field.values[LOCALE] != null){
        if(field.values[LOCALE].urls['files'] !== undefined){
          url = ASSETS+field.values[LOCALE].urls['files'];
        }
      }

      return (
        <a href={url} target="_blank">
          {label}
        </a>
      );

    }
}
export default TranslatedFileField;
