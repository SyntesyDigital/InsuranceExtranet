import React, { Component } from 'react';
import moment from 'moment';

export default class SimpleButton extends Component {

    constructor(props) {
        super(props);
        moment.locale(LOCALE);
    }

    processText(fields, index) {
        return fields[index].value != null && fields[index].value.title != null && fields[index].value.title[LOCALE] !== undefined ?
            fields[index].value.title[LOCALE] : '';
    }

    processLink(fields, index) {
        return fields[index].value != null && fields[index].value.content != null && fields[index].value.content !== undefined ? fields[index].value.content.url
            : fields[index].value != null && fields[index].value.url != null && fields[index].value.url !== undefined ? fields[index].value.url[LOCALE]
                : '';
    }

    render() {
        const fields = this.props.field.fields;
        const title = this.processText(fields, 0);
        const link = this.processLink(fields, 0);

        return (
            <div className="simple-button-container">
                <a href={link} className={'simple-btn ' + (this.props.field.settings.btnClass ? this.props.field.settings.btnClass : '')}>
                    {title}
                </a>
            </div>
        );
    }
}


