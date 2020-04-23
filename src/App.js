import React from 'react';
import './App.css';
import Form from './components/Form'
import Home from './components/Home'
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUserInformation, setAlllines } from './Redux/actions'

// Registering Service Worker
if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js');
};

class App extends React.Component {

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

    fetch("http://localhost:4000/lines")
    .then(r => r.json())
    .then((lines) => {
      this.props.setAlllines(lines)
    })
  }

  handleLoginSubmit = (userInfo) => {

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
      localStorage.token = resp.token
      this.props.setUserInformation(resp)
      this.props.history.push("/")
    })


  }

  handleRegisterSubmit = (userInfo) => {
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
      return <Form formName="Login" handleSubmit={this.handleLoginSubmit}/>
    } else if (routerProps.location.pathname === "/signup") {
      return <Form formName="Sign up" handleSubmit={this.handleRegisterSubmit}/>
    }
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
  connect(mapStateToProps, {setUserInformation, setAlllines})(App)
)
