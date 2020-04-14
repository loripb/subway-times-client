import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { changeDirection } from '../Redux/actions'
import StopCard from './StopCard'
import { List, Icon } from 'semantic-ui-react'

const StopsContainer = ({ line, handleRenderChange }, props) => {

  const handleDirectionChange = () => {
    props.changeDirection()
  }

  const renderStops = () => {
    return line.stops.map(stopObj => {
      return <StopCard
        key={ stopObj.id }
        line={ line }
        stop={ stopObj }
        triggerRender={ props.triggerRender }
      />
    })
  }

  return (
    <div className="stop_container">
      <h2>{ line.name } Train Stops { props.direction === "N" ? "Uptown" : "Downtown" }</h2>
      <Icon className='exchange' onClick={ handleDirectionChange } color="orange" size='large'/>
      <List celled relaxed='very'>
        { renderStops() }
      </List>
    </div>
  );
}

const mapStateToProps = (reduxState) => {
  return {
    direction: reduxState.direction.direction
  }
}

export default withRouter(
  connect(mapStateToProps, { changeDirection })(StopsContainer)
)
