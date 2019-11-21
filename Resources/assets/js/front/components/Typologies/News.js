import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

import ImageField from './../Fields/ImageField';

class News extends Component {

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

      const fields = this.props.field.fields;
      console.log("News => ",this.props.field);

      const category = this.props.field.category != null ? this.props.field.category.name : null;
      const description = this.processText(fields,'descripcio');

      var data = fields.data.values != null ? fields.data.values : null;
      if(data != null){
        data = moment(data).format('L');
      }

      return (
        <div className="news">
          <p className="image">
            {fields.imatge &&
            <ImageField
              field={fields.imatge}
            />
            }
          </p>
          <p className="text">

              {data != null &&
                <span className="data">
                  {data}
                </span>
              }

            {category != null && data != null ? '|' : ''}

            {category != null &&
              <span className="categoria">{category} </span>
            }

          </p>

          <a href={this.props.field.url}>{fields.title.values[LOCALE] !== undefined ?
            fields.title.values[LOCALE] : '' }
          </a>

          {this.props.extended &&
            <div className="intro"
              dangerouslySetInnerHTML={{__html: description}}
            >
            </div>
          }

        </div>
      );

    }
}
export default News;
