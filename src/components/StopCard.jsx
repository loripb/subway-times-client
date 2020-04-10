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

      // convert each train arrival from epoch, then get the remaining time
      let trainArrivalObjs = arrivalTimes.map(obj => {
        let trainTime = new Date( parseInt(obj.arrival.time) *1000);
        let timeNow = new Date()

        // setting hours and mins
        let trainHour = trainTime.getHours() > 12? trainTime.getHours() - 12 : trainTime.getHours()
        let trainMin = trainTime.getMinutes()
        let currentHour = timeNow.getHours() > 12? timeNow.getHours() - 12 : timeNow.getHours()
        let currentMin = timeNow.getMinutes()
        console.log(`current time: ${currentHour}:${currentMin}`, `Train arrival: ${trainHour}:${trainMin}`);

        // if trainHour is > current hour add 60 mins to trainMin
        if (trainHour > currentHour) {
          trainMin += 60
        }

        // take hour and min of train time and subtract each from the current time, if result is negative return 0
        return Math.sign(trainMin - currentMin) === -1 ? 0 : trainMin - currentMin
      })

      this.setState({
        renderStopInfo: !this.state.renderStopInfo,
        arrivals: trainArrivalObjs
      })
    })
  }

  addOneStarStop = (usersArray) => {
    let user = usersArray.find(userObj => userObj.username === this.props.user.username)

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
            <Button animated size='mini' onClick={ this.handleStarClick } floated='left'>
              <Button.Content hidden>Star It</Button.Content>
              <Button.Content visible>
                <Icon name='star' color="yellow"/>
              </Button.Content>
            </Button>
            <List.Content onClick={ this.handleClick }>
              <List.Header>{ this.state.stopObj.name }</List.Header>
              <List.Description>
                <h5>{ this.state.arrivals[0] }mins, { this.state.arrivals[1] }mins, { this.state.arrivals[2] }mins</h5>
              </List.Description>
            </List.Content>
          </List.Item>
          :
          <List.Item>
            <Button animated size='mini' onClick={ this.handleStarClick } floated='left'>
              <Button.Content hidden>Star It</Button.Content>
              <Button.Content visible>
                <Icon name='star' color="yellow"/>
              </Button.Content>
            </Button>
            <List.Content onClick={ this.handleClick }>
              <List.Header>{ this.state.stopObj.name }</List.Header>
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
    direction: reduxState.direction.direction
  }
}

export default withRouter(
  connect(mapStateToProps, { editUserInformation })(StopCard)
)
