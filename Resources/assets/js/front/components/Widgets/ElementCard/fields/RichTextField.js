import React, { Component } from 'react';
import moment from 'moment';
import LabelTooltip from '../../../Common/LabelTooltip';

class RichTextField extends Component {

    constructor(props) {
        super(props);
        moment.locale(LOCALE);
    }

    render() {

        const field = this.props.field;
        var value = null;
        var hasDescription = null;

        if (field.value !== undefined &&
            field.value[LOCALE] !== undefined) {
            value = field.value[LOCALE];
            hasDescription = field.settings.description;
        }

        if (value != null) {
            return (
                <div lassName="row">
                    {hasDescription &&
                        <div className="label-container">
                            <label className={'bmd-label-floating'}>
                                <LabelTooltip
                                    description={field.settings.description ?
                                        field.settings.description : ''}
                                />
                            </label>  
                        </div>
                    }
                    <div
                        className="left-text-container"
                            dangerouslySetInnerHTML={{
                                __html: value
                            }}
                        />
                    
                </div>


                    
            );
        }
    }
}
export default RichTextField;
