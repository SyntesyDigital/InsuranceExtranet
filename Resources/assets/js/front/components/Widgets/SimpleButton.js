import React, { Component } from 'react';
import CustomIcon from './../Common/CustomIcon';
import {
    getParametersFromContentField,
    getUrlParameters,
    getParametersFromURL,
    allowedLink
} from './functions';

export default class SimpleButton extends Component {

    constructor(props) {
        super(props);
    }

    processText(fields, index) {
        return fields[index].value != null && fields[index].value.title != null && fields[index].value.title[LOCALE] !== undefined ?
            fields[index].value.title[LOCALE] : '';
    }

    processIcon(fields, index) {
        return fields[index].value != null ?
            fields[index].value : '';
    }


    processLink(fields, index) {

        var content = fields[index].value != null && fields[index].value.content != null && fields[index].value.content !== undefined ?
            fields[index].value.content : null;
        var link = fields[index].value != null && fields[index].value.url != null && fields[index].value.url !== undefined
            ? fields[index].value.url : null;

        if (content != null) {
            var contentParameters = getParametersFromContentField(content);
            var formParameters = getParametersFromURL(this.props.parameters);
            var urlParameters = getUrlParameters(formParameters, true, contentParameters);

            return {
                url: content.url + '?' + urlParameters,
                target: '',
                allowed: allowedLink(content)
            }

        }
        else if (link != null) {
            return {
                url: link[LOCALE],
                target: '_blank',
                allowed: true
            };
        }
        return {
            url: '',
            target: '',
            allowed: false
        };
    }

    render() {
        const fields = this.props.field.fields;
        const title = this.processText(fields, 0);
        const link = this.processLink(fields, 0);
        const icon = this.processIcon(fields, 1);

        if (!link.allowed)
            return null;

        return (
            <div className="simple-button-container">
                <a
                    href={link.url}
                    target={link.target}
                    className={'simple-btn ' + (this.props.field.settings.btnClass ? this.props.field.settings.btnClass : '')}>
                    {icon != '' &&
                        <CustomIcon
                            icon={icon}
                        />
                    }
                    &nbsp; {title}
                </a>
            </div>
        );
    }
}


