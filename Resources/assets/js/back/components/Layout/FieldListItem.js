import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FieldListItem extends Component {

  constructor(props) {
    super(props);

    this.onRemoveField = this.onRemoveField.bind(this);
    this.onOpenSettings = this.onOpenSettings.bind(this);
  }

  onRemoveField(event) {
    event.preventDefault();
    console.log('llega onRemoveField')

  }

  onOpenSettings(event) {
    event.preventDefault();
    console.log('llega onOpenSettings')

  }

  renderIcons() {

    if (this.props.icons === undefined)
      return null;

    return this.props.icons.map((item, index) =>
      <i className={item} key={index}></i>
    );
  }

  render() {

    const { identifier } = this.props;

    return (
      <div id={"field-list-item-" + identifier} className="typology-field field-list-item">
        <div className="field-type">
          <i className={this.props.icon}></i> &nbsp;
    					{this.props.label}

          <div className="type-info">
            <span className="text-success">
              {this.renderIcons()}
            </span>
          </div>

        </div>

        <div className="field-inputs">
          <div className="row">
            <div className="col col-xs-6 text-left">
              {this.props.labelInputLeft}
            </div>
            <div className="col col-xs-6 text-left">
              {this.props.labelInputRight}
            </div>
          </div>
        </div>

        <div className="field-actions text-right" style={{
          paddingRight: '15px'
        }}>

          <a href="" onClick={this.props.onClick}>
            <i className="fas fa-pencil-alt"></i> {Lang.get('header.configuration')}
          </a>
          <a href="" className="remove-field-btn" onClick={this.onRemoveField}>
            &nbsp;&nbsp;
                <i className="fa fa-trash"></i> {Lang.get('fields.delete')}
          </a>

        </div>
      </div>
    );
  }
}

FieldListItem.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icons: PropTypes.array,
  index: PropTypes.number,
  labelInputLeft: PropTypes.string,
  labelInputRight: PropTypes.string

};
