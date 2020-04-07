import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeDirection } from '../Redux/actions'
import { withRouter } from 'react-router-dom';
import StarredStop from './StarredStop';
import { List, Button } from 'semantic-ui-react';

class StarredStopsContainer extends Component {

  renderStops = () => {
    return this.props.user.user_stops.map(stopObj => {
      return <StarredStop
                key={ stopObj.id }
                stop={ stopObj }
                user={ this.props.user }
              />
    })
  }

  handleClick = () => {
    this.props.changeDirection()
  }


  render() {
    return (
      <>
        <h3>Starred Stops Going</h3>
        <Button size='small' onClick={ this.handleClick }>Change Direction</Button>
        {
          this.props.user.starred_stops !== []
          ?
          <List celled>
            {
              this.renderStops()
            }
          </List>
          :
          <h5>You have no starred stops. Add a stop by clicking the star net to a stop.</h5>

        }
      </>
    );
  }

}

const mapStateToProps = (reduxState) => {
  return {
    user: reduxState.user,
    direction: reduxState.direction
  }
}

export default withRouter(
  connect(mapStateToProps, { changeDirection })(StarredStopsContainer)
)
