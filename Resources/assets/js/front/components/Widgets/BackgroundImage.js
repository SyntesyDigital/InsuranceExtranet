import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const styles = {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    height: '100%',
    backgroundImage: `url('/storage/medias/original/${this.props}')`
}

export default class BackgroundImage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        console.log("background-image :: ", this.props);
        return (
            <div className="col-xs-12" style={styles}></div>
        );
    }
}

if (document.getElementById('background-image-widget')) {

    document.querySelectorAll('[id=background-image-widget]').forEach(function (element) {

        const propsContainer = document.getElementById("background-image-widget");
        const props = Object.assign({}, propsContainer.dataset);

        var elementObject = element.getAttribute('elementObject');
        var model = element.getAttribute('model');
        var parameters = element.getAttribute('parameters');

        ReactDOM.render(<BackgroundImage
            elementObject={elementObject}
            model={model}
            parameters={parameters}
            {...props}
        />, element);

    });
}