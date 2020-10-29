import React from 'react';
import PropTypes from 'prop-types'
import moment from 'moment';

export default class Step extends React.Component {
    constructor(props) {
        super(props);
        moment.locale(LOCALE);
    }

    processText(fields, index) {
        return fields[index].value != null && fields[index].value[LOCALE] !== undefined ?
            fields[index].value[LOCALE] : '';
    }

    render() {
        
        const { index, activeStep, lastIndexOfSteps, showNumber } = this.props;
        const fields = this.props.field.fields;
        const title = this.processText(fields, 0);

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
                        // onClick={onSelect.bind(null, index + 1)}
                    >
                        <div className={`stepper-item-inner ${(activeStep === (index + 1)) ?
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
                        {title}
                    </span>
                </div>
                {lastIndexOfSteps === index ?
                    ''
                    : <div className="stepper-item-outer"><div className="stepper-item-outer-inner"></div></div>}
            </React.Fragment>

        )
    }
}

Step.propTypes = {
    index: PropTypes.number,
    activeStep: PropTypes.number,
    onSelect: PropTypes.func,
    lastIndexOfSteps: PropTypes.number,
    showNumber: PropTypes.number,
};

