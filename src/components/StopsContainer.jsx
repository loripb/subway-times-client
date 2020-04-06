import React, { Component } from 'react';
import { connect } from 'react-redux'
import StopCard from './StopCard'
import { List } from 'semantic-ui-react'



class StopsContainer extends Component {



  renderStops = () => {
    return this.props.line.relationships.stops.data.map(stopObj => {
      return <StopCard
                key={ stopObj.id }
                line={ this.props.line.attributes }
                stop={ stopObj }
              />
    })
  }

  render() {
    return (
      <div className="stop_container">
        <h3>{ this.props.line.attributes.name } Train Stations</h3>
        <List celled>
          { this.renderStops() }
        </List>
      </div>
    );
  }

}

export default StopsContainer;
