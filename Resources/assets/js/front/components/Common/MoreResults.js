import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class MoreResults extends Component {

    constructor(props)
    {
        super(props);
        this.onPageChange.bind(this);
    }

    onPageChange(page, e) {
        e.preventDefault();
        this.props.onChange(page);
    }

    render() {

        const nextPage = this.props.currPage < this.props.lastPage ? (this.props.currPage + 1) : this.props.lastPage;
        const display_button = this.props.currPage < this.props.lastPage && (null == this.props.maxItems || this.props.maxItems > this.props.currentItems) ?true:false;

        return ( <div>
                    {display_button &&
                      <div className="navigation">
                        <p className="btn"><a href="#" onClick={(e) => this.onPageChange(nextPage, e)}> {window.localization['GENERAL_READ_MORE']}</a></p>
                      </div>
                    }
                </div>
        );
    }
}

export default MoreResults;
