import React , { useState } from 'react';
import Search from './Search';
import SingleStop from './SingleStop';
import { List } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const AllStopsContainer = (props) => {

  const [ searchParams, setSearchParams ] = useState(undefined)

  const handleInputChange = (e) => {
    setSearchParams(e.target.value)
  }

  const getFilteredStops = () => {
    // iterate through allStops
    // if the stop_id does not include a N or S add to new array
    const newStops = props.allStops.filter(stop => (stop.stop_id.includes('N') === false) && (stop.stop_id.includes('S') === false))
    return newStops.map(stop => stop.name)
  }

  const filterWithSearchParams = (stopsArr) => {
    // filter through new array with searchParams
    const stopsWithSearch = searchParams ? stopsArr.filter(stop => stop.toLowerCase().includes(searchParams.toLowerCase())) : []
    // remove duplicates
    return Array.from(new Set(stopsWithSearch))
  }

  const renderStops = () => {
    const filteredStops = filterWithSearchParams(getFilteredStops())
    // render filtered stops
    return filteredStops.map(stop => {
      return(
        <SingleStop
          key={ stop }
          stopName={ stop }
        />
      )
    })
  }

  return(
    <>
      <Search handleInputChange={ handleInputChange }/>

      <h3>Search Results</h3>

      <List celled relaxed='very'>
        { renderStops() }
      </List>

    </>
  )
};

const mapStateToProps = (reduxState) => {
  return {
    allStops: reduxState.stops.all
  }
}

export default withRouter(
  connect(mapStateToProps)(AllStopsContainer)
)
