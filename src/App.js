import React from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './components/Form'
import Home from './components/Home'
import LinesContainer from './components/LinesContainer'
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAllLines, setUserInformation } from './Redux/actions'


class App extends React.Component {

  state = {
    lines: []
  }

  componentDidMount() {
    if (localStorage.token) {
      fetch("http://localhost:4000/persist", {
        headers: {
          "Authorization": `bearer ${localStorage.token}`
        }
      })
      .then(r => r.json())
      .then((resp) => {
        this.props.setUserInformation(resp)
      })
    }



    // will live inside the stop component in a component did mount function
    // fetch("http://localhost:4000/lines/13")
    // .then(r => r.json())
    // .then((line) => {
    //   // diggs through feed to find the arrays with the arrival times
    //   let feed = line.feed.filter( obj => Object.keys(obj).includes("trip_update"))
    //   let includesStopTimeUpdate = feed.filter(obj => Object.keys(obj.trip_update).includes("stop_time_update"))
    //   let stopTimeUpdateArrays = includesStopTimeUpdate.map(obj => obj.trip_update.stop_time_update)
    //   let stopTimeArrays = stopTimeUpdateArrays.map(obj => obj.map(obj2 => obj2))
    //
    //   let trainObjs = []
    //
    //   // adds the objects with train arrival times and stop ids to "state"
    //   stopTimeArrays.map(obj => {
    //     obj.map(obj2 => {
    //       trainObjs.push(obj2)
    //     })
    //   })
    //
    //   let arrivalTimes = trainObjs.filter(obj => obj.stop_id.includes("726N"))
    //   let trainArrivalsInMinutes = arrivalTimes.map(obj => {
    //     let myDate = new Date( parseInt(obj.arrival.time) *1000);
    //     let today = new Date
    //
    //
    //     // checks for trains coming in the next hour
    //     // if the train arrival minus the time now is negative add 60 mins
    //     // return myDate.getMinutes() - today.getMinutes()
    //     if (Math.sign(myDate.getMinutes() - today.getMinutes()) === -1) {
    //       return (myDate.getMinutes() - today.getMinutes()) + 60
    //     } else {
    //       return myDate.getMinutes() - today.getMinutes()
    //     }
    //   })
    //
    //   // console.log(trainArrivalsInMinutes);
    // })

    // Fetch all subway lines
    fetch("http://localhost:4000/lines")
    .then(r => r.json())
    .then(data => {
      let lines = data.data.map(obj => obj.attributes)
      this.setState({
        lines: lines
      })
    })

  }


  handleLoginSubmit = (userInfo) => {
    console.log("Login form has been submitted")

    //
    fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify(userInfo)
    })
    .then(r => r.json())
    .then((resp) => {
      console.log(resp, "FROM Login")
      console.log(resp);
      localStorage.token = resp.token
      this.props.setUserInformation(resp)
      this.props.history.push("/profile")
    })


  }

  handleRegisterSubmit = (userInfo) => {
    console.log("Register form has been submitted")
    console.log(userInfo)
    fetch("http://localhost:4000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        username: userInfo.username,
        password: userInfo.password
      })
    })
    .then(r => r.json())
    .then((resp) => {
      localStorage.token = resp.token
      this.props.setUserInformation(resp)
      this.props.history.push("/")

    })



  }

  renderForm = (routerProps) => {
    if (this.props.token) {
      return <h2>Already logged in as {this.props.username}</h2>
    }
    if(routerProps.location.pathname === "/login"){
      return <Form formName="Login Form" handleSubmit={this.handleLoginSubmit}/>
    } else if (routerProps.location.pathname === "/signin") {
      return <Form formName="Sign in Form" handleSubmit={this.handleRegisterSubmit}/>
    }
  }

  // renderProfile = (routerProps) => {
  //   return <ProfileContainer />
  // }

  render(){
    return (
      <div className="App">
        <Switch>
          <Route path="/login" render={ this.renderForm } />
          <Route path="/signin" render={ this.renderForm } />
          <Route path="/profile" render={ this.renderProfile } />
          <Route path="/" exact render={() => <Home lines={ this.state.lines } /> } />
          <Route render={ () => <p>Page not Found</p> } />
        </Switch>
      </div>
    );
  }

}

const mapStateToProps = (reduxState) => {
  return {
    token: reduxState.user.token,
    username: reduxState.user.username
  }
}

export default withRouter(
  connect(mapStateToProps, {setUserInformation})(App)
)
