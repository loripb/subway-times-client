import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOut } from '../Redux/actions'
import { Menu, Confirm } from 'semantic-ui-react'

class LogoutModal extends Component {
state = { open: false, result: 'show the modal to capture a result' }

  show = () => this.setState({ open: true })
  handleConfirm = () => {
    localStorage.clear()
    this.props.logOut()
    this.setState({ result: 'confirmed', open: false })
  }
  handleCancel = () => this.setState({ result: 'cancelled', open: false })

  render() {
    const { open, result } = this.state

    return (
      <div>
        <Menu.Item onClick={this.show} >Log out</Menu.Item>
        <Confirm
          open={open}
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
        />
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
  connect(mapStateToProps, {logOut})(LogoutModal)
)
