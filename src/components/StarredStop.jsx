import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { editUserInformation } from '../Redux/actions'
import { List, Icon, Button } from 'semantic-ui-react';

class StarredStop extends Component {

  state = {
    renderStopInfo: false,
    arrivals: [],
    direction: "N",
    fullStop: undefined
  }



  handleClick = () => {
    fetch(`http://localhost:4000/stops/${this.props.stop.id}`)
    .then(r => r.json())
    .then(data => {
      // fetch here
      fetch(`http://localhost:4000/lines/${data.lines[0].id}`)
      .then(r => r.json())
      .then((line) => {
        // diggs through feed to find the arrays with the arrival times
        let feed = line.feed.filter( obj => Object.keys(obj).includes("trip_update"))
        let includesStopTimeUpdate = feed.filter(obj => Object.keys(obj.trip_update).includes("stop_time_update"))
        let stopTimeUpdateArrays = includesStopTimeUpdate.map(obj => obj.trip_update.stop_time_update)
        let stopTimeArrays = stopTimeUpdateArrays.map(obj => obj.map(obj2 => obj2))

        let trainObjs = []

        // adds the objects with train arrival times and stop ids to "state"
        stopTimeArrays.map(obj => {
          obj.map(obj2 => {
            trainObjs.push(obj2)
          })
        })

        let arrivalTimes = trainObjs.filter(obj => obj.stop_id.includes(this.props.stop.stop_id + this.state.direction))
        console.log(arrivalTimes);
        let trainArrivalObjs = arrivalTimes.map(obj => {
          let myDate = new Date( parseInt(obj.arrival.time) *1000);
          let today = new Date


          // checks for trains coming in the next hour
          // if the train arrival minus the time now is negative add 60 mins
          // return myDate.getMinutes() - today.getMinutes()
          if (Math.sign(myDate.getMinutes() - today.getMinutes()) === -1) {
            return [(myDate.getMinutes() - today.getMinutes()) + 60, obj.name]
          } else {
            return [myDate.getMinutes() - today.getMinutes(), obj.name]
          }
        })
        console.log("fetched");
        this.setState({
          renderStopInfo: !this.state.renderStopInfo,
          arrivals: trainArrivalObjs,
        })
      })
    })
  }

  deleteStarredStop = (starredStop) => {
    let updatedStarredStops = this.props.user.starred_stops.filter(obj => obj.id !== starredStop.id)
    let updatedUser = {
      ...this.props.user,
      starred_stops: updatedStarredStops
    }

    console.log(updatedUser.username, "from delete");
    this.props.editUserInformation(updatedUser)

    fetch(`http://localhost:4000/starred_stops/${starredStop.id}`, {
      method: "DELETE"
    })

  }

  handleDelete = () => {
    // fetch all starred stops then match with stop id
    // delete
    fetch("http://localhost:4000/starred_stops/")
    .then(r => r.json())
    .then(data => {
      // console.log(data.find(obj => obj.id === this.props.user.))
      let collection = []

      this.props.user.starred_stops.map(starredStopId => {
        collection.push(data.find(obj => obj.id === starredStopId.id))
      })

      let toBeDeleted = collection.find(obj => obj.stop.id === this.props.stop.id)
      this.deleteStarredStop(toBeDeleted)
    })
  }


  render(){
    console.log(this.props.user);
    return(
      <>
        {
          this.state.renderStopInfo
          ?
          <List.Item>
            <Icon name='trash alternate outline' onClick={ this.handleDelete }/>
            <List.Content>
              <List.Header onClick={ this.handleClick }>{ this.props.stop.name }</List.Header>
              <List.Description>
                <h5>{ this.state.arrivals[0] }mins, { this.state.arrivals[1] }mins, { this.state.arrivals[2] }mins</h5>
              </List.Description>
            </List.Content>
          </List.Item>
          :
          <List.Item>
            <Icon name='trash alternate outline' onClick={ this.handleDelete }/>
            <List.Content>
              <List.Header onClick={ this.handleClick }>{ this.props.stop.name }</List.Header>
            </List.Content>
          </List.Item>
        }
      </>
    )
  }

};

const mapStateToProps = (reduxState) => {
  return {
    user: reduxState.user
  }
}

export default withRouter(
  connect(mapStateToProps, {editUserInformation})(StarredStop)
)
