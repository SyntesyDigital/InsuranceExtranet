import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

const useStylesBootstrap = makeStyles(theme => ({
    arrow: {
        color: '#ffff',
    },
    tooltip: {
        backgroundColor: '#ffff',
        color: '#2a3649',
        fontSize: '12px',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 1)'
    },
}));

function BootstrapTooltip(props) {
    const classes = useStylesBootstrap();
    return <Tooltip arrow classes={classes} {...props} />;
}

export default class CarField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyGen: [],
            arrayPoints: [
                {
                    identifier: 'AILE-AR-D',
                    className: 'bottom-left',
                    name: 'AILE-AR-D',
                    label: 'AILE AR D',
                    tooltip: 'Aile arrière droite',
                    checked: false,
                    value: ''
                },
                {
                    identifier: 'PORTIERE-D',
                    className: 'bottom-middle',
                    name: 'PORTIERE-D',
                    label: 'PORTIERE D',
                    tooltip: 'Portière droite',
                    checked: false,
                    value: ''
                },
                {
                    identifier: 'RETRO-D',
                    className: 'bottom-retroviseur',
                    name: 'RETRO-D',
                    label: 'RETRO D',
                    tooltip: 'Rétroviseur droit',
                    checked: false,
                    value: ''
                },
                {
                    identifier: 'AILE-AV-D',
                    className: 'bottom-right',
                    name: 'AILE-AR-D',
                    label: 'AILE AR D',
                    tooltip: 'Aile avant droite',
                    checked: false,
                    value: ''
                },
                {
                    identifier: 'CHOC-AV',
                    className: 'middle-right',
                    name: 'CHOC-AV',
                    label: 'CHOC AV',
                    tooltip: 'Pare-choc avant',
                    checked: false,
                    value: ''
                },
                {
                    identifier: 'CAPOT',
                    className: 'quart-middle',
                    name: 'CAPOT',
                    label: 'CAPOT',
                    tooltip: 'Capot',
                    checked: false,
                    value: ''
                },
                {
                    identifier: 'PAREBRISE-AV',
                    className: 'parebrise-middle',
                    name: 'PAREBRISE-AV',
                    label: 'PAREBRISE AV',
                    tooltip: 'Parebrise',
                    checked: false,
                    value: ''
                },
                {
                    identifier: 'TOIT',
                    className: 'middle-middle',
                    name: 'TOIT',
                    label: 'TOIT',
                    tooltip: 'Toit',
                    checked: false,
                    value: ''
                },
                {
                    identifier: 'COFFRE',
                    className: 'quart-middle-paravrise',
                    name: 'COFFRE',
                    label: 'COFFRE',
                    tooltip: 'Coffre',
                    checked: false,
                    value: ''
                },
                {
                    identifier: 'AILE-AV-G',
                    className: 'top-right',
                    name: 'AILE-AV-G',
                    label: 'AILE AV G',
                    tooltip: 'Aile avant gauche',
                    checked: false,
                    value: ''
                },
                {
                    identifier: 'RETRO-G',
                    className: 'top-retroviseur',
                    name: 'RETRO-G',
                    label: 'RETRO G',
                    tooltip: 'Rétroviseur gauche',
                    checked: false,
                    value: ''
                },
                {
                    identifier: 'PORTIERE-G',
                    className: 'top-middle',
                    name: 'PORTIERE-G',
                    label: 'PORTIERE G',
                    tooltip: 'Portière gauche',
                    checked: false,
                    value: ''
                },
                {
                    identifier: 'AILE-AR-G',
                    className: 'top-left',
                    name: 'AILE-AR-G',
                    label: 'AILE AR G',
                    tooltip: 'Aile arrière gauche',
                    checked: false,
                    value: ''
                },
                {
                    identifier: 'CHOC-AR',
                    className: 'middle-bottom-paravrise',
                    name: 'CHOC-AR',
                    label: 'CHOC AR',
                    tooltip: 'Pare-choc arrière',
                    checked: false,
                    value: ''
                },
            ],

            arrayPointsBottom: [
                {
                    identifier: 'TOUT-LE-VEH',
                    className: 'top-left',
                    name: 'TOUT-LE-VEH',
                    label: 'Tout',
                    tooltip: 'Tout le véhicule',
                    labelinput: 'TOUT LE VEH',
                    checked: false,
                    value: ''
                },
                {
                    identifier: 'SOUS-LE-VEH',
                    className: 'top-left',
                    name: 'SOUS-LE-VEH',
                    label: 'Dessous',
                    tooltip: 'Sous le véhicule',
                    labelinput: 'SOUS LE VEH',
                    checked: false,
                    value: ''
                },
                {
                    identifier: 'INTERIEUR',
                    className: 'top-left',
                    name: 'INTERIEUR',
                    label: 'Intérieur',
                    tooltip: 'Intérieur du véhicule',
                    labelinput: 'INTERIEUR',
                    checked: false,
                    value: ''
                },
                {
                    identifier: 'AUTRE',
                    className: 'top-left',
                    name: 'AUTRE',
                    label: 'Autre',
                    tooltip: 'Autre',
                    labelinput: 'AUTRE',
                    checked: false,
                    value: ''
                },
            ]
        };
    };

    updateStateList(e, value) {
        console.log(e.target.checked)
        if (e.target.checked) {
            //append to array
            this.setState({
                keyGen: this.state.keyGen.concat([value])
            })
        } else {
            //remove from array
            this.setState({
                keyGen: this.state.keyGen.filter(function (val) { return val !== value })
            })
        }
    }

    handleFieldChange(e, item, index) {
        const value = e.target.value;
        const keyGen = this.state.keyGen;

        keyGen[index].value = value;

        this.setState({
            keyGen: keyGen
        }, function () {
            this.props.onChange(this.props.name, this.getString());
        });
    }

    getString() {
        var result = "";
        const keyGen = this.state.keyGen;
        for(var index in keyGen) {
            result += keyGen[index].label + " : " + keyGen[index].value +  ", ";
        };
        return result;
    };

    render() {
        return (
            <div className="row container-car-field">
                <div className="col-md-4 container-fix">
                    <div className="container-img">
                        {
                            this.state.arrayPoints.map((item, index) => {
                                return (
                                    <span>
                                        <input
                                            key={item}
                                            index={index}
                                            className={item.className}
                                            id={item.identifier}
                                            name={item.identifier}
                                            type='checkbox'
                                            onChange={(e) => this.updateStateList(e, item)}
                                        />
                                        <BootstrapTooltip title={item.tooltip} placement="top-start" arrow>
                                            <label htmlFor={item.identifier}></label>
                                        </BootstrapTooltip>
                                    </span>
                                )
                            })
                        }
                    </div>
                    <div className="row">
                        <div className="col-md-12 bottom-buttons">
                            {
                                this.state.arrayPointsBottom.map((item, index) => {
                                    return (
                                        <span>
                                            <input
                                                key={item}
                                                index={index}
                                                id={item.identifier}
                                                name={item.identifier}
                                                type='checkbox'
                                                onChange={(e) => this.updateStateList(e, item)}
                                            />
                                            <BootstrapTooltip title={item.tooltip} placement="top-start" arrow>
                                                <label className={'bottom'} htmlFor={item.identifier}>{item.label}</label>
                                            </BootstrapTooltip>
                                        </span>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="col-md-8 col-lg-8 container-flex">
                    <label className="bmd-label-floating label-custom">
                        Précisez le dommage (Rayé, cassé, enfoncé...)
                    </label>
                    <div className="row">
                        <table class="table">
                            <tbody>
                                {
                                    this.state.keyGen.map((item, index) => {
                                        return (
                                            <tr>
                                                <td className="label-item">
                                                    <label className="bmd-label-floating">
                                                        {item.tooltip}:
                                                    </label>
                                                </td>
                                                <td>
                                                    <input
                                                        key={item}
                                                        index={index}
                                                        className={'form-control text-field'}
                                                        id={item.identifier}
                                                        name={item.identifier}
                                                        type='text'
                                                        onChange={(e) => this.handleFieldChange(e, item, index)}
                                                    />
                                                </td>
                                                <td className="delete-item">
                                                    <input
                                                        type="checkbox"
                                                        id={item.identifier}
                                                        name={item.identifier}
                                                        onChange={(e) => this.updateStateList(e, item)}
                                                        checked="checked"
                                                    />
                                                    <label htmlFor={item.identifier}></label>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

CarField.propTypes = {
    onChange: PropTypes.func
};
