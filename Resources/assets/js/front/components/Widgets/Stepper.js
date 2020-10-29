import React from 'react';
import PropTypes from 'prop-types';

export default class Stepper extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { steps, showNumber, activeStep, onSelect } = this.props;
        const lastIndexOfSteps = steps.length - 1;
        return (
            <React.Fragment>
                <div className="stepper-container">
                    {steps.map((step, index) => {
                        return (
                            <React.Fragment key={index}>
                                <div className="stepper-item" id={(index + 1) < activeStep ?
                                    'stepper-item-completed'
                                    : 'stepper-item-uncompleted'
                                }>
                                    <div
                                        className={`stepper-item-outer ${activeStep === (index + 1)
                                            ? 'stepper-item-outer-active'
                                            : ''}`}
                                        onClick={onSelect.bind(null, index + 1)}
                                    >
                                        <div className={`stepper-item-inner ${activeStep === (index + 1) ?
                                            'stepper-item-inner-active'
                                            : (index + 1) < activeStep ?
                                                'stepper-item-inner-completed'
                                                : 'stepper-item-inner-future'
                                            }`}
                                        >
                                            {(index + 1) < activeStep ? <i className="fas fa-check"></i> : showNumber && index + 1}
                                        </div>
                                    </div>
                                    <span className={`stepper-title ${activeStep === (index + 1)
                                        ? 'stepper-title-active'
                                        : ''}
                                    `}>
                                        {step.title}
                                    </span>
                                </div>
                                {lastIndexOfSteps === index ? 
                                '' 
                                : <div className="stepper-item-outer"><div className="stepper-item-outer-inner"></div></div>}
                            </React.Fragment>
                        )
                    })}
                </div>
            </React.Fragment>
        )
    }
}

Stepper.defaultProps = {
    steps: [{ title: 'Step 1' }, { title: 'Step 2' }, { title: 'Step 3' }, { title: 'Step 4' }],
    showNumber: false,
    activeStep: 2,
    onSelect: (step) => { }
}

Stepper.propTypes = {
    steps: PropTypes.arrayOf(PropTypes.shape({ title: PropTypes.string })),
    showNumber: PropTypes.bool,
    activeStep: PropTypes.number,
    onSelect: PropTypes.func
}