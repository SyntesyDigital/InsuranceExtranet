import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Modal from '../../../../Layout/Modal';
import DataTable from '../../../../Layout/DataTable';
import ContentDataTable from './ContentDataTable';

export default class RedirectModal extends Component {

    constructor(props) {
        super(props);
    }

    handleSelectItem(item) {
        console.log("handleSelectItem :: (item) => ",item);
        this.props.onContentSelect(item);
    }

    render() {
        return (
            <Modal
            id={'redirect-contents-modal'}
            icon={'fa fa-file'}
            title={'Contents'}
            display={this.props.display}
            zIndex={10000}
            onModalClose={this.props.onModalClose}
            >
            <div className="row">
                <div className="col-xs-12">
                    <ContentDataTable
                        init={this.props.display}
                        route={routes["contents.data"]+'?is_page=1&has_slug=1'}
                        onSelectItem={this.handleSelectItem.bind(this)}
                    />
                </div>
            </div>
            </Modal>
        );
    }
}

