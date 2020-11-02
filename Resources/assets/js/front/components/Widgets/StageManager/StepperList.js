import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Step from './Step';

import {
    isDefined,
    parameteres2Array
} from './../Forms/functions';

import EventBus from './../../../../services/EventBus';

export default class StepperList extends React.Component {
    constructor(props) {
        super(props);

        var parametersObject = parameteres2Array(props.parameters);

        var initStage = isDefined(props.field.settings.initStage) ? props.field.settings.initStage : 1;
        var stageParameter = isDefined(props.field.settings.stageParameter) ? props.field.settings.stageParameter : null;
        var activeStep = isDefined(stageParameter) && isDefined(parametersObject[stageParameter]) ? parametersObject[stageParameter] :  initStage

        console.log("StepperList :: (initStage,stageParameter,activeStep,parametersObject)",initStage,stageParameter,activeStep,parametersObject);
            
        this.state = {
            activeStep: parseInt(activeStep),
            shownumber: true,
            stageParameter : stageParameter
        }

        var self = this;

        EventBus.subscribe('STAGE_UPDATE',(message,data) => {

                if(data.parameter == self.state.stageParameter){
                    self.setState({
                        activeStep : data.stage
                    });
                }
            }
        );
    }

    renderImageList() {

        const lastIndexOfSteps = this.props.field.value.length - 1;

        return this.props.field.value.map((item, index) =>
            <Step
                field={item}
                index={index}
                activeStep={this.state.activeStep}
                // onSelect={this.onSelect.bind(this)}
                lastIndexOfSteps={lastIndexOfSteps}
                showNumber={this.state.shownumber}
            />
        );
    }

    render() {
        return (
            <div className="stepper-container">
                {this.renderImageList()}
            </div>
        )
    }
}

StepperList.propTypes = {
    steps: PropTypes.arrayOf(PropTypes.shape({ title: PropTypes.string })),
    showNumber: PropTypes.bool,
    activeStep: PropTypes.number,
    onSelect: PropTypes.func,

}

if (document.getElementById('stepList')) {
    document.querySelectorAll('[id=stepList]').forEach(function (element) {
        var field = JSON.parse(atob(element.getAttribute('field')));
        var parameters = element.getAttribute('parameters');

        ReactDOM.render(<StepperList
            field={field}
            parameters={parameters}
        />, element);
    });
}