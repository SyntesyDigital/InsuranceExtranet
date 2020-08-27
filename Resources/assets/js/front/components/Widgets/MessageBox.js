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
            type: 'info',
            message: '',
            loaded : false
        };
        // console.log("ICONS.messageBox.success" , ICONS.messageBox.success);
    }

    componentDidMount() {
        this.query();
    }

    getUrlParameters() {
        // concat parameters, first constant parameters
        var parameters = this.state.model.DEF1 != null ?
            this.state.model.DEF1 : '';

        if (parameters != '')
            parameters += "&";

        //then
        parameters += this.props.parameters;

        return parameters;

    }

    query() {

        var self = this;
        const { elementObject } = this.state;
        const parameters = this.getUrlParameters();

        axios.get('/architect/extranet/' + elementObject.id + '/model_values/data/1?' + parameters)
            .then(function (response) {
                if (response.status == 200
                    && response.data.modelValues !== undefined) {
                    console.log("ModelValues  :: componentDidMount => ", response.data);

                    if(response.data.modelValues === undefined || response.data.modelValues[0].type === undefined){
                        console.error("MessageBox :: bad configuration. Non modelValues recieved.")
                    }

                    self.setState({
                        type: response.data.modelValues !== undefined 
                            ? response.data.modelValues[0].type : 'info',
                        message: response.data.modelValues !== undefined && response.data.modelValues != null 
                            ? response.data.modelValues[0].message : '',
                        loaded : true
                    });
                } 

            }).catch(function (error) {
                console.log(error);
                self.setState({
                    loading: false
                });
            });
    }

    render() {
        return (
            <div>
                {this.state.loaded && this.state.message != '' &&
                    <div
                        className={`alert alert-${this.state.type} alert-dismissable`}
                        role="alert">
                        <i class={ICONS.messageBox[this.state.type]}></i>
                        {this.state.message}
                        <button
                            type="button"
                            className="close"
                            data-dismiss="alert"
                            aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                }
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


