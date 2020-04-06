import PropTypes from 'prop-types'
import React, { Component } from 'react'
import GeneralContainer from './GeneralContainer'
import StarredStopsContainer from './StarredStopsContainer'
import LogoutModal from './LogoutModal'
import {Switch, Route} from 'react-router-dom';
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {logOut} from '../Redux/actions'
import {
  Tab,
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'

class Home extends Component {



  render(){
    let panes = [
      { menuItem: 'Home', render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
      { menuItem: 'Subway Lines', render: () => <Tab.Pane>
        <GeneralContainer lines={ this.props.lines } />
      </Tab.Pane> },
      { menuItem: 'Starred Stops', render: () => <Tab.Pane>
        <StarredStopsContainer />
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

export default Home
