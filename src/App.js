import React from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './components/Form'
import DesktopContainer from './components/Home'
import {Switch, Route} from 'react-router-dom';

class App extends React.Component {

  // componentDidMount() {
  //   if (localStorage.token) {
  //     fetch("http://localhost:4000/persist", {
  //       headers: {
  //         "Authorization": `bearer ${localStorage.token}`
  //       }
  //     })
  //     .then(r => r.json())
  //     .then((resp) => {
  //       this.props.setUserInformation(resp)
  //       this.props.history.push("/profile")
  //
  //     })
  //   }
  //
  //
  //
  //
  //   fetch("http://localhost:4000/snacks")
  //   .then(r => r.json())
  //   .then((snacks) => {
  //     this.props.setAllSnacks(snacks)
  //   })
  //
  //
  // }
  //
  //
  //
  //
  //
  // handleLoginSubmit = (userInfo) => {
  //   console.log("Login form has been submitted")
  //   //
  //   fetch("http://localhost:4000/login", {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json"
  //     },
  //     body: JSON.stringify(userInfo)
  //   })
  //   .then(r => r.json())
  //   .then((resp) => {
  //     console.log(resp);
  //     localStorage.token = resp.token
  //     this.props.setUserInformation(resp)
  //     this.props.history.push("/profile")
  //   })
  //
  //
  // }
  //
  // handleRegisterSubmit = (userInfo) => {
  //   console.log("Register form has been submitted")
  //   fetch("http://localhost:3000/users", {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       username: userInfo.username,
  //       password: userInfo.password
  //     })
  //   })
  //   .then(r => r.json())
  //   .then((resp) => {
  //     localStorage.token = resp.token
  //     this.props.setUserInformation(resp)
  //     this.props.history.push("/profile")
  //
  //   })
  //
  //
  //
  // }

  // renderForm = (routerProps) => {
  //   if (this.props.token) {
  //     return <h2>Already logged in as {this.props.username}</h2>
  //   }
  //   if(routerProps.location.pathname === "/login"){
  //     return <Form formName="Login Form" handleSubmit={this.handleLoginSubmit}/>
  //   } else if (routerProps.location.pathname === "/register") {
  //     return <Form formName="Register Form" handleSubmit={this.handleRegisterSubmit}/>
  //   }
  // }

  // renderProfile = (routerProps) => {
  //   return <ProfileContainer />
  // }

  render(){
    return (
      <DesktopContainer />
    );
  }

}
// <NavBar/>
// <Route path="/register" render={ this.renderForm } />
// <Route path="/profile" render={ this.renderProfile } />
// <Route path="/" exact render={() => <Home /> } />
// <Route render={ () => <p>Page not Found</p> } />

// const mapStateToProps = (reduxState) => {
//   return {
//     token: reduxState.user.token,
//     username: reduxState.user.username
//   }
// }

export default App //withRouter(
//   connect(mapStateToProps, {setAllSnacks, setUserInformation})(App)
// )
