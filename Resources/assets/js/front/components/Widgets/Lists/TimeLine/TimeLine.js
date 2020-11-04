import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ListParser from '../ListParser';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Typography from '@material-ui/core/Typography';
import './demo.scss';
import Demo from './demo';
import {
    parseNumber,
    parseDate,
    getConditionalFormating,
    hasConditionalFormatting,
    getConditionalIcon,
    hasConditionalIcon
} from '../../functions';

export default class TimeLine extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0
        }
    }

    hasConditionalFormatting(conditionalFormatting) {
        if (conditionalFormatting.color !== undefined) {
            return true;
        }
        return false;
    }

    renderField(item, identifier, field) {

        var value = item[identifier];
        var hasIcon = hasConditionalIcon(field, value);

        if (field.type == "date") {
            value = parseDate(value, field);
        }
        else if (field.type == "number") {
            value = parseNumber(value, field, item, this.props.parameters);
        }
        else if (field.type == "text") {
            switch (field.settings.format) {
                case 'password':
                    value = '******';
                    break;
            }
        }

        var style = getConditionalFormating(field, value);
        var hasColor = hasConditionalFormatting(style);
        var icon = getConditionalIcon(field, value);
        var hasIcon = hasConditionalIcon(icon);


        if (field.type == "file" || field.type == "file_ws_fusion") {
            return <div dangerouslySetInnerHTML={{ __html: value }} />
        }
        // has route
        else if (field.settings.hasRoute !== undefined && field.settings.hasRoute != null) {

            return <div className={(hasIcon ? 'has-icon' : '')}>
                {hasIcon ? <i className={icon.icon}></i> : null}
                <div
                    dangerouslySetInnerHTML={{
                        __html: item[identifier + "_url"]
                    }}
                />
            </div>
        }
        // has default
        else {
            return <div className={(hasIcon ? 'has-icon' : '')}>
                {hasIcon ? <i className={icon.icon}></i> : null}
                <div
                    className={hasColor ? 'has-color' : ''}
                    style={style}
                    dangerouslySetInnerHTML={{
                        __html: value
                    }}
                />
            </div>
        }
    }


    renderItem(item, elementObject) {

        var file = null;
        var infos = [];

        for (var key in elementObject.fields) {
            var identifier = elementObject.fields[key].identifier;

            if (elementObject.fields[key].type == 'file' || elementObject.fields[key].type == "file_ws_fusion") {
                file = this.renderField(item, identifier, elementObject.fields[key]);
                isFile = true;
            }
            else {
                infos.push(
                    this.renderField(item, identifier, elementObject.fields[key])
                );
            }
        }
        console.log("infos", infos)

        return (
            <Step
                expanded={true}
                key={key}
            >
                <StepLabel>{'text'}</StepLabel>
                <StepContent>
                    <Typography>
                        {infos}
                    </Typography>
                </StepContent>
            </Step>
        );
    }

    render() {
        console.log("this.props.field", this.props.field)
        return (
            <div>
                <Demo></Demo>
                <Stepper
                    activeStep={this.state.activeStep}
                    orientation="vertical">
                    <ListParser
                        customClass="timeline-container"
                        field={this.props.field}
                        elementObject={this.props.elementObject}
                        model={this.props.model}
                        pagination={this.props.pagination}
                        itemsPerPage={this.props.itemsPerPage}
                        columns={this.props.columns}
                        parameters={this.props.parameters}
                        renderItem={this.renderItem.bind(this)}
                        identifier={'timeline-field'}
                    />
                </Stepper>
            </div>
        );
    }
}

if (document.getElementById('timeline')) {
    document.querySelectorAll('[id=timeline]').forEach(function (element) {
        var field = element.getAttribute('field');
        var elementObject = element.getAttribute('elementObject');
        var model = element.getAttribute('model');
        var itemsPerPage = element.getAttribute('itemsPerPage');
        var parameters = element.getAttribute('parameters');
        var columns = element.getAttribute('columns');

        ReactDOM.render(<TimeLine
            field={field}
            elementObject={elementObject}
            model={model}
            itemsPerPage={itemsPerPage}
            columns={columns}
            parameters={parameters}
        />, element);
    });
}
