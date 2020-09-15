import React, { Component } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import moment from 'moment';


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

    render() {

        const fields = this.props.field.fields;
        const title = this.processTitle(fields, 0);
        const desc = this.processDesc(fields, 1);

        return (
            <div>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>
                            {title != null && title.length > 150 ? title.substring(0, 150) + ('...') : title}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div dangerouslySetInnerHTML={{ __html: desc }} />
                    </AccordionDetails>
                </Accordion>
            </div>
        );
    }
}




