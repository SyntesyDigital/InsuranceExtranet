import React, { Component } from 'react';
import ReactDOM from 'react-dom';


class UrlField extends Component {

    constructor(props)
    {
        super(props);
    }

    getPageSlug(content) {

      if(content != null && content.url !== undefined){
          return content.url;
      }
      return '';
    }

    render() {

      const field = this.props.field;
      var url = '';

      if(field.values != null && field.values !== undefined) {
        if(field.values.url !== undefined && field.values.url[LOCALE] !== undefined && field.values.url[LOCALE] != null){
          url = field.values.url[LOCALE];
        }
        else if(field.values.content !== undefined){
          url = WEBROOT+'/'+this.getPageSlug(field.values.content);
        }
      }

      if(url != ''){
        return (
          <a href={url} target={this.props.target}>
            {this.props.children}
          </a>
        );
      }
      else {
        return (
          <p className="titol">
            {this.props.children}
          </p>
        )
      }

    }
}
export default UrlField;
