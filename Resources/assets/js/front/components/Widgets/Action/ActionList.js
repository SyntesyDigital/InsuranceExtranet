import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SimpleButton from '../SimpleButton';

export default class ActionList extends Component {

    constructor(props) {
        super(props);
    }

    renderActionList() {
        
        return this.props.field.value.map((item, index) =>
            <SimpleButton
                field={item}
                key={index}
                parameters={this.props.parameters}
            />
        );
    }

    render() {
        return(
            <div className="action-list-container">
                <label data-toggle="dropdown">Autres actions</label>
                <a href="#" className="dropdown-toggle btn-action" data-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-h"></i></a>
                <ul className="dropdown-menu default-padding">
                    {this.renderActionList()} 
                </ul>
            </div>
        )
    }
}

if (document.getElementById('actionList')) {
    document.querySelectorAll('[id=actionList]').forEach(function (element) {
        var field = JSON.parse(atob(element.getAttribute('field')));
        ReactDOM.render(<ActionList
            field={field}
        />, element);
    });
}



