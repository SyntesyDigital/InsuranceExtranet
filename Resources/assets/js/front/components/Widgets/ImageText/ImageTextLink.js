import React, { Component } from 'react';
import moment from 'moment';
export default class ImageTextLink extends Component {

    constructor(props) {
        super(props);
        moment.locale(LOCALE);
    }

    processText(fields, index) {
        return fields[index].value.title != null && fields[index].value.title[LOCALE] !== undefined ?
            fields[index].value.title[LOCALE] : '';
    }

    processDesc(fields, index) {
        return fields[index].value != null && fields[index].value[LOCALE] !== undefined ?
            fields[index].value[LOCALE] : '';
    }

    processDate(fields, index) {
        return fields[index].value != null && fields[index].value !== undefined ?
            fields[index].value : '';
    }

    processLink(fields, index) {
        return fields[index].value.content != null && fields[index].value.content !== undefined ? fields[index].value.content.url
            : fields[index].value.url != null && fields[index].value.url !== undefined ? fields[index].value.url[LOCALE]
                : '';
    }

    processImage(fields, index) {
        var crop = "medium";
        var url = null;

        if (fields[index].settings != null && fields[index].settings.cropsAllowed !== undefined
            && fields[index].settings.cropsAllowed != null) {

            crop = fields[index].settings.cropsAllowed;
        }
        if (fields[index].value !== undefined && fields[index].value != null) {
            if (fields[index].value.urls[crop] !== undefined) {
                url = fields[index].value.urls[crop];
            }
        }
        return url;
    }

    render() {

        const fields = this.props.field.fields;
        const image = this.processImage(fields, 0);
        const title = this.processText(fields, 1);
        const link = this.processLink(fields, 1);
        const desc = this.processDesc(fields, 2).replace(/(<([^>]+)>)/ig, "");
        const date = this.processDate(fields, 3);
        const dateProcess = moment(date).format('ll');

        console.log("date : : " , date)

        return (
            <div className="container-image-text-link">
                <div className="container-image">
                    <a href={link}>
                        {image ? <img src={'/' + image} width="100%" /> : null}
                    </a>
                </div>
                <div className="container-title">
                    <h3 className="alignleft" href="#">
                        <a href={link}>
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
                    {link ? <a href={link}>Lire plus</a> : null}
                </div>
            </div>
        );
    }
}




