import React, { Component } from 'react'
import { Grid, Icon } from 'semantic-ui-react'

class LineCard extends Component {



  handleClick = () => {
    this.props.handleRenderChange(this.props.line)
  }

  render() {
    return (
      <Grid.Column onClick={ this.handleClick } >
        <h2>{this.props.line.name}</h2><Icon name='train' color='orange'/>
      </Grid.Column>
    );
  }

}

export default LineCard;
