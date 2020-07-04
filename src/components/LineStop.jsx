import React, { Component } from 'react';
import { List, Icon, Popup } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeDirection, editUserInformation } from '../Redux/actions';

const timeoutLength = 2500

class LineStop extends Component {

  state = {
    stop: undefined,
    arrivals: [],
    isOpen: false
  }

  componentDidMount(){
    // diggs through feed to find the arrays with the arrival times
    let feed = this.props.feed.filter( obj => Object.keys(obj).includes("trip_update"))
    let includesStopTimeUpdate = feed.filter(obj => Object.keys(obj.trip_update).includes("stop_time_update"))
    let stopTimeUpdateArrays = includesStopTimeUpdate.map(obj => obj.trip_update.stop_time_update)
    let stopTimeArrays = stopTimeUpdateArrays.map(obj => obj.map(obj2 => obj2))

    let trainObjs = []

    // adds the objects with train arrival times and stop ids to "state"
    stopTimeArrays.map(obj => obj.map(obj2 => trainObjs.push(obj2)))

    this.props.stop.map(stopObj => {

      let arrivalTimes = trainObjs.filter(obj => obj.stop_id.includes(stopObj.stop_id + this.props.direction))
      let trainArrivalObjs = arrivalTimes.map(obj => {
        let trainTime = new Date( parseInt(obj.arrival.time) *1000);
        let timeNow = new Date()

        // setting hours and mins
        let trainHour = trainTime.getHours() > 12? trainTime.getHours() - 12 : trainTime.getHours()
        let trainMin = trainTime.getMinutes()
        let currentHour = timeNow.getHours() > 12? timeNow.getHours() - 12 : timeNow.getHours()
        let currentMin = timeNow.getMinutes()

        // take hour and min of train time and subtract each from the current time, if result is negative return 0
        return trainMin - currentMin
      })

      // if train is due or has past remove
      const arrivals = trainArrivalObjs.filter(time => time >= 0)

      // if there are arrivals, set them in state
      if (arrivals.length > 0){
        this.setState({
          renderStopInfo: !this.state.renderStopInfo,
          arrivals: arrivals,
          stop: stopObj
        })

      }
    })

  }

  handleOpen = () => {
    this.setState({ isOpen: true })

    this.timeout = setTimeout(() => {
      this.setState({ isOpen: false })
    }, timeoutLength)
  }

  handleClose = () => {
    this.setState({ isOpen: false })
    clearTimeout(this.timeout)
  }

  addOneStarStop = (usersArray) => {
    let user = usersArray.find(userObj => userObj.username === this.props.user.username)

    fetch('https://subway-times-api.herokuapp.com/starred_stops', {
      method: "POST",
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({
        user_id: user.id,
        stop_id: this.state.stop.id,
        line_id: this.props.line.id
      })
    })
    .then(r => r.json())
    .then(data => {
      // puts the exact train in the stopObj
      let updatedStops = [...this.props.user.user_stops, this.state.stop]
      let updatedStarred = [...this.props.user.starred_stops, {id: data.starred_stop.id}]
      let updatedUser = {
        ...this.props.user,
        user_stops: updatedStops,
        starred_stops: updatedStarred
      }

      this.props.editUserInformation(updatedUser)
    })
  }

  handleDirectionChange = () => {
    this.props.changeDirection()
  }

  handleStarClick = () => {
    // fetch all users
    fetch("https://subway-times-api.herokuapp.com/users/")
    .then(r => r.json())
    // use username to match user obj
    .then(usersArray => this.addOneStarStop(usersArray))
  }
  render() {
    // add is due function
    return (
      <List.Item>
        <Popup
          trigger={<Icon onClick={ this.handleStarClick } name='star' color="yellow"/>}
          content={`Starred!`}
          on='click'
          open={this.state.isOpen}
          onClose={this.handleClose}
          onOpen={this.handleOpen}
          position='top center'
        />
        <Icon name='exchange' color='orange' onClick={ this.handleDirectionChange }/>
        <List.Content>
          <List.List className='font' >{ this.props.direction === "N" ? "Uptown" : "Downtown" }</List.List>
          <List.Description>
            <h5 className='font'> train arriving in: { this.state.arrivals[0] }mins, { this.state.arrivals[1] }mins, { this.state.arrivals[2] }mins</h5>
          </List.Description>
        </List.Content>
      </List.Item>
    );
  }

}

const mapStateToProps = (reduxState) => {
  return {
    allStops: reduxState.stops.all,
    direction: reduxState.direction.direction,
    user: reduxState.user
  }
}

export default withRouter(
  connect(mapStateToProps, { changeDirection, editUserInformation })(LineStop)
)
