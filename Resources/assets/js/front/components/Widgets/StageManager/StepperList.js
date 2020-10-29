import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Step from './Step';


export default class StepperList extends React.Component {
    constructor(props) {
        super(props);

        const activeStep = this.props.field.settings['initStage'] ?
            parseInt(this.props.field.settings['initStage'])
            : 1;
            
        this.state = {
            activeStep: activeStep,
            shownumber: true
        }
    }

    onSelect() {
        console.log("onSelect")
    }

    renderImageList() {

        const lastIndexOfSteps = this.props.field.value.length - 1;

        return this.props.field.value.map((item, index) =>
            <Step
                field={item}
                index={index}
                activeStep={this.state.activeStep}
                onSelect={this.onSelect.bind(this)}
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
        ReactDOM.render(<StepperList
            field={field}
        />, element);
    });
}