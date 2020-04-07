import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import StarredStop from './StarredStop';
import { List } from 'semantic-ui-react';

class StarredStopsContainer extends Component {

  renderStops = () => {
    return this.props.user.user_stops.map(stopObj => {
      return <StarredStop
                key={ stopObj.id }
                stop={ stopObj }
                user={ this.props.user }
                triggerRender={ this.props.triggerRender }
              />
            // remove triggerRender
    })
  }


  render() {

    return (
      <>
        <h3>Starred Stops</h3>
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
    user: reduxState.user
  }
}

export default withRouter(
  connect(mapStateToProps)(StarredStopsContainer)
)
