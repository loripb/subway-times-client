import React, { Component } from 'react';
import { connect } from 'react-redux'
import StopCard from './StopCard'
import { List, Button } from 'semantic-ui-react'



class StopsContainer extends Component {

  state = {
    direction: "N"
  }

  handleDirectionChange = () => {
    this.state.direction === "N" ? this.setState({ direction: "S" }) : this.setState({ direction: "N" })
  }

  renderStops = () => {
    return this.props.line.relationships.stops.data.map(stopObj => {
      return <StopCard
                key={ stopObj.id }
                line={ this.props.line.attributes }
                stop={ stopObj }
                direction={ this.state.direction }
                handleDirectionChange={ this.handleDirectionChange }
                triggerRender={ this.props.triggerRender }
              />
    })
  }


  render() {
    return (
      <div className="stop_container">
        <h3>{ this.props.line.attributes.name } Train Stations { this.state.direction === "N" ? "To Queens" : "To Manhattan" }</h3>
        <button className="ui small button" onClick={ this.handleDirectionChange } >Change Direction</button>
        <List celled>
          { this.renderStops() }
        </List>
      </div>
    );
  }

}

export default StopsContainer;
