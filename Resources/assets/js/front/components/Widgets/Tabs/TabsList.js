import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SimpleButton from '../SimpleButton';
import MaskSvg from './MaskSvg';
import moment from 'moment';

export default class TabsList extends Component {

    constructor(props) {
        super(props);
        moment.locale(LOCALE);
    }

    renderActionList() {

        return this.props.field.value.map((item, index) =>
            <React.Fragment>
                <li
                    className={"container-tab" +
                        (window.location.pathname === (item.fields[0].value.content != null && item.fields[0].value.content !== undefined ?
                            item.fields[0].value.content.url
                            : item.fields[0].value.url != null && item.fields[0].value.url !== undefined ?
                                item.fields[0].value.url[LOCALE] : '') ?
                            ' active'
                            : '')
                    }
                >
                    <SimpleButton
                        field={item}
                        key={index}
                        parameters={this.props.parameters}
                    />
                    <MaskSvg
                        fill={window.location.pathname === (item.fields[0].value.content != null && item.fields[0].value.content !== undefined ?
                            item.fields[0].value.content.url
                            : item.fields[0].value.url != null && item.fields[0].value.url !== undefined ?
                                item.fields[0].value.url[LOCALE] : '') ?
                            STYLES.tabslist.backgroundColorActiveTab
                            : STYLES.tabslist.backgroundColorTab}
                        width={'60'}
                        height={'auto'}
                    />
                </li>
            </React.Fragment>
        );
    }

    render() {
        return (
            <div className="tabs-list-container">
                <ul className="nav nav-pills">
                    {this.renderActionList()}
                </ul>
            </div>
        )
    }
}

if (document.getElementById('tabsList')) {
    document.querySelectorAll('[id=tabsList]').forEach(function (element) {
        var field = JSON.parse(atob(element.getAttribute('field')));
        const props = Object.assign({}, element.dataset);
        ReactDOM.render(<TabsList
            field={field}
            {...props}
        />, element);
    });
}



