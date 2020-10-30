import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Typography from '@material-ui/core/Typography';
import './demo.scss';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
}));

function getSteps() {
    return [
        '06/04/1d5',
        '06/04/1sd5',
        '06/04/1da5'
    ];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return `Sans suite`;
        case 1:
            return 'An ad group contains ';
        case 2:
            return `Try out different`;
        default:
            return 'Unknown step';
    }
}

export default function VerticalLinearStepper() {
    const classes = useStyles();
    const [activeStep] = React.useState(0);
    const steps = getSteps();

    return (
        <div className={classes.root}>
            <Stepper
                activeStep={activeStep}
                orientation="vertical">
                {steps.map((label, index) => (
                    <Step
                        key={label}
                        expanded={true}
                    >
                        <StepLabel>{label}</StepLabel>
                        <StepContent>
                            <Typography>
                                {getStepContent(index)}
                            </Typography>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
        </div>
    );
}
