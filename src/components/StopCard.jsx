import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { editUserInformation } from '../Redux/actions';
import { List, Icon, Popup } from 'semantic-ui-react';
import NetworkService from '../services/NetworkService';


const timeoutLength = 2500

class StopCard extends Component {

  state = {
    foundUser: undefined,
    arrivals: [],
    renderStopInfo: false,
    isOpen: false
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

  componentDidMount(){

    fetch(`https://subway-times-api.herokuapp.com/stops/${this.props.stop.id}`)
    .then(r => r.json())
    .then(data => this.setState({
      stopObj: data.stop
    }))


    // fetch here
    NetworkService.getStopArrivals(this.props.line.id, this.props.stop.id)
    .then((arrivalTimes) => {

        let arrivals = []

        // if arrivaltimes is not empty run this code
        // else return nothing to render nothing


        this.props.direction === "N"
        ?
        arrivals = arrivalTimes.uptown.map(time => this.getArrivalTime(time))
        :
        arrivals = arrivalTimes.downtown.map(time => this.getArrivalTime(time))

        arrivals = arrivals.filter(time => time >= 0)

        this.setState({
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

      // if trainHour is > current hour add 60 mins to trainMin
      // if (trainHour > currentHour) {
      //   trainMin += 60
      // }

      // take hour and min of train time and subtract each from the current time, if result is negative return 0
      return trainMin - currentMin

  }

  handleClick = () => {
    this.setState({
      renderStopInfo: !this.state.renderStopInfo,
     })
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
        stop_id: this.props.stop.id,
        line_id: this.props.line.id
      })
    })
    .then(r => r.json())
    .then(data => {
      // puts the exact train in the stopObj
      let updatedStops = [...this.props.user.user_stops, this.props.stop]
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
    fetch("https://subway-times-api.herokuapp.com/users/")
    .then(r => r.json())
    // use username to match user obj
    .then(usersArray => this.addOneStarStop(usersArray))
  }

  isDue = (time) => {
    if (time === 0){
      return `Due`
    } else {
      return `${time} mins`
    }
  }

  render(){
    console.log(this.props.user)
    return(
      <>
        {
          this.state.renderStopInfo
          ?
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
            <List.Content onClick={ this.handleClick } >
              <List.List className='font'>{ this.props.stop.name }</List.List>
              <List.Description className='font'>
                <h5 className='font'>{ this.state.arrivals.length > 0 ? `${this.isDue(this.state.arrivals[0])}, ${this.isDue(this.state.arrivals[1])}, ${this.isDue(this.state.arrivals[2])}` : `There are no arrivals for the ${this.props.line.name} line at this station.` }</h5>
              </List.Description>
            </List.Content>
          </List.Item>
          :
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
            <List.Content onClick={ this.handleClick }>
              <List.List className='font'>{ this.props.stop.name }</List.List>
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
