import React, { Component } from 'react';
import { List } from 'semantic-ui-react';

export default class SingleStopLine extends Component {

  // fetch for the stop arrivals

  // on click show arival times

  render(){
    return(
      <List.Item><p>{ this.props.line.name }</p></List.Item>
    )
  }
};
