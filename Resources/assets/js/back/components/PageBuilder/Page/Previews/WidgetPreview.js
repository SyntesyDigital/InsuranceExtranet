import React, {Component} from 'react';
import { render } from 'react-dom';



class WidgetPreview extends Component {

  constructor(props){
    super(props);

  }

  getFirstTitle() {
    const field = this.props.field;

    for(var index in field.fields){
      var currentField = field.fields[index];

      if(currentField.type == ELEMENT_TEMPLATE_FIELDS.TEXT.type){
        if(currentField.value !== undefined &&
            currentField.value[DEFAULT_LOCALE] !== undefined &&
            currentField.value[DEFAULT_LOCALE] != null ){
              return currentField.value[DEFAULT_LOCALE];
        }
      }
    }
    return null;
  }

  render() {

    const field = this.props.field;
    const title = this.getFirstTitle();


    return (
      <a href="" className="btn btn-link">
        <i className={field.icon}></i>

        {title == null &&
          <p className="title">{field.name}</p>
        }
        {title != null &&
          <p className="title">{title}</p>
        }

      </a>
    );


  }

}
export default WidgetPreview;
