import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { editUserInformation } from '../Redux/actions'
import { List, Icon } from 'semantic-ui-react';

class StarredStop extends Component {

  state = {
    renderStopInfo: false,
    arrivals: [],
    fullStop: undefined,
    starredStop: undefined
  }

  componentDidMount(){
    // gets the correct starred stop and saves it to state
    fetch("https://subway-times-api.herokuapp.com/starred_stops")
    .then(r => r.json())
    .then(starredStops => {
      let starredObjs = starredStops.filter(starredStop => starredStop.stop.id === this.props.stop.id)
      // if the user matches with current, save to state
      starredObjs.map(starredObj => starredObj.user.username === this.props.user.username ? this.setState({starredStop: starredObj}) : null)
    })
  }

  handleClick = () => {
    // fetches arrivalTimes
    fetch(`https://subway-times-api.herokuapp.com/stops/${this.props.stop.id}`)
    .then(r => r.json())
    .then(data => {
      // fetch here
      fetch(`https://subway-times-api.herokuapp.com/lines/${data.lines[0].id}`)
      .then(r => r.json())
      .then((line) => {
        // diggs through feed to find the arrays with the arrival times
        let feed = line.feed.filter( obj => Object.keys(obj).includes("trip_update"))
        let includesStopTimeUpdate = feed.filter(obj => Object.keys(obj.trip_update).includes("stop_time_update"))
        let stopTimeUpdateArrays = includesStopTimeUpdate.map(obj => obj.trip_update.stop_time_update)
        let stopTimeArrays = stopTimeUpdateArrays.map(obj => obj.map(obj2 => obj2))

        let trainObjs = []

        // adds the objects with train arrival times and stop ids to "state"
        stopTimeArrays.map(obj => obj.map(obj2 => trainObjs.push(obj2)))

        let arrivalTimes = trainObjs.filter(obj => obj.stop_id.includes(this.props.stop.stop_id + this.props.direction.direction))
        let trainArrivalObjs = arrivalTimes.map(obj => {
          let trainTime = new Date( parseInt(obj.arrival.time) *1000);
          let timeNow = new Date()

          // setting hours and mins
          let trainHour = trainTime.getHours() > 12? trainTime.getHours() - 12 : trainTime.getHours()
          let trainMin = trainTime.getMinutes()
          let currentHour = timeNow.getHours() > 12? timeNow.getHours() - 12 : timeNow.getHours()
          let currentMin = timeNow.getMinutes()

          // if trainHour is > current hour add 60 mins to trainMin
          if (trainHour > currentHour) {
            trainMin += 60
          }

          // take hour and min of train time and subtract each from the current time, if result is negative return 0
          return trainMin - currentMin
        })

        // if train is due or has past remove
        const arrivals = trainArrivalObjs.filter(time => time >= 0)

        this.setState({
          renderStopInfo: !this.state.renderStopInfo,
          arrivals: arrivals
        })
      })
    })
  }

  deleteStarredStop = (starredStop) => {
    // removes starred stop from user, then deletes from backend
    let updatedStops = this.props.user.user_stops.filter(stop => stop.id !== this.props.stop.id)
    let updatedStarredStops = this.props.user.starred_stops.filter(stop => stop.id !== starredStop.id)

    let updatedUser = {
      ...this.props.user,
      starred_stops: updatedStarredStops,
      user_stops: updatedStops
    }

    this.props.editUserInformation(updatedUser)

    fetch(`https://subway-times-api.herokuapp.com/starred_stops/${starredStop.id}`, {
      method: "DELETE"
    })

  }

  handleDelete = () => {
    // fetch all starred stops then match with stop id
    // delete
    fetch("https://subway-times-api.herokuapp.com/starred_stops/")
    .then(r => r.json())
    .then(data => {
      let collection = []

      this.props.user.starred_stops.map(starredStopId => collection.push(data.find(obj => obj.id === starredStopId.id)))

      let toBeDeleted = collection.find(obj => obj.stop.id === this.props.stop.id)
      this.deleteStarredStop(toBeDeleted)
    })
  }


  render(){
    console.log(this.state);
    return(
      <>
        {
          this.state.renderStopInfo
          ?
          <List.Item>
            <Icon name='trash alternate outline' onClick={ this.handleDelete }/>
            <List.Content>
              <List.List className='font' onClick={ this.handleClick }>{ this.props.stop.name } || { this.props.direction.direction === "N" ? "Uptown" : "Downtown" }</List.List>
              <List.Description>
                <h5 className='font'>{ this.state.starredStop.line.name } train arriving in: { this.state.arrivals[0] }mins, { this.state.arrivals[1] }mins, { this.state.arrivals[2] }mins</h5>
              </List.Description>
            </List.Content>
          </List.Item>
          :
          <List.Item>
            <Icon name='trash alternate outline' onClick={ this.handleDelete }/>
            <List.Content>
              <List.List className='font' onClick={ this.handleClick }>{ this.props.stop.name } || { this.props.direction.direction === "N" ? "Uptown" : "Downtown" }</List.List>
            </List.Content>
          </List.Item>
        }
      </>
    )
  }

};

const mapStateToProps = (reduxState) => {
  return {
    user: reduxState.user,
    direction: reduxState.direction,
    lines: reduxState.lines.all
  }
}

export default withRouter(
  connect(mapStateToProps, {editUserInformation})(StarredStop)
)
