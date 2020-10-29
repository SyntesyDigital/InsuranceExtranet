import React from 'react';
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom';


export default class Step extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {index, activeStep, lastIndexOfSteps, title, showNumber} = this.props;
        console.log(this.props)
        return (
            <div>
                <div className="stepper-item" id={(this.props.index + 1) < this.props.activeStep ?
                    'stepper-item-completed'
                    : 'stepper-item-uncompleted'
                }>
                    <div
                        className={`stepper-item-outer ${this.props.activeStep === (this.props.index + 1) ? 'stepper-item-outer-active' : ''}`}
                        onClick={this.props.onSelect.bind(null, this.props.index + 1)}
                    >
                        <div className={`stepper-item-inner ${this.props.activeStep === (this.props.index + 1) ? 'stepper-item-inner-active'
                            : (this.props.index + 1) < this.props.activeStep ? 'stepper-item-inner-completed' : 'stepper-item-inner-future'}`}
                        >
                            {(this.props.index + 1) < this.props.activeStep ? <i className="fas fa-check"></i> : this.props.showNumber && this.props.index + 1}
                        </div>
                    </div>
                    <span className={`stepper-title ${this.props.activeStep === (this.props.index + 1) ? 'stepper-title-active' : ''}`}>
                        {this.props.title}
                    </span>
                </div>
                {this.props.lastIndexOfSteps === this.props.index ? '' : <div className="stepper-item-outer"><div className="stepper-item-outer-inner"></div></div>}
            </div>
        )
    }
}

Step.propTypes = {
    index: PropTypes.number,
    activeStep: PropTypes.number,
    onSelect: PropTypes.func,
    title: PropTypes.string,
    lastIndexOfSteps: PropTypes.number,
    showNumber: PropTypes.number,
};

