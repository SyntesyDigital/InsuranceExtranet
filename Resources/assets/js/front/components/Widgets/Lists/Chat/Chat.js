import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ListParser from '../ListParser';
import {
  parseDate,
} from '../../functions';

export default class Chat extends Component {

  constructor(props) {
    super(props);
  }

  renderItem(item, elementObject) {

    var infos = [];
    var email = item['expediteur'];
    var date = parseDate(item['DTCRE_MAIL'], elementObject);
    var content = item['CORPS'];

    infos.push(
      <div className={'field-container'}>
        {date ? <div className="container-date"><div className="has-date">{date}</div></div> : null}
        {email ? <div className="container-mail"><div className="has-mail">{email}</div></div> : null}
        {content ? <div className="container-content" dangerouslySetInnerHTML={{__html: content}} /> : null}
      </div>
    );

    return (
      <div className={email ? 'container-active' : 'container-inactive'}>
        <div className={"file-infos-container"}>
          <div className="file-infos">
            {infos}
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <ListParser
          customClass="table-chat-container"
          field={this.props.field}
          elementObject={this.props.elementObject}
          model={this.props.model}
          pagination={this.props.pagination}
          itemsPerPage={this.props.itemsPerPage}
          columns={this.props.columns}
          parameters={this.props.parameters}
          renderItem={this.renderItem.bind(this)}
          identifier={'chat-field'}
          onReverse={true}
        />
      </div>

    );
  }
}

if (document.getElementById('chat-list')) {

  document.querySelectorAll('[id=chat-list]').forEach(function (element) {
    var field = element.getAttribute('field');
    var elementObject = element.getAttribute('elementObject');
    var model = element.getAttribute('model');
    var itemsPerPage = element.getAttribute('itemsPerPage');
    var parameters = element.getAttribute('parameters');
    var columns = element.getAttribute('columns');

    ReactDOM.render(<Chat
      field={field}
      elementObject={elementObject}
      model={model}
      itemsPerPage={itemsPerPage}
      columns={columns}
      parameters={parameters}
    />, element);
  });
}
