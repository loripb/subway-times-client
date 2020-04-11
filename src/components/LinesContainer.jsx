import React, { Component } from 'react';
import LineCard from './LineCard'
import { List, Grid } from 'semantic-ui-react'

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
    // set colums
    const colum1 = this.state.lines.slice(0, 3)
    const colum2 = this.state.lines.slice(3, 6)
    const colum3 = this.state.lines.slice(6, 9)
    const colum4 = this.state.lines.slice(9, 12)
    const colum5 = this.state.lines.slice(12, 15)
    const colum6 = this.state.lines.slice(15, 18)
    const colum7 = this.state.lines.slice(18, 21)
    const colum8 = this.state.lines.slice(21)

    // set rows
    const row1 = () => {
      return colum1.map(lineObj => {
      return <LineCard
        line={ lineObj }
        key={ lineObj.id}
        handleRenderChange={ this.props.handleRenderChange }
      />
  })}
    const row2 = () => {
      return colum2.map(lineObj => {return <LineCard
        line={ lineObj }
        key={ lineObj.id}
        handleRenderChange={ this.props.handleRenderChange }/>})
    }
    const row3 = () => {
      return colum3.map(lineObj => {
      return <LineCard
        line={ lineObj }
        key={ lineObj.id}
        handleRenderChange={ this.props.handleRenderChange }
      />
  })}
    const row4 = () => {
      return colum4.map(lineObj => {
      return <LineCard
        line={ lineObj }
        key={ lineObj.id}
        handleRenderChange={ this.props.handleRenderChange }
      />
  })}
    const row5 = () => {
      return colum5.map(lineObj => {
      return <LineCard
        line={ lineObj }
        key={ lineObj.id}
        handleRenderChange={ this.props.handleRenderChange }
      />
  })}
    const row6 = () => {
      return colum6.map(lineObj => {
      return <LineCard
        line={ lineObj }
        key={ lineObj.id}
        handleRenderChange={ this.props.handleRenderChange }
      />
  })}
    const row7 = () => {
      return colum7.map(lineObj => {
      return <LineCard
        line={ lineObj }
        key={ lineObj.id}
        handleRenderChange={ this.props.handleRenderChange }
      />
  })}
    const row8 = () => { return colum8.map(lineObj => {
      return <LineCard
        line={ lineObj }
        key={ lineObj.id}
        handleRenderChange={ this.props.handleRenderChange }
      />
  })}

    return <Grid columns='three' divided='vertically' >
            <Grid.Row>
              {row1()}
            </Grid.Row>
            <Grid.Row>
              {row2()}
            </Grid.Row>
            <Grid.Row>
              {row3()}
            </Grid.Row>
            <Grid.Row>
              {row4()}
            </Grid.Row>
            <Grid.Row>
              {row5()}
            </Grid.Row>
            <Grid.Row>
              {row6()}
            </Grid.Row>
            <Grid.Row>
              {row7()}
            </Grid.Row>
            <Grid.Row>
              {row8()}
            </Grid.Row>
          </Grid>
  }

  render() {
    return (
      <div>
        {this.renderLines()}
      </div>
    );
  }

}

export default LinesContainer;
