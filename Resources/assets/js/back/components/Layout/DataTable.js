import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class DataTable extends Component {

    constructor(props)
    {
        super(props);

        this.state = {
          fields : props.fields,
          init : false
        };
    }

    componentDidMount()
    {
      //this.initEvents();

      if(this.props.init !== undefined && this.props.init == true){
        this.setDatatable(this.props.route);
      }
    }

    componentDidUpdate(prevProps, prevState)
    {
      if(this.props.init !== undefined && this.props.init == true){
        if(!this.state.init){
          this.setState({
            init : true
          });
          this.setDatatable(this.props.route);
        }
      }
      else {
        if(this.state.init){
          this.setState({
            init : false
          });
          this.destroyDatatable();
        }
      }
    }

    setDatatable(route)
    {

        //console.log("ContentDataTable :: setDatatable route : ",route,$(this.refs.main));

        var _this = this;
        var table = $(this.refs.main).DataTable({
            language: {
                //url: "//cdn.datatables.net/plug-ins/1.10.16/i18n/"+Lang.get('datatables.json')+".json"
            },
            processing: true,
            serverSide: true,
            order: [],
            pageLength: 10,
            ajax: route,
            columns: this.props.columns,
            initComplete: function(settings, json) {
                _this.initEvents();
            }
        });
    }

    destroyDatatable() {

      console.log("ContentDataTable :: destroy datatable ");

      $(this.refs.main).DataTable().destroy();
    }

    addField()
    {

    }

    initEvents()
    {
        var _this = this;
        $(document).on('click','#'+this.props.id+' .has-event',function(e){
          
          e.preventDefault();
          var type = $(this).data('type');
          var payload = $(this).data('payload');

          _this.props.onClick(type,payload);
        });
        
    }

    renderHeader() {
      return this.props.columns.map((item,index) =>
        <th>{item.name}</th>
      );
    }

    renderFooter() {
      return this.props.columns.map((item,index) =>
        <th></th>
      );
    }

    render() {
        return (
          <div>
            <table ref="main" className="table" id={this.props.id} style={{width:"100%"}}>
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
  id : PropTypes.string.isRequired,
  init: PropTypes.bool.isRequired,
  route: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
};
