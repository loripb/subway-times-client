import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { changeDirection } from '../Redux/actions'
import StopCard from './StopCard'
import { List, Icon } from 'semantic-ui-react'

const StopsContainer = (props) => {

  const handleDirectionChange = () => {
    props.changeDirection()
  }

  const renderStops = () => {
    return props.line.stops.map(stopObj => {
      return <StopCard
        key={ stopObj.id }
        line={ props.line }
        stop={ stopObj }
      />
    })
  }

  return (
    <div className="stop_container">
      <h2 className='font'>{ props.direction === "N" ? "Uptown" : "Downtown" } { props.line.name } Train Stops </h2>
      <Icon className='exchange' onClick={ handleDirectionChange } color="orange" size='large'/>
      <List celled relaxed='very' className='font'>
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
