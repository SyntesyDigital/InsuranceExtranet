import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ListParser from '../ListParser';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Typography from '@material-ui/core/Typography';
import './demo.scss';
import Demo from './demo';
export default class TimeLine extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0
        }
    }

    renderItem(item, elementObject) {
        console.log("item", item)
        console.log("elementObject ", elementObject)
        var steps = [];


        var name = item.assnom_per;
        var content = item.assnom_per;

        steps.push(
            <Step
                expanded={true}
            >
                <StepLabel>{name}</StepLabel>
                <StepContent>
                    <Typography>
                        conent descripcion
                    </Typography>
                </StepContent>
            </Step>
        );

        return (
            <Stepper
                activeStep={this.state.activeStep}
                orientation="vertical">
                {steps}
            </Stepper>
        );
    }

    render() {
        console.log("this.props.field" , this.props.field)
        return (
            <div>
                <Demo></Demo>
                <ListParser
                    customClass="timeline-container"
                    field={this.props.field}
                    elementObject={this.props.elementObject}
                    model={this.props.model}
                    pagination={this.props.pagination}
                    itemsPerPage={this.props.itemsPerPage}
                    columns={this.props.columns}
                    parameters={this.props.parameters}
                    renderItem={this.renderItem.bind(this)}
                    identifier={'timeline-field'}
                    onReverse={true}
                />
            </div>
        );
    }
}

if (document.getElementById('timeline')) {
    document.querySelectorAll('[id=timeline]').forEach(function (element) {
        var field = element.getAttribute('field');
        var elementObject = element.getAttribute('elementObject');
        var model = element.getAttribute('model');
        var itemsPerPage = element.getAttribute('itemsPerPage');
        var parameters = element.getAttribute('parameters');
        var columns = element.getAttribute('columns');

        ReactDOM.render(<TimeLine
            field={field}
            elementObject={elementObject}
            model={model}
            itemsPerPage={itemsPerPage}
            columns={columns}
            parameters={parameters}
        />, element);
    });
}
