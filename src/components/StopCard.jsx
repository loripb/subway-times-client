import React, { Component } from 'react';
import { List, Image } from 'semantic-ui-react'

class StopCard extends Component {

  state = {
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
      stopTimeArrays.map(obj => {
        obj.map(obj2 => {
          trainObjs.push(obj2)
        })
      })

      let arrivalTimes = trainObjs.filter(obj => obj.stop_id.includes(this.state.stopObj.stop_id + this.props.direction))
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
        arrivals: trainArrivalObjs
      })
    })
  }

  render(){
    return(
      <>
        {
          this.state.renderStopInfo
          ?
          <List.Item onClick={ this.handleClick }>
            <List.Icon name='marker' />
            <List.Content>
              <List.Header>{ this.state.stopObj.name }</List.Header>
              <List.Description>
                <h5>{ this.state.arrivals[0] }mins, { this.state.arrivals[1] }mins, { this.state.arrivals[2] }mins</h5>
              </List.Description>
            </List.Content>
          </List.Item>
          :
          <List.Item onClick={ this.handleClick }>
            <List.Icon name='marker' />
            <List.Content>
              <List.Header>{ this.state.stopObj.name }</List.Header>
            </List.Content>
          </List.Item>
        }
      </>
    )
  }
};

export default StopCard;
