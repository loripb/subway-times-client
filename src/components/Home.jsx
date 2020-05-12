import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import GeneralContainer from './GeneralContainer'
import StarredStopsContainer from './StarredStopsContainer'
import AllStopsContainer from './AllStopsContainer'
import LogoutModal from './LogoutModal'
import {
  Container,
  Divider,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment
} from 'semantic-ui-react'

const Home = (props) => {

  const [render, setRender] = useState("All Stops");

  const handleClick = (e) => {
    setRender(e.target.innerText)
  }

  const renderContainer = () => {
    switch (render) {
      case "Search":
        return <AllStopsContainer />
      case "Subway Lines":
        return <GeneralContainer />
      case "Your Stops":
        return <StarredStopsContainer />
      default:
        return <AllStopsContainer />
    }
  }

  const signedIn = () => {
    if (localStorage.token){
      return <Menu.Item>signed in as {props.username}</Menu.Item>
    }
  }

  return(
    <>
    <div>
      <Menu fluid stackable >
        <Container>
          <Menu.Item as='a' href='https://subwaytimes.herokuapp.com/' header>
            <Image size='mini' src='/icons/train-logo-png-8.png' style={{ marginRight: '1.5em' }} />
            Subway Times
          </Menu.Item>
          <Menu.Item onClick={ handleClick } >Search</Menu.Item>
          <Menu.Item onClick={ handleClick } >Subway Lines</Menu.Item>
          <Menu.Item onClick={ handleClick } >Your Stops</Menu.Item>
          {signedIn()}

          {
            localStorage.token
            ?
              <LogoutModal />
            :
              <>
                <Menu.Item  >
                  <Link to="/login">
                    Log in
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link to="/signup">
                    Sign up
                  </Link>
                </Menu.Item>
              </>
          }
        </Container>

      </Menu>

      <Container text style={{ marginTop: '7em' }}>
        <Segment id="stacked" stacked>

            {
              localStorage.token
              ?
              null
              :
              <p>Sign in to save stops</p>
            }

          <p>Select a subway line to view stops.</p>
          <p>Starring a stop will save them to your account.</p>
          <p>COMING SOON: 123, 456 lines. Ability to star stops from the search tab</p>
        </Segment>
        {
          renderContainer()
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
              <List.Item as='a' href='https://www.linkedin.com/in/lori-lei-boyd/'>Lori Boyd</List.Item>
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
    username: reduxState.user.username,
    stops: reduxState.stops.all
  }
}

export default withRouter(
  connect(mapStateToProps)(Home)
)
