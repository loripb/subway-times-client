import React, { Component } from 'react'
import { List } from 'semantic-ui-react'

class LineCard extends Component {



  handleClick = () => {
    this.props.handleRenderChange(this.props.line)
  }

  render() {
    return (
      <List.Item onClick={ this.handleClick } >
        <List.Icon name='marker' color='orange'/>
        <List.Content>
          <List.Header>{this.props.line.attributes.name}</List.Header>
        </List.Content>
      </List.Item>
    );
  }

}

export default LineCard;
