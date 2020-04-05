import React from 'react';
import {connect} from 'react-redux'
import StopCard from './StopCard'
import { List } from 'semantic-ui-react'

const StopsContainer = (props) => {

  let renderStops = () => {
    return props.Stops.map(StopObj => {
      return <StopCard Stop={ StopObj } key={ StopObj.id } />
    })
  }

  return(
    <div className="stop_container">
      <List celled>
        { renderStops() }
      </List>
    </div>
  )
}

export default StopsContainer;
