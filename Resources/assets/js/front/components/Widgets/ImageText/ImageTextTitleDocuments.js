import React, { Component } from 'react';
import moment from 'moment';
import { ButtonSecondary } from "architect-components-library";
import iconSvg from './assets/img/bulle-bleue.svg';

export default class ImageTextTitleDocuments extends Component {

    constructor(props) {
        super(props);
        moment.locale(LOCALE);
    }

    processText(fields, index) {
        return fields[index].value != null && fields[index].value[LOCALE] !== undefined ?
            fields[index].value[LOCALE] : '';
    }
    processDesc(fields, index) {
        return fields[index].value != null && fields[index].value[LOCALE] != null ?
            fields[index].value[LOCALE] : "";
    }
    processTitleLink(fields, index) {
        return fields[index].value != null && fields[index].value.title != null ? fields[index].value.title[LOCALE]
            : '';          
    }
    processTitleLink2(fields, index) {
        return fields[index].value != null && fields[index].value.title != null ? fields[index].value.title[LOCALE]
            : '';          
    }
    processLink(fields, index) {
        return fields[index].value != null && fields[index].value.content != null ? fields[index].value.content.url
            : fields[index].value != null && fields[index].value.url != null ? fields[index].value.url[LOCALE]
                : '';
    }
    processLink2(fields, index) {
    
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
        console.log(fields)
        const image = this.processImage(fields, 0);
        const title = this.processText(fields, 1);
        const titleLink = this.processTitleLink(fields, 2);
        const link = this.processLink(fields, 2);
        const titleLink2 = this.processTitleLink2(fields, 3);
        const link2 = this.processLink2(fields, 3);
        const desc = this.processDesc(fields, 4).replace(/(<([^>]+)>)/ig, '');
        const fileLink = this.processFile(fields, 5);
        
        return (
            <div className="container-image-text-title-documents">
                <div className="container-image">
                    {image ? <img src={'/' + image} width="100%" /> : null}
                    <a href={ASSETS + fileLink} className="btn btn-primary">
                        <h5>{titleLink}</h5>
                    </a>
                </div>
                <div className="container-title">
                    <h4 className="alignleft" href="#">
                        {title}
                    </h4>
                </div>
                <div className="container-description">
                    {desc}
                </div>
                <div className="buttons-group text-center">
                    <a href={link2} className="btn btn-default"><h5>{titleLink2}</h5></a>
                </div>
            </div>
        );
    }
}





