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

/**
 *  Esta modal debe autogestionarse, esto quiere decir que cuando haga submit va a
 *  guardar la información del permiso vinculada a todos los roles. 
 *  A parte debe generar un resultado con el valor del permiso para que pueda
 *  actualizar la vista general ( solo si es necesario )
 *  
 *  Acciones : 
 *    - leer cual son los roles y grupos de un permiso en question
 *    - guardar la información del permiso y de los roles, crear o editar.
 *    
 */
export default class ModalEditPermision extends Component {

  constructor(props) {

    super(props);

    //init values to process this modal
    this.state = {
      values : {
        name : '',
        identifier : '',
        group : ''
      },
      groups : props.groups,
      roles : [{
              id : 1,
              identifier : 'admin',
              name : 'Admin',
              value : true
          },
          {
              id : 2,
              identifier : 'client',
              name : 'Client',
              value : false
          }
      ]
    }

  }

  componentDidUpdate(prevProps,prevState) {
    var name = '';
    var identifier = '';
    var group = '';

    if(!prevProps.display && this.props.display){
      //if we are showing the modal, see if new parameters to setup
      if(this.props.group != null){
        group = this.props.group.id;
      }
      if(this.props.permission != null){
        name = this.props.permission.name;
        identifier = this.props.permission.identifier;
      }

      this.setState({
        values : {
          name : name,
          identifier : identifier,
          group : group
        }
      });
    }
  }

  handleSelectChange(selectedValue) {
    this.setState({
      selectedValue: selectedValue
    });
  }

  handleRoleChange(role,e) {
    console.log("handleRoleChange :: (e,role)",e,role);
  }

  renderRoles() {

    if(this.state.roles === undefined || this.state.roles == null)
      return null;

    return this.state.roles.map((item,index) => 
        <ToggleField
            key={item.id}
            label={item.name}
            checked={item.value}
            onChange={this.handleRoleChange.bind(this,item)}
        />
    )
  }

  render() {

    const {group,permission,roles} = this.props;

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
            {this.renderRoles()}
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
  size: PropTypes.string.isRequired,
  roles: PropTypes.array.isRequired,
  permission : PropTypes.object,
  group : PropTypes.object
};

