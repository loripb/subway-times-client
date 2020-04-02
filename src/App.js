import React from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './components/Form'
import DesktopContainer from './components/Home'
import LinesContainer from './components/LinesContainer'
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAllLines, setUserInformation } from './Redux/actions'


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
      this.props.setAllLines(lines)
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
          <Route path="/" exact render={() => <LinesContainer /> } />
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
