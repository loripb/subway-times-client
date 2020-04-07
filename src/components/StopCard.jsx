import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { editUserInformation } from '../Redux/actions'
import { List, Icon, Button } from 'semantic-ui-react';

class StopCard extends Component {

  state = {
    foundUser: undefined,
    stopObj: [],
    arrivals: [],
    renderStopInfo: false
  }

  componentDidMount(){

    fetch(`http://localhost:4000/stops/${this.props.stop.id}`)
    .then(r => r.json())
    .then(data => this.setState({
      stopObj: data.stop
    }))

  }

  handleClick = () => {
    // fetch here
    fetch(`http://localhost:4000/lines/${this.props.line.id}`)
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

      let arrivalTimes = trainObjs.filter(obj => obj.stop_id.includes(this.state.stopObj.stop_id + this.props.direction))
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
      this.setState({
        renderStopInfo: !this.state.renderStopInfo,
        arrivals: trainArrivalObjs
      })
    })
  }

  addOneStarStop = (usersArray) => {
    let user = usersArray.find(userObj => userObj.username === this.props.user.username)
    // post fetch to starredstop/:id
    fetch('http://localhost:4000/starred_stops', {
      method: "POST",
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({
        user_id: user.id,
        stop_id: this.state.stopObj.id
      })
    })
    .then(r => r.json())
    .then(data => {
      let updatedStops = [...this.props.user.user_stops, this.state.stopObj]
      let updatedStarred = [...this.props.user.starred_stops, {id: data.starred_stop.id}]
      let updatedUser = {
        ...this.props.user,
        user_stops: updatedStops,
        starred_stops: updatedStarred
      }

      this.props.editUserInformation(updatedUser)
    })
  }

  handleStarClick = () => {
    // fetch all users
    fetch("http://localhost:4000/users/")
    .then(r => r.json())
    // use username to match user obj
    .then(usersArray => this.addOneStarStop(usersArray))
  }

  render(){
    return(
      <>
        {
          this.state.renderStopInfo
          ?
          <List.Item>
            <Icon name='star' onClick={ this.handleStarClick } />
            <List.Content>
              <List.Header onClick={ this.handleClick }>{ this.state.stopObj.name }</List.Header>
              <List.Description>
                <h5>{ this.state.arrivals[0] }mins, { this.state.arrivals[1] }mins, { this.state.arrivals[2] }mins</h5>
              </List.Description>
            </List.Content>
          </List.Item>
          :
          <List.Item>
            <Icon name='star' onClick={ this.handleStarClick } />
            <List.Content>
              <List.Header onClick={ this.handleClick }>{ this.state.stopObj.name }</List.Header>
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
  connect(mapStateToProps, { editUserInformation })(StopCard)
)
