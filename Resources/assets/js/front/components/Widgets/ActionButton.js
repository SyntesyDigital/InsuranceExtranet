import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import NumberFormat from 'react-number-format';
import "react-table/react-table.css";
import CustomIcon from './../Common/CustomIcon';

export default class ActionButton extends Component {

    constructor(props) {
        super(props);

        const elementObject = props.elementObject ? JSON.parse(atob(props.elementObject)) : null;
        const model = props.model ? JSON.parse(atob(props.model)) : null;
        const field = props.field ? JSON.parse(atob(props.field)) : null;

        this.state = {
            elementObject: elementObject,
            model: model,
            val1: null,
            field: field
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

        if (this.state.model == null) {
            //console.error("ActionButton :: model not defined");
            return;
        }

        var self = this;
        const { elementObject } = this.state;
        const parameters = this.getUrlParameters();

        axios.get('/architect/extranet/' + elementObject.id + '/model_values/data/1?' + parameters)
            .then(function (response) {
                if (response.status == 200
                    && response.data.modelValues !== undefined) {
                    console.log("ModelValues  :: componentDidMount => ", response.data);
                    self.setState({
                        val1: response.data.modelValues !== undefined
                            && response.data.modelValues.length > 0
                            && response.data.modelValues[0].val1 !== undefined
                            ? response.data.modelValues[0].val1
                            : 0,
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
            <div
                className={'action-button-container ' + (this.state.field.settings.actionBtnClass ?
                    this.state.field.settings.actionBtnClass
                    : 'action-btn-1')}
            >
                <div className="col-md-2 col-sm-2 col-xs-2 container-icon" >
                    {this.props.icon != '' &&
                        <CustomIcon
                            icon={this.props.icon}
                        />
                    }
                </div>
                <div className="col-md-7 col-sm-7 col-xs-7 container-title">
                    {this.props.title ? <p>{this.props.title}</p> : null}
                </div>
                <div className="col-md-3 col-sm-3 col-xs-3 container-number">
                    <span>
                        <NumberFormat
                            value={this.state.val1}
                            displayType={'text'}
                            thousandSeparator={true}
                            renderText={value => <div>{value.replace(',', '.')}</div>}
                        />
                    </span>
                </div>
            </div >
        );
    }
}

if (document.getElementById('actionButton')) {
    document.querySelectorAll('[id=actionButton]').forEach(function (element) {
        var elementObject = element.getAttribute('elementObject');
        var model = element.getAttribute('model');
        var parameters = element.getAttribute('parameters');
        var icon = element.getAttribute('icon');
        var title = element.getAttribute('title');
        var field = element.getAttribute('field');

        ReactDOM.render(<ActionButton
            elementObject={elementObject}
            model={model}
            parameters={parameters}
            title={title}
            icon={icon}
            field={field}
        />, element);
    });
}


