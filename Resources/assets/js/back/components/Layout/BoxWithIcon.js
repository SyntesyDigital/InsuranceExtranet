import React, { Component } from 'react';
import PropTypes from 'prop-types';

const styles = {
  color: '#455660A3',
};

export default class BoxWithIcon extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-xs-3">
        
          <a href={this.props.selectable ? '#' : this.props.route}>
            <div className="grid-item">
              <div className="grid-item-content">
                <i className={this.props.icon}></i>
                <p className="grid-item-name">
                  {this.props.name}
                </p>
                <span className="grid-item-date" style={styles}>
                  {this.props.subtitle}
                </span>
              </div>
              {this.props.selectable ?
                <div className="round">
                  <input
                    name={this.props.nameInput}
                    type='checkbox'
                    onClick={this.props.onSelect}
                    id={this.props.id}
                    checked={this.props.checked}
                  />
                  <label htmlFor={this.props.id}></label>
                </div>
                : null}
            </div>
          </a>
      </div>
    );
  }
}

BoxWithIcon.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  id: PropTypes.string,
  subtitle: PropTypes.string,
  selectable: PropTypes.bool,
  checked: PropTypes.bool,
  onSelect: PropTypes.func,
  route: PropTypes.string,
};
