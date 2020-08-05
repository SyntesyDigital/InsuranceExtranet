import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../Layout/Modal';
import ToggleField from '../../Layout/Fields/ToggleField';
import InputField from '../../Layout/Fields/InputField';
import SelectField from '../../Layout/Fields/SelectField';


// import { connect } from 'react-redux';
// import {
//     cancelEditCurrency,
//     removeCurrency,
//     saveCurrency,
//     loadCurrency,
// } from './actions';

/**
 *  Esta modal debe autogestionarse, esto quiere decir que cuando haga submit va a
 *  guardar la información del permiso vinculada a todos los currencies. 
 *  A parte debe generar un resultado con el valor del currency para que pueda
 *  actualizar la vista general ( solo si es necesario )
 *  
 *  Acciones : 
 *    - leer cual son los currencies en question
 *    - guardar la información del currency, crear o editar.
 *    
 */

export default class ModalEditCurrencies extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currency: {
                id: null,
                code: null,
                label: null,
                symbole: null,
                symbole_position: null,
                decimals: null,
                decimals_separator: null,
                thousands_separator: null,
                default: null,
            }
        }
    }

    // ==============================
    // Handlers
    // ==============================

    handleCancel() {
        console.log("handleCancel Currency");
    }

    handleRemove() {
        console.log("handleRemove Currency");
    }

    handleChange(item, e) {
        console.log("handleChange :: (e,item)", e, item);
    }

    handleFieldChange(name, value) {
        const currency = this.state.currency;
        currency[name] = value;
        this.setState({
            currency: currency
        });
        console.log("handleFieldChange :: ", name, value)
        console.log(this.state.currency);
    }

    handleSubmit() {
        console.log("handleSubmit Currency :: ");
    }

    // ==============================
    // Renderers
    // ==============================

    render() {
        var simbolePositions = [
            {
                name: '',
                value: '--'
            },
            {
                name: 'droite',
                value: 'R'
            },
            {
                name: 'gauche',
                value: 'L'
            },
        ];
        return (
            <Modal
                id={this.props.id}
                icon={this.props.icon}
                title={this.props.title}
                display={this.props.display}
                zIndex={10000}
                onModalClose={this.props.onModalClose}
                onCancel={this.props.onCancel}
                onRemove={this.handleRemove.bind(this)}
                onSubmit={this.handleSubmit.bind(this)}
                size={'medium'}
            >
                <div className="row">
                    <div className="col-xs-12 field-col">
                        <InputField
                            label={'Libellé'}
                            value={this.state.currency.label}
                            name={'label'}
                            onChange={this.handleFieldChange.bind(this)}
                        />
                        <InputField
                            label={'ISO'}
                            value={this.state.currency.code}
                            name={'code'}
                            onChange={this.handleFieldChange.bind(this)}
                        />
                        <InputField
                            label={'Symbol'}
                            value={this.state.currency.symbole}
                            name={'symbole'}
                            onChange={this.handleFieldChange.bind(this)}
                        />
                        <SelectField
                            arrayOfOptions={simbolePositions}
                            label={'Position symbol'}
                            name={'symbole_position'}
                            value={this.state.currency.symbole_position}
                            onChange={this.handleFieldChange.bind(this)}
                        />
                        <InputField
                            label={'Número de decimals'}
                            value={this.state.currency.decimals}
                            name={'decimals'}
                            onChange={this.handleFieldChange.bind(this)}
                        />
                        <InputField
                            label={'Separateur décimales'}
                            value={this.state.currency.decimals_separator}
                            name={'decimals_separator'}
                            onChange={this.handleFieldChange.bind(this)}
                        />
                        <InputField
                            label={'Separateur milliers'}
                            value={this.state.currency.thousands_separator}
                            name={'thousands_separator'}
                            onChange={this.handleFieldChange.bind(this)}
                        />
                        <ToggleField
                            label={'Défault'}
                            name={'default'}
                            checked={this.state.currency.default}
                            onChange={this.handleFieldChange.bind(this)}
                        />
                    </div>
                </div>
            </Modal>
        );
    }
}

// const mapStateToProps = state => {
//     return {
//         form: state.form,
//         modal: state.modalPermission
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         cancelEditCurrency: () => {
//             return dispatch(cancelEditCurrency());
//         },
//         removeCurrency: (currency) => {
//             return dispatch(removeCurrency(currency));
//         },
//         loadCurrency: (currency) => {
//             return dispatch(loadCurrency(currency));
//         },
//         saveCurrency: (currency) => {
//             return dispatch(saveCurrency(currency));
//         }
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(ModalEditCurrencies);


ModalEditCurrencies.propTypes = {
    id: PropTypes.string.isRequired,
    icon: PropTypes.string,
    title: PropTypes.string.isRequired,
    display: PropTypes.bool.isRequired,
    zIndex: PropTypes.number.isRequired,
    size: PropTypes.string.isRequired,
    currencies: PropTypes.array.isRequired,
    currency: PropTypes.object,
    onSubmit: PropTypes.func,
    onRemove: PropTypes.func,
    onCancel: PropTypes.func
};

