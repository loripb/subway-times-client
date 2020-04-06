import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import StopCard from './StopCard'
import { List, Icon, Button } from 'semantic-ui-react';

class StarredStopsContainer extends Component {

  renderStops = () => {
    return this.props.user.user_stops.map(stopObj => {
      return <StopCard
                key={ stopObj.id }
                stop={ stopObj }
              />
    })
  }

  render() {
    console.log(this.props.user);
    return (
      <>
        <h3>Starred Stops</h3>
        <List celled>
          {
            this.renderStops()
          }
        </List>
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
