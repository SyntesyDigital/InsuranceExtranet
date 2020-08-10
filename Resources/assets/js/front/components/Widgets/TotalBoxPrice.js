import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import NumberFormat from 'react-number-format';
import "react-table/react-table.css";


export default class TotalBoxPrice extends Component {

    constructor(props) {
        super(props);

        const elementObject = props.elementObject ? JSON.parse(atob(props.elementObject)) : null;
        const model = props.model ? JSON.parse(atob(props.model)) : null;

        this.state = {
            elementObject: elementObject,
            model: model,
            val1: null,
            val2: null
        };
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

                    self.setState({
                        val1: response.data.modelValues !== undefined ? response.data.modelValues[0].val1 : 0,
                        val2: response.data.modelValues !== undefined ? response.data.modelValues[0].val2 : 0
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
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12 title-container">
                        <div className="title">{this.props.title ? this.props.title : null}</div>
                    </div>
                    <div className="col-md-12 col-sm-12 col-xs-12 number-container">
                        <div className="col-md-4 nopadding">
                            <NumberFormat
                                value={this.state.val2}
                                displayType={'text'}
                                thousandSeparator={true}
                                renderText={value => <div>{value.replace(',', '.')}</div>}
                            />
                        </div>
                        <div className="col-md-8 nopadding container-subtitle">
                            <p>
                                <span className="subtitle">
                                    {this.props.subTitle ? this.props.subTitle : null}{" "}
                                    <NumberFormat
                                        value={this.state.val1}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                    />
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="col-md-12 col-sm-12 col-xs-12 container-subtitle2">
                        <p><span className="subtitle2">{this.props.subTitle2 ? this.props.subTitle2 : null}</span></p>
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('totalBoxPrice')) {
    document.querySelectorAll('[id=totalBoxPrice]').forEach(function (element) {
        var elementObject = element.getAttribute('elementObject');
        var model = element.getAttribute('model');
        var parameters = element.getAttribute('parameters');
        var title = element.getAttribute('title');
        var subTitle = element.getAttribute('subTitle');
        var subTitle2 = element.getAttribute('subTitle2');
        ReactDOM.render(<TotalBoxPrice
            elementObject={elementObject}
            model={model}
            parameters={parameters}
            title={title}
            subTitle={subTitle}
            subTitle2={subTitle2}
        />, element);
    });
}


