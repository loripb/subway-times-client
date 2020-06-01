import React from 'react';
import './App.css';
import Form from './components/Form'
import Home from './components/Home'
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUserInformation, setAlllines, setAllStops } from './Redux/actions'

// Registering Service Worker
// if('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('./sw.js');
// };

class App extends React.Component {

  state = {
    error: undefined
  }

  componentDidMount() {
    if (localStorage.token) {
      fetch("https://subway-times-api.herokuapp.com/persist", {
        headers: {
          "Authorization": `bearer ${localStorage.token}`
        }
      })
      .then(r => r.json())
      .then((resp) => {
        this.props.setUserInformation(resp)
      })
    }

    fetch("https://subway-times-api.herokuapp.com/lines")
    .then(r => r.json())
    .then((lines) => {
      this.props.setAlllines(lines)
    })

    fetch("https://subway-times-api.herokuapp.com/stops")
    .then(r => r.json())
    .then((stops) => {
      this.props.setAllStops(stops)
    })
  }

  renderForm = (routerProps) => {
    if (this.props.token) {
      return <h2>Already logged in as {this.props.username}</h2>
    }
    if(routerProps.location.pathname === "/login"){
      return <Form formName="Login" handleSubmit={this.handleLoginSubmit} error={ this.state.error }/>
    } else if (routerProps.location.pathname === "/signup") {
      return <Form formName="Sign up" handleSubmit={this.handleRegisterSubmit} error={ this.state.error }/>
    }
  }

  handleLoginSubmit = (userInfo) => {

    //
    fetch("https://subway-times-api.herokuapp.com/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify(userInfo)
    })
    .then(r => r.json())
    .then((resp) => {
      localStorage.token = resp.token
      this.props.setUserInformation(resp)
      this.props.history.push("/")
    })
    .catch(alert)


  }

  handleRegisterSubmit = (userInfo) => {
    fetch("https://subway-times-api.herokuapp.com/users", {
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
      if (resp.error) {
        this.setState({error: resp.error})
        this.props.history.push("/signup")
      } else {
        localStorage.token = resp.token
        this.props.setUserInformation(resp)
        this.props.history.push("/")
      }

    })
    .catch(alert)

  }


  // renderProfile = (routerProps) => {
  //   return <ProfileContainer />
  // }

  render(){
    return (
      <div className="App">
        <Switch>
          <Route path="/login" exact render={ this.renderForm } />
          <Route path="/signup" exact render={ this.renderForm } />
          <Route path="/" exact render={() => <Home /> } />
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
  connect(mapStateToProps, { setUserInformation, setAlllines, setAllStops })(App)
)
