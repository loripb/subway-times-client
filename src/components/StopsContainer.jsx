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
    return this.props.line.stops.map(stopObj => {
      return <StopCard
                key={ stopObj.id }
                line={ this.props.line }
                stop={ stopObj }
                triggerRender={ this.props.triggerRender }
              />
    })
  }


  render() {
    return (
      <div className="stop_container">
        <h2>{ this.props.line.name } Train Stops { this.props.direction === "N" ? "Uptown" : "Downtown" }</h2>
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
