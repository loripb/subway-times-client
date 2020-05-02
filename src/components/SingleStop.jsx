import React from 'react';
import { List } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


const SingleStop = (props) => {
  return(
    <List.Item>
      <List.Header>{ props.stopName }</List.Header>
    </List.Item>
  )
};

const mapStateToProps = (reduxState) => {
  return {
    allStops: reduxState.stops.all
  }
}

export default withRouter(
  connect(mapStateToProps)(SingleStop)
)
