import React, { Component } from 'react';
import moment from 'moment';
import ImageField from './../Fields/ImageField';

class News extends Component {

  constructor(props) {
    super(props);
    moment.locale(LOCALE);
  }

  processText(fields, fieldName) {
    return fields[fieldName].values != null && fields[fieldName].values[LOCALE] !== undefined ?
      fields[fieldName].values[LOCALE] : '';
  }

  render() {

    const fields = this.props.field.fields;
    var date = fields.date.values != null ? fields.date.values : null;

    if (date != null) {
      date = moment(date).format('L');
    }

    return (
      <div className="news">
        <div className="container-image">
          {fields.image &&
            <ImageField
              field={fields.image}
              width={48}
              height={48}
            />
          }
        </div>
        <div className="container-title">
          <div className="wrapper">
            <a href={this.props.field.url}>{fields.title.values[LOCALE] !== undefined ?
              fields.title.values[LOCALE] : ''}
            </a>
            <p className="text">
              {date != null &&
                <span className="data">
                  {date}
                </span>
              }
            </p>
          </div>
        </div>
      </div>
    );

  }
}
export default News;
