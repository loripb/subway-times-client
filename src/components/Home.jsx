import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import GeneralContainer from './GeneralContainer'
import StarredStopsContainer from './StarredStopsContainer'
import LogoutModal from './LogoutModal'
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
  Dimmer,
  Loader
} from 'semantic-ui-react'

const Home = (props) => {

  const [general, setGeneral] = useState(true);

  const handleYourStopsClick = () => {
    setGeneral(false)
  }

  const handleHomeClick = () => {
    setGeneral(true)
  }
  return(
    <>
    <div>
      <Menu fixed='top'>
        <Container>
          <Menu.Item as='a' href='https://subwaytimes.herokuapp.com/' header>
            <Image size='mini' src='/icons/train-logo-png-8.png' style={{ marginRight: '1.5em' }} />
            Subway Times
          </Menu.Item>
          <Menu.Item onClick={ handleHomeClick } >Subway Lines</Menu.Item>
          <Menu.Item onClick={ handleYourStopsClick } >Your Stops</Menu.Item>
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
                  <Menu.Item  >Log in</Menu.Item>
                </NavLink>
                <NavLink to="/signup">
                  <Menu.Item  >Sign up</Menu.Item>
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
              `Hello, ${props.username}!`
              :
              "Sign in to save stops"
            }
          </Header>
          <p>Select a subway line to view stops.</p>
          <p>Starring a stop will save them to your account.</p>
        </Segment>
        {
          general
          ?
            <GeneralContainer />
          :
            <StarredStopsContainer />
        }
      </Container>

    </div>
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
              <List.Item as='a' href='#'>Lori Boyd</List.Item>
              <List.Item as='a'></List.Item>
              <List.Item as='a'></List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header inverted as='h4' />
            <List link inverted>
              <List.Item as='a'></List.Item>
              <List.Item as='a' href='https://github.com/loripb/subway-times-client'>GitHub</List.Item>
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
        <Image centered size='mini' src='/icons/train-logo-png-8.png' />
        <List horizontal divided link size='small' id="footer">
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
    </>
  )
};

const mapStateToProps = (reduxState) => {
  return {
    token: reduxState.user.token,
    username: reduxState.user.username
  }
}

export default withRouter(
  connect(mapStateToProps)(Home)
)
