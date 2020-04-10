import React, { Component } from 'react'
import GeneralContainer from './GeneralContainer'
import StarredStopsContainer from './StarredStopsContainer'
import LogoutModal from './LogoutModal'
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment,
} from 'semantic-ui-react'

class Home extends Component {

  state = {
    home: true,
    general: true
  }

  triggerRender = () => {
    this.setState({
      render: !this.state.render
    })
  }


  handleYourStopsClick = () => {
    this.setState({
      general: false
    })
  }

  handleHomeClick = () => {
    window.location.reload()
  }

  render(){
    return(
      <div>
        <Menu fixed='top'>
          <Container>
            <Menu.Item as='a' href='http://localhost:3000' header>
              <Image size='mini' src='/train-logo-png-8.png' style={{ marginRight: '1.5em' }} />
              Subway Times
            </Menu.Item>
            <Menu.Item onClick={ this.handleHomeClick } >Home</Menu.Item>
            <Menu.Item onClick={ this.handleYourStopsClick } >Your Stops</Menu.Item>
          </Container >
          <Container></Container>
          <Container></Container>
          <Container></Container>
          <Container></Container>
          <Container>
            {
              localStorage.token
              ?
                <LogoutModal />
              :
                <>
                  <NavLink to="/login">
                    <Menu.Item onClick={ this.handleHomeClick } >Log in</Menu.Item>
                  </NavLink>
                  <NavLink to="/signup">
                    <Menu.Item onClick={ this.handleYourStopsClick } >Sign up</Menu.Item>
                  </NavLink>
                </>
            }
          </Container>

        </Menu>

        <Container text style={{ marginTop: '7em' }}>
          <Segment id="stacked" stacked>
            <Header as='h1'>
              {
                localStorage.token
                ?
                `Hello, ${this.props.username}`
                :
                "Sign in to save stops"
              }
            </Header>
            <p>Select a subway line to view stops.</p>
            <p>Starring a stop will save them to your account.</p>
          </Segment>
          {
            this.state.general
            ?
            <GeneralContainer lines={ this.props.lines } triggerRender={ this.triggerRender } />
            :
            <StarredStopsContainer triggerRender={ this.triggerRender } />
          }
        </Container>

        <Segment vertical style={{ margin: '5em 0em 0em', padding: '5em 0em' }}>
          <Container textAlign='center'>
            <Grid divided inverted stackable>
              <Grid.Column width={3}>
                <Header inverted as='h4' />
                <List link inverted>
                  <List.Item as='a'></List.Item>
                  <List.Item as='a'></List.Item>
                  <List.Item as='a'></List.Item>
                  <List.Item as='a'></List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header inverted as='h4' />
                <List link inverted>
                  <List.Item as='a'></List.Item>
                  <List.Item as='a'></List.Item>
                  <List.Item as='a'></List.Item>
                  <List.Item as='a'></List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header inverted as='h4' />
                <List link inverted>
                  <List.Item as='a'></List.Item>
                  <List.Item as='a'></List.Item>
                  <List.Item as='a'></List.Item>
                  <List.Item as='a'></List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={7}>
                <Header inverted as='h4' />
                <p>

                </p>
              </Grid.Column>
            </Grid>

            <Divider section />
            <Image centered size='mini' src='/train-logo-png-8.png' />
            <List horizontal divided link size='small'>
              <List.Item as='a' href='#'>
                Site Map
              </List.Item>
              <List.Item as='a' href='#'>
                Contact Us
              </List.Item>
              <List.Item as='a' href='#'>
                Terms and Conditions
              </List.Item>
              <List.Item as='a' href='#'>
                Privacy Policy
              </List.Item>
            </List>
          </Container>
        </Segment>
      </div>
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
