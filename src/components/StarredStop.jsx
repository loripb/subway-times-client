import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { editUserInformation } from '../Redux/actions'
import { List, Icon } from 'semantic-ui-react';
import NetworkService from '../services/NetworkService'

class StarredStop extends Component {

  state = {
    renderStopInfo: false,
    arrivals: [],
    fullStop: undefined,
    starredStop: undefined
  }

  _getStarredStops(){
    // gets the correct starred stop and saves it to state
    NetworkService.getStarredStops()
    .then(starredStops => {
      let starredObjs = starredStops.filter(starredStop => starredStop.stop.id === this.props.stop.id)
      // if the user matches with current, save to state
      starredObjs.map(starredObj => starredObj.user.username === this.props.user.username ? this.setState({starredStop: starredObj}) : null)
    })
  }

  componentDidMount(){
    this._getStarredStops()
  }

  handleClick = () => {
    // fetches arrivalTimes
    console.log(this.state.starredStop);
    NetworkService.getOneStarredStop(this.state.starredStop.id)
    .then((arrivalTimes) => {
        let arrivals = []

        this.props.direction === "N"
        ?
        arrivals = arrivalTimes.feed.uptown.map(time => this.getArrivalTime(time))
        :
        arrivals = arrivalTimes.feed.downtown.map(time => this.getArrivalTime(time))

        arrivals = arrivals.filter(time => time >= 0)

        this.setState({
          renderStopInfo: !this.state.renderStopInfo,
          arrivals: arrivals.sort()
        })

      })
  }

  getArrivalTime = (epochTime) => {
    const timeNow = new Date();
    // setting hours and mins
    let arrivalTime = new Date( parseInt(epochTime.time) *1000);
      let trainHour = arrivalTime.getHours() > 12? arrivalTime.getHours() - 12 : arrivalTime.getHours()
      let trainMin = arrivalTime.getMinutes()
      let currentHour = timeNow.getHours() > 12? timeNow.getHours() - 12 : timeNow.getHours()
      let currentMin = timeNow.getMinutes()

      // take hour and min of train time and subtract each from the current time, if result is negative return 0
      return trainMin - currentMin

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
    direction: reduxState.direction.direction,
    lines: reduxState.lines.all
  }
}

export default withRouter(
  connect(mapStateToProps, {editUserInformation})(StarredStop)
)
