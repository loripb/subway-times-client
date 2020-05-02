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
    return newStops.map(stop => stop)
  }

  const filterWithSearchParams = (stopsArr) => {
    // filter through new array with searchParams
    const stopsWithSearch = searchParams ? stopsArr.filter(stop => stop.name.toLowerCase().includes(searchParams.toLowerCase())) : []

    // make an array of only names
    let stopNames = stopsWithSearch.map(stop => stop.name)
    // remove duplicates
    stopNames = Array.from(new Set(stopNames))

    // map over that and compare to objs in stopsWithSearch
    // if the name matches with the obj make a new obj with the id as an array + add to it
    let stopArr = (stopNames.map(stopName => stopsWithSearch.filter(stop2 => stop2.name == stopName)))
    return stopArr
  }

  const renderStops = () => {
    const filteredStops = filterWithSearchParams(getFilteredStops())
    // render filtered stops
    return filteredStops.map(stop => {
      return(
        <SingleStop
          key={ stop[0].id }
          stopName={ stop[0].name }
          stopId={ stop[0].stop_id }
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
