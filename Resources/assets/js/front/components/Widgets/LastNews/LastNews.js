import React, { Component } from 'react';
import moment from 'moment';

export default class LastNews extends Component {

    constructor(props) {
        super(props);
        moment.locale(LOCALE);
    }

    processText(fields, fieldName) {
        return fields[fieldName].values[LOCALE] != null && fields[fieldName].values[LOCALE] !== undefined ?
            fields[fieldName].values[LOCALE] : '';
    }

    processDesc(fields, fieldName) {
        return fields[fieldName].values != null && fields[fieldName].values[LOCALE] !== undefined ?
            fields[fieldName].values[LOCALE] : '';
    }

    processDate(fields, fieldName) {
        return fields[fieldName].values != null && fields[fieldName].values !== undefined ?
            fields[fieldName].values : '';
    }

    processLink(fields, fieldName) {
        return fields[fieldName].values != null && fields[fieldName].values !== undefined ? fields[fieldName].values[LOCALE]
            : fields[fieldName].values != null && fields[fieldName].values !== undefined ? fields[fieldName].value.url[LOCALE]
                : '';
    }

    processImage(fields, fieldName) {
        var url = null;

        if (fields[fieldName].values !== undefined && fields[fieldName].values != null) {
            if (fields[fieldName].values.urls !== undefined) {
                url = fields[fieldName].values.urls.original;
            }
        }

        return url;
    }

    render() {

        const fields = this.props.field.fields;
        const image = this.processImage(fields, 'image');
        const title = this.processText(fields, 'title');
        const link = this.processLink(fields, 'slug');
        const desc = this.processDesc(fields, 'description').replace(/(<([^>]+)>)/ig, "");
        const date = this.processDate(fields, 'date');
        const dateProcess = moment(date).format('ll');

        return (
            <div className="container-image-text-link">
                <div className="container-image">
                    <a href={link}>
                        {image ? <img src={'/' + image} width="100%" height="auto" /> : null}
                    </a>
                </div>
                <div className="container-title">
                    <h3 className="alignleft" href="#">
                        <a href={'/actualites/' + link}>
                            {title != null && title.length > 50 ? title.substring(0, 30) + ('...') : title}
                        </a>

                    </h3>
                    {date != '1970-01-01 01:00:00' ?
                        <h4 className="alignright">{dateProcess}</h4>
                        : null}
                </div>
                <div className="container-description">
                    {desc != null && desc.length > 150 ? desc.substring(0, 100) + (' [...]') : desc}
                </div>
                <div className="container-link">
                    {link ? <a href={'/actualites/' + link}>Lire plus</a> : null}
                </div>
            </div>
        );
    }
}




