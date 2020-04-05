import PropTypes from 'prop-types'
import React, { Component } from 'react'
import LinesContainer from './LinesContainer'
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
        <LinesContainer lines={ this.props.lines } />
      </Tab.Pane> },
      { menuItem: 'Starred Stops', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
    ]
    return(
      <>
        <div>
          <Header as='h1'>Subway Times</Header>
        </div>

        <Container>
          <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
        </Container>
      </>
    )
  }
}

export default Home
