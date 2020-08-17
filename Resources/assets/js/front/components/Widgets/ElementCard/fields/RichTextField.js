import React, { Component } from 'react';
import moment from 'moment';

class RichTextField extends Component {

    constructor(props) {
        super(props);
        moment.locale(LOCALE);
    }

    render() {

        const field = this.props.field;
        var value = null;

        if (field.value !== undefined &&
            field.value[LOCALE] !== undefined) {
            value = field.value[LOCALE];
        }

        if (value != null) {
            return (
                <div dangerouslySetInnerHTML={{ __html: value }} />
            );
        }
    }
}
export default RichTextField;
