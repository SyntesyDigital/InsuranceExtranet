import React, { Component } from 'react';

export default  class FieldList extends Component {

    constructor(props)
    {
        super(props);
    }

    render() {
        return (
          <div className="fields-list-container ">
            {this.props.children}
          </div>
        );
    }
}

FieldList.propTypes = {
};
