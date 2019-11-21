import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

import ImageField from './../Fields/ImageField';

class NewsBlog extends Component {

    constructor(props)
    {
        super(props);
        moment.locale(LOCALE);
    }

    componentDidMount() {

    }

    processText(fields,fieldName){
      return fields[fieldName].values != null && fields[fieldName].values[LOCALE] !== undefined ?
        fields[fieldName].values[LOCALE] : '' ;
    }

    render() {

      //console.log("NewsBlog => ",this.props.field);

      const fields = this.props.field.fields;

      const category = this.props.field.category != null ? this.props.field.category.name : null;
      const category_slug = this.props.field.category != null ? this.props.field.category.slug : null;
      var data = fields.data.values != null ? fields.data.values : null;

      const slug = this.processText(fields,'slug');
      const title = this.processText(fields,'title');
      const descripcio = this.processText(fields,'descripcio');
      const nom = this.processText(fields,'nom');
      const carrec = this.processText(fields,'carrec');
      var results = [];
      if(data != null){
        data = moment(data).format('L');
      }

      return (
        <div className={"post cat-"+category}>
          <p className="details">
            {data != null ? data : ''}
            {category != null && data != null ? '|' : ''}
            {category != null &&
              <a href={routes["categoryNews"].replace(":slug",category_slug)}>{category} </a>
            }
          </p>
          <p className="image">
            {fields.imatge &&
            <ImageField
              field={fields.imatge}
            />
            }
          </p>
          <h3><a href={this.props.field.url}>{ title}</a></h3>
          <p>{nom}</p>
          <p>{carrec}</p>
          <p>
            <span dangerouslySetInnerHTML={{__html: descripcio }} / >
          </p>

        </div>
      );

    }
}
export default NewsBlog;
