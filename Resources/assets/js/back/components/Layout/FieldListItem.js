import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FieldListItem extends Component {

  constructor(props) {
    super(props);
  }

  // ==============================
  // Handlers
  // ==============================

  handleEdit(e) {
    this.props.onEdit();
  }

  handleRemove(e) {
    this.props.onRemove();
  }

  handleOnChange(e) {
    this.props.onChange(this.props.name, e.target.value);
  }

  // ==============================
  // Renderers
  // ==============================

  renderIcons() {

    if (this.props.icons === undefined)
      return null;

    return this.props.icons.map((item, index) =>
      <i className={item} key={index}></i>
    );
  }

  render() {

    const { identifier, isField } = this.props;

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
          {isField ? (
            <div className="row">
              <div className="col col-xs-6 text-left">
                {this.props.labelField}
              </div>
            </div>
          ) : (
              <div className="row">
                <div className="field-name col-xs-6">
                  <input type="text" className="form-control" name="name" value={this.props.labelInputLeft} onChange={this.handleOnChange.bind(this)} />
                </div>
                <div className="field-name col-xs-6">
                  <input disabled type="text" className="form-control" name="identifier" value={this.props.labelInputRight} onChange={this.handleOnChange.bind(this)} />
                </div>
              </div>
            )}
        </div>


        <div className="field-actions text-right" style={{
          paddingRight: '15px'
        }}>

          <a href="#" onClick={this.handleEdit.bind(this)}>
            <i className="fas fa-pencil-alt"></i> {Lang.get('header.configuration')}
          </a>
          <a href="#" className="remove-field-btn" onClick={this.handleRemove.bind(this)}>
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
  label: PropTypes.string,
  icons: PropTypes.array,
  index: PropTypes.number,
  labelInputLeft: PropTypes.string,
  labelInputRight: PropTypes.string,
  isField: PropTypes.bool,

  //onEvents props
  onEdit: PropTypes.func,
  onRemove: PropTypes.func

};
