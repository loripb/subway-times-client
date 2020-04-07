import React, { Component } from 'react';
import LineCard from './LineCard'
import { List } from 'semantic-ui-react'

class LinesContainer extends Component {

  state = {
    lines: []
  }

  componentDidMount(){
    // Fetch all subway lines
    fetch("http://localhost:4000/lines")
    .then(r => r.json())
    .then(data => {
      let lines = data.data

      this.setState({
        lines: lines
      })
    })
  }

  renderLines = () => {
    return this.state.lines.map(lineObj => {
      return <LineCard
        line={ lineObj }
        key={ lineObj.id}
        handleRenderChange={ this.props.handleRenderChange }
      />
    })
  }

  render() {
    return (
      <div>
        <List celled>
          { this.renderLines() }
        </List>
      </div>
    );
  }

}

export default LinesContainer;
