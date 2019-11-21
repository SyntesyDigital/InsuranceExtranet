import React, { Component } from 'react';
import ReactDOM from 'react-dom';


class FileField extends Component {

    constructor(props)
    {
        super(props);
    }

    render() {

      const field = this.props.field;
      const fieldLabel = this.props.labelFieldName !== undefined ? this.props.labelFieldName : false;
      var url = '';
      const label = this.props.label !== undefined ? this.props.label :
        (fieldLabel ? this.props.field.name : window.localization['GENERAL_WIDGET_DOWNLOAD_PDF']);

      console.log("FileField => ",field);

      if(field.values != null && field.values !== undefined && field.values != null){
        if(field.values.urls['files'] !== undefined){
          url = ASSETS+field.values.urls['files'];
        }
      }

      if(url != ''){
        return (
          <a href={url} target="_blank">
            {label}
          </a>
        );
      }

      return null;

    }
}
export default FileField;
