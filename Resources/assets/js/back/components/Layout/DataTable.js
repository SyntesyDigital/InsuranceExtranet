import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class DataTable extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fields: props.fields,
            init: false,
            datatable: null
        };
    }

    componentDidMount() {
        if (this.props.init !== undefined && this.props.init == true) {
            this.setDatatable(this.props.route);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.init !== undefined && this.props.init == true) {
            if (!this.state.init) {
                this.setState({
                    init: true
                });
                this.setDatatable(this.props.route);
            }
        }
        else {
            if (this.state.init) {
                this.setState({
                    init: false
                });
                this.destroyDatatable();
            }
        }
    }

    setDatatable(route) {
        var _this = this;
        
        $(this.refs.main).DataTable({
                language: {
                    //url: "//cdn.datatables.net/plug-ins/1.10.16/i18n/"+Lang.get('datatables.json')+".json"
                },
                processing: true,
                serverSide: true,
                order: [],
                pageLength: 10,
                ajax: route,
                columns: this.props.columns,
                initComplete: function (settings, json) {
                    _this.initEvents();
               
                }
            });

    }

    destroyDatatable() {
        $(this.refs.main).DataTable().destroy();
    }

    addField() {

    }

    initEvents() {
        var _this = this;
        $(document).on('click', '#' + this.props.id + ' .has-event', function (e) {
            e.preventDefault();
            _this.props.onClick(
                $(this).data('type'), 
                $(this).data('payload'), 
                $(_this.refs.main).DataTable()
            );
        });
    }

    renderHeader() {
        return this.props.columns.map((item, index) =>
            <th>{item.label}</th>
        );
    }

    renderFooter() {
        return this.props.columns.map((item, index) =>
            <th></th>
        );
    }

    render() {
        return (
            <div>
                <table ref="main" className="table" id={this.props.id} style={{ width: "100%" }}>
                    <thead>
                        <tr>
                            {this.renderHeader()}
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            {this.renderFooter()}
                        </tr>
                    </tfoot>
                </table>
            </div>
        );
    }
}

DataTable.propTypes = {
    id: PropTypes.string.isRequired,
    init: PropTypes.bool.isRequired,
    route: PropTypes.string.isRequired,
    columns: PropTypes.array.isRequired,
};
