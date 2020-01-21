import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Layout/Modal';
import ToggleField from '../Layout/Fields/ToggleField';
import SidebarTitle from '../Layout/SidebarTitle';
import InputField from '../Layout/Fields/InputField';
import SelectField from '../Layout/Fields/SelectField';

const arrayOfOptions = [
  {
    id: '1 - Nico',
    name: 'nico'
  },
  {
    id: '2 - Sergi',
    name: 'sergi'
  },
  {
    id: '3 - Francicso',
    name: 'francisco'
  },
  {
    id: '4 - dani',
    name: 'dani'
  },
];

export default class ModalEditPermision extends Component {

  constructor(props) {

    super(props);

    this.state = {
      selectedValue: 'Nothing selected'
    };

  }

  handleSelectChange(selectedValue) {
    this.setState({
      selectedValue: selectedValue
    });
  }

  render() {

    return (

      <Modal
        id={this.props.id}
        icon={this.props.icon}
        title={'Permision | Edit'}
        display={this.props.display}
        zIndex={10000}
        onModalClose={this.props.onModalClose}
        size={this.props.size}
      >
        <div className="row">
          <div className="col-xs-6 field-col border-right">
            <SidebarTitle
              title={'ROLES'}
            />
            <ToggleField
              label={'Permiso 1'}

            />
            <ToggleField
              label={'Permiso 1'}
            />
            <ToggleField
              label={'Permiso 1'}
            />
            <ToggleField
              label={'Permiso 1'}
            />
            <ToggleField
              label={'Permiso 1'}
            />
          </div>

          <div className="col-xs-6 field-col">
            <InputField
              label={'Name'}
              value={''}
              name={'name'}
              placeholder={''}
            />
            <InputField
              label={'Identifier'}
              value={''}
              name={'identifier'}
              placeholder={''}
            />
            <SelectField
              arrayOfOptions={arrayOfOptions}
              label={'Group'}
              onSelectChange={this.handleSelectChange.bind(this)}
            />
          </div>
        </div>
      </Modal>
    );
  }
}

ModalEditPermision.propTypes = {
  id: PropTypes.string.isRequired,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  display: PropTypes.bool.isRequired,
  zIndex: PropTypes.number.isRequired,
  size: PropTypes.string.isRequired
};
