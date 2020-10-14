import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import api from '../../api/index.js';
import ImportButton from './../Layout/ImportButton';
import moment from 'moment';
import { 
    ButtonSecondary, 
    ButtonDropdown, 
    BoxWithIcon, 
    ButtonPrimary, 
    BoxAdd, 
    BoxList, 
    PageTitle 
} from "architect-components-library";
import { saveAs } from 'file-saver';


export default class FormsIndex extends Component {

    constructor(props) {
        super(props);

        console.log(':::: TYPE ::::', this.props.type);

        this.state = {
            models: [],
            selecting: false,
            selected: [],
            displaySubmit: false,
            displayResultImport: false,
        };
    }

    compare( a, b ) {
        if ( a.name < b.name ){
          return -1;
        }
        if ( a.name > b.name ){
          return 1;
        }
        return 0;
    }

    componentDidMount() {
        var _this = this;

        api.elementModel.getAll(this.props.type)
            .then(function (payload) {
                _this.setState({
                    models: payload.data.elementModels.sort(_this.compare)
                })
            });
    }

    handleEnableSelection(e) {
        e.preventDefault();
        this.setState({
            selected: [],
            displaySubmit: !this.state.displaySubmit,
            selecting: !this.state.selecting
        })
    }

    handleDisableSelection(e) {
        e.preventDefault();
        this.setState({
            displaySubmit: this.state.displaySubmit,
            selecting: this.state.selecting
        })
    }

    handleJsonUploaded(json) {
        
    }

    export(items, model) {
        const promises = [];
        var self = this;

        items.forEach(item => {
            promises.push(api.exportImport.export(item.id, model).then(response => {
                return JSON.parse(response.data.export.payload);
            }));
        });

        Promise.all(promises)
            .then(response => {
                var fileName = 'export.json';

                var fileToSave = new Blob([JSON.stringify(response)], {
                    type: 'application/json',
                    name: fileName
                });

                saveAs(fileToSave, fileName);

                toastr.success('Exporté avec succès');

                self.setState({
                    displaySubmit : false,
                    selecting : false,
                    selected : []
                });
            });
    }

    handleSelectAll(e) {
        e.preventDefault();
        this.export(this.state.models, EXPORT_MODELS.ElementModel);
    }

    handleSubmit(items) {
        this.export(items, EXPORT_MODELS.ElementModel);
        
    }

    updateSelectedList(e, value) {
        if (e.target.checked) {
            this.setState({
                selected: this.state.selected.concat([value])
            })
        } else {
            this.setState({
                selected: this.state.selected.filter(function (val) { return val !== value })
            })
        }
    }

    renderModels() {        
        return this.state.models.map((item, index) =>
            <BoxWithIcon
                icon={item.icon}
                name={item.name}
                subtitle={moment(item.created_at).format('D/M/YY HH:mm')}
                onSelect={(e) => this.updateSelectedList(e, item)}
                route={routes['extranet.elements-models.update'].replace(':id', item.id).replace(':type', item.type)}
                selectable={this.state.selecting}
                id={item.identifier}
            />
        );
    }

    render() {
        return (
            <div className="container grid-page elements-models-page">
                <div className="col-xs-offset-1 col-xs-10 page-content">
                    <PageTitle
                        title={ this.props.type[0].toUpperCase() + this.props.type.slice(1) }
                        icon={'fas fa-cog'}
                        backRoute={routes['extranet.elements-models.index']}
                    >

                        {userSession.hasPermission('element_models.create') && 
                            <React.Fragment>
                                <ButtonPrimary
                                    label={'Ajouter'}
                                    icon={'fa fa-plus'}
                                    route={routes["extranet.elements-models.forms.create"]}
                                />

                                <ImportButton
                                    label={"IMPORTER"}
                                    icon={"fas fa-download"}
                                    onJsonUploaded={this.handleJsonUploaded.bind(this)}
                                />

                                <ButtonDropdown
                                    label={"EXPORTER"}
                                    icon={"fas fa-download"}
                                    list={[
                                        {
                                            label: "Exporter Tous",
                                            icon: "fas fa-file-export",
                                            onClick: this.handleSelectAll.bind(this),
                                            className: "",
                                        },
                                        {
                                            label: "Sélectionner",
                                            icon: "fas fa-file-export",
                                            onClick: this.handleEnableSelection.bind(this),
                                            className: "",
                                        },
                                    ]}
                                />
                            </React.Fragment>
                        }

                        {this.state.displaySubmit ?
                            <ButtonPrimary
                                label={"Télécharger"}
                                icon={"fas fa-download"}
                                onClick={this.handleSubmit.bind(this, this.state.selected)}
                            />
                            : null}
                    </PageTitle>

                    <BoxList
                        subtitle={'Configuration générale des modèles utilisés dans les éléments'}
                    >
                        {this.renderModels()}

                        <BoxAdd
                            label={'Ajouter'}
                            route={routes["extranet.elements-models.create"].replace(':type', this.props.type)}
                        />

                    </BoxList>
                </div>
            </div>
        );
    }
}

var element = document.getElementById('elements-models-forms-index');

if (element) {
    ReactDOM.render(<FormsIndex 
        type={element.getAttribute('type')}
    />, element);
}
