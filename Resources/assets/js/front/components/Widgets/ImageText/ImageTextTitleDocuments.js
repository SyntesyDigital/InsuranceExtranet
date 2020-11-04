import React, { Component } from 'react';
import moment from 'moment';

export default class ImageTextTitleDocuments extends Component {

    constructor(props) {
        super(props);
        moment.locale(LOCALE);
    }

    processTitle(fields, index) {
        return fields[index].value != null && fields[index].value[LOCALE] !== undefined ?
            fields[index].value[LOCALE] : '';
    }
    processDescription(fields, index) {
        return fields[index].value != null && fields[index].value[LOCALE] != null ?
            fields[index].value[LOCALE] : "";
    }
    processTitleDoc(fields, index) {
        return fields[index].value != null && fields[index].value != null ? fields[index].value[LOCALE]
            : '';
    }
    processLinkDoc(fields, index) {
        return fields[index].value != null && fields[index].value.content != null ? fields[index].value.content.url
            : fields[index].value != null && fields[index].value.url != null ? fields[index].value.url[LOCALE]
                : '';
    }
    processTitleButton(fields, index) {
        return fields[index].value != null && fields[index].value.title != null ? fields[index].value.title[LOCALE]
            : '';
    }
    processLink(fields, index) {
        return fields[index].value != null && fields[index].value.content != null ? fields[index].value.content.url
            : fields[index].value != null && fields[index].value.url != null ? fields[index].value.url[LOCALE]
                : '';
    }
    processLinkButton(fields, index) {

        return fields[index].value != null && fields[index].value.content != null ? fields[index].value.content.url
            : fields[index].value != null && fields[index].value.url != null ? fields[index].value.url[LOCALE]
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

    processFile(fields, index) {
        return fields[index].value != null ? fields[index].value.urls.files
            : '';
    }

    render() {

        const fields = this.props.field.fields;
        const image = this.processImage(fields, 0);
        const title = this.processTitle(fields, 1);
        const titleDoc = this.processTitleDoc(fields, 2);
        const linkDoc = this.processLinkDoc(fields, 3);
        const titleButton = this.processTitleButton(fields, 4);
        const linkButton = this.processLinkButton(fields, 4);
        const description = this.processDescription(fields, 5).replace(/(<([^>]+)>)/ig, '');
        const linkFile = this.processFile(fields, 6);

        const hasUrlDoc = fields[3].value != null && fields[3].value.content != null ? true
            : fields[3].value != null && fields[3].value.url != null ? true
                : false;

        return (
            <div className="container-image-text-title-documents">
                <div className="container-image">
                    {image ? <img src={'/' + image} width="100%" /> : null}
                    <a href={hasUrlDoc ? linkDoc : (ASSETS + linkFile)} className="btn btn-primary">
                        <h5>{titleDoc}</h5>
                    </a>
                </div>
                <div className="container-title">
                    <h4 className="alignleft" href="#">
                        {title}
                    </h4>
                </div>
                <div className="container-description">
                    {description}
                </div>
                <div className="buttons-group text-center">
                    <a href={linkButton} className="btn btn-default"><h5>{titleButton}</h5></a>
                </div>
            </div>
        );
    }
}





