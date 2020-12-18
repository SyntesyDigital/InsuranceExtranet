import React, { Component } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';

export default class Faqs extends Component {

    constructor(props) {
        super(props);
        moment.locale(LOCALE);
    }

    processTitle(fields, index) {
        return fields[index].value != null && fields[index].value[LOCALE] !== undefined ?
            fields[index].value[LOCALE] : '';
    }

    processDesc(fields, index) {
        return fields[index].value != null && fields[index].value[LOCALE] !== undefined ?
            fields[index].value[LOCALE] : '';
    }

    processIcon(fields, index) {
        return fields[index].value != null && fields[index].value !== undefined ?
            fields[index].value : '';
    }

    render() {

        const fields = this.props.field.fields;
        const title = this.processTitle(fields, 0);
        const desc = this.processDesc(fields, 2);
        const icon = this.processIcon(fields, 1);

        const HtmlAccordionSummary = withStyles((theme) => ({
            // expandIcon: {
            //     // transform: (icon ? 'none !important' : 'unset'),
            // },
        }))(AccordionSummary);


        return (
            <div>
                <Accordion>
                    <HtmlAccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>
                            {icon ? <i className={icon}></i> : null}{title != null && title.length > 150 ? title.substring(0, 150) + ('...') : title}
                        </Typography>
                    </HtmlAccordionSummary>
                    <AccordionDetails>
                        <div dangerouslySetInnerHTML={{ __html: desc }} />
                    </AccordionDetails>
                </Accordion>
            </div>
        );
    }
}




