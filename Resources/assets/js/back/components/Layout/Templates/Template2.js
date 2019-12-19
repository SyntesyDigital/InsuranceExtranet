import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Template2 extends Component {
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Example Component</div>

                            <div className="card-body">
                                Im an example 2!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('template-2')) {
    ReactDOM.render(<Template2 />, document.getElementById('template-2'));
}
