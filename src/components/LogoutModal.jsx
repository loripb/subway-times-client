import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOut } from '../Redux/actions'
import { Button, Modal } from 'semantic-ui-react'

class LogoutModal extends Component {
  state = { open: false }

  show = (size) => () => this.setState({ size, open: true })
  close = () => this.setState({ open: false })

  handleClick = () => {
    this.show('mini')()
    this.props.logOut()
  }

  render() {
    const { open, size } = this.state

    return (
      <>
        <Button onClick={ this.handleClick } size='small' inverted color='blue'>Log Out</Button>

        <Modal size={size} open={open} onClose={this.close}>
          <Modal.Header></Modal.Header>
          <Modal.Content>
            <p>Logged out successfully.</p>
          </Modal.Content>
          <Modal.Actions>
            <Button
              onClick={ this.close }
              positive
              icon='checkmark'
              labelPosition='right'
              content='Yes'
            />
          </Modal.Actions>
        </Modal>
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
  connect(mapStateToProps, {logOut})(LogoutModal)
)
