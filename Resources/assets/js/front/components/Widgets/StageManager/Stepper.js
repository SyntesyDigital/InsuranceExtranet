import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Step from './Step';


export default class StepperList extends React.Component {
    constructor(props) {
        super(props);
    }

    onSelect() {
        console.log("onSelect")
    }


    renderImageList() {

        const { steps, showNumber, activeStep } = this.props;
        const lastIndexOfSteps = steps.length - 1;
        
        return this.props.field.value.map((item, index) =>
            <Step
                field={item}
                index={index}
                activeStep={activeStep}
                onSelect={this.onSelect.bind(this)}
                lastIndexOfSteps={lastIndexOfSteps}
                showNumber={showNumber}
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

StepperList.defaultProps = {
    steps: [{ title: 'Step 1' }, { title: 'Step 2' }, { title: 'Step 3' }, { title: 'Step 4' }],
    showNumber: false,
    activeStep: 2,
    // onSelect: (step) => { }
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