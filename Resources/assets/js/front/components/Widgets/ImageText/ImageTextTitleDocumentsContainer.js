import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ImageTextTitleDocuments from './ImageTextTitleDocuments';
export default class ImageTextTitleDocumentsContainer extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ImageTextTitleDocuments
                field={this.props.field}
            />
        );
    }
}

if (document.getElementById('ImageTextTitleDocuments')) {
    document.querySelectorAll('[id=ImageTextTitleDocuments]').forEach(function (element) {
        var field = JSON.parse(atob(element.getAttribute('field')));
        const propsContainer = document.getElementById("ImageTextTitleDocuments");
        const props = Object.assign({}, propsContainer.dataset);
        ReactDOM.render(<ImageTextTitleDocumentsContainer
            field={field}
            {...props}
        />, element);
    });
}



