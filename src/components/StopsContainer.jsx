import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { changeDirection } from '../Redux/actions'
import StopCard from './StopCard'
import { List, Icon } from 'semantic-ui-react'



class StopsContainer extends Component {

  state = {
    direction: "N"
  }

  handleDirectionChange = () => {
    this.props.changeDirection()
  }

  renderStops = () => {
    return this.props.line.relationships.stops.data.map(stopObj => {
      return <StopCard
                key={ stopObj.id }
                line={ this.props.line.attributes }
                stop={ stopObj }
                triggerRender={ this.props.triggerRender }
              />
    })
  }


  render() {
    return (
      <div className="stop_container">
        <h3>{ this.props.line.attributes.name } Train Stations { this.props.direction === "N" ? "Uptown" : "Downtown" }</h3>
        <Icon className='exchange' onClick={ this.handleDirectionChange } color="orange" size='large'/>
        <List celled relaxed='very'>
          { this.renderStops() }
        </List>
      </div>
    );
  }

}

const mapStateToProps = (reduxState) => {
  return {
    direction: reduxState.direction.direction
  }
}

export default withRouter(
  connect(mapStateToProps, { changeDirection })(StopsContainer)
)
