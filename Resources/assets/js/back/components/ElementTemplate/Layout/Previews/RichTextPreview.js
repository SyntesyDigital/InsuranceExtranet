import React, {Component} from 'react';
import { render } from 'react-dom';

class RichTextPreview extends Component {

  constructor(props){
    super(props);

  }

  render() {

    const field = this.props.field;
    var value = null;

    if(field.value !== undefined &&
      field.value[DEFAULT_LOCALE] !== undefined ){

      value = field.value[DEFAULT_LOCALE];
    }

    if(value != null) {
      return (
        <a href="" className="richtext-preview">
          <div dangerouslySetInnerHTML={{ __html: value }} />
        </a>
      );
    }
    else {
      return (
        <a href="" className="btn btn-link">
          <i className={"fa "+field.icon}></i>
          <p className="title">{field.name}</p>
        </a>
      );
    }


  }

}
export default RichTextPreview;
