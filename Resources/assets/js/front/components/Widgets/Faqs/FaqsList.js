import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Faqs from './Faqs';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default class FaqsList extends Component {

    constructor(props) {
        super(props);
    }

    renderFaqsList() {

        return this.props.field.value.map((item, index) =>
            <Faqs
                field={item}
                key={index}
                parameters={this.props.parameters}
            />
        );
    }

    render() {
        return (
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Title Main</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {this.renderFaqsList()}
                </AccordionDetails>
            </Accordion >
        )
    }
}

if (document.getElementById('faqsList')) {
    document.querySelectorAll('[id=faqsList]').forEach(function (element) {
        var field = JSON.parse(atob(element.getAttribute('field')));
        const props = Object.assign({}, element.dataset);
        ReactDOM.render(<FaqsList
            field={field}
            {...props}
        />, element);
    });
}



