import React, { Component } from 'react';
import ReactDOM from 'react-dom';
export default class ContactInfo extends Component {

    constructor(props) {
        super(props);

        const elementObject = props.elementObject ? JSON.parse(atob(props.elementObject)) : null;
        const model = props.model ? JSON.parse(atob(props.model)) : null;

        this.state = {
            elementObject: elementObject,
            model: model,
        };
    }


    render() {
        return (
            <React.Fragment>
                <div className="col-xs-12 title">
                    <h4>{this.props.title ? this.props.title : null}</h4>
                </div>
                <div className="row">
                    <div className="col-xs-3 phone">
                        <a href={'tel:' + this.props.phone}><h4>{this.props.phone}</h4></a>
                    </div>
                    <div className="col-xs-3 email">
                        <a href={'mailto:' + this.props.email}><h4>{this.props.email}</h4></a>
                    </div>
                </div>
            </React.Fragment >
        );
    }
}

if (document.getElementById('contactInfo')) {
    document.querySelectorAll('[id=contactInfo]').forEach(function (element) {
        var elementObject = element.getAttribute('elementObject');
        var model = element.getAttribute('model');
        var parameters = element.getAttribute('parameters');
        var title = element.getAttribute('title');
        var phone = element.getAttribute('phone');
        var email = element.getAttribute('email');

        ReactDOM.render(<ContactInfo
            elementObject={elementObject}
            model={model}
            parameters={parameters}
            title={title}
            phone={phone}
            email={email}
        />, element);
    });
}


