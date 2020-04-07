import React, { Component } from 'react'
import GeneralContainer from './GeneralContainer'
import StarredStopsContainer from './StarredStopsContainer'
import LogoutModal from './LogoutModal'
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {
  Tab,
  Button,
  Container,
  Header
} from 'semantic-ui-react'

class Home extends Component {

  state = {
    render: true
  }

  triggerRender = () => {
    this.setState({
      render: !this.state.render
    })
  }

  render(){
    let panes = [
      { menuItem: 'Home', render: () => <Tab.Pane>
        <h5>Hello, { this.props.username }!</h5>
        <p>Get Real-time MTA Train times!</p>
      </Tab.Pane> },
      { menuItem: 'Subway Lines', render: () => <Tab.Pane>
        <GeneralContainer lines={ this.props.lines } triggerRender={ this.triggerRender } />
      </Tab.Pane> },
      { menuItem: 'Starred Stops', render: () => <Tab.Pane>
        <StarredStopsContainer triggerRender={ this.triggerRender } />
      </Tab.Pane> },
    ]
    return(
      <>
        <div>
          <Header as='h1'>Subway Times</Header>
        </div>
        <LogoutModal />
        <NavLink to="/login">
          <Button size='small' inverted color='blue'>Login</Button>
        </NavLink>
        <NavLink to="/signup">
          <Button size='small' inverted color='blue'>Sign Up</Button>
        </NavLink>
        <Container>
          <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
        </Container>
      </>
    )
  }
}

const mapStateToProps = (reduxState) => {
  return {
    token: reduxState.user.token,
    username: reduxState.user.username
  }
}

export default withRouter(
  connect(mapStateToProps)(Home)
)
