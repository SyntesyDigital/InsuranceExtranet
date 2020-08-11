import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-table/react-table.css";


export default class MessageBox extends Component {

    constructor(props) {
        super(props);

        const elementObject = props.elementObject ? JSON.parse(atob(props.elementObject)) : null;
        const model = props.model ? JSON.parse(atob(props.model)) : null;

        this.state = {
            elementObject: elementObject,
            model: model,
            type: 'success',
            message: 'Este es el mensaje'
        };
    }

    componentDidMount() {
        // this.query();
    }

    // getUrlParameters() {
    //     // concat parameters, first constant parameters
    //     var parameters = this.state.model.DEF1 != null ?
    //         this.state.model.DEF1 : '';

    //     if (parameters != '')
    //         parameters += "&";

    //     //then
    //     parameters += this.props.parameters;

    //     return parameters;

    // }

    // query() {

    //     var self = this;
    //     const { elementObject } = this.state;
    //     const parameters = this.getUrlParameters();

    //     axios.get('/architect/extranet/' + elementObject.id + '/model_values/data/1?' + parameters)
    //         .then(function (response) {
    //             if (response.status == 200
    //                 && response.data.modelValues !== undefined) {
    //                 console.log("ModelValues  :: componentDidMount => ", response.data);

    //                 self.setState({
    //                     val1: response.data.modelValues !== undefined ? response.data.modelValues[0].val1 : 0,
    //                     val2: response.data.modelValues !== undefined ? response.data.modelValues[0].val2 : 0
    //                 });
    //             } 

    //         }).catch(function (error) {
    //             console.log(error);
    //             self.setState({
    //                 loading: false
    //             });
    //         });
    // }

    render() {
        return (
            <div>
                <div
                    className={`alert alert-${this.state.type} alert-dismissable`}
                    role="alert">
                    {this.state.message ? this.state.message : ''}
                    <button
                        type="button"
                        className="close"
                        data-dismiss="alert"
                        aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
        );
    }
}

if (document.getElementById('messageBox')) {
    document.querySelectorAll('[id=messageBox]').forEach(function (element) {
        var elementObject = element.getAttribute('elementObject');
        var model = element.getAttribute('model');
        var parameters = element.getAttribute('parameters');
        ReactDOM.render(<MessageBox
            elementObject={elementObject}
            model={model}
            parameters={parameters}
        />, element);
    });
}


