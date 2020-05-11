import React from 'react';
import { connect } from 'react-redux';
import { changeDirection } from '../Redux/actions';
import { withRouter } from 'react-router-dom';
import StarredStop from './StarredStop';
import { List, Icon } from 'semantic-ui-react';

const StarredStopsContainer = (props) => {

  const renderStops = () => {
    return props.user.user_stops.map(stopObj => {
      return <StarredStop
                key={ stopObj.id }
                stop={ stopObj }
                user={ props.user }
              />
    })
  }

  const handleClick = () => {
    props.changeDirection()
  }

  return (
    <>
      <h3>Starred Stops</h3>
      <Icon className='exchange' onClick={ handleClick } color="orange" size='large'/>
      {
        props.user.starred_stops.length > 0
        ?
        <List celled relaxed='very' className='font'>
          {
            renderStops()
          }
        </List>
        :
        <h5>You have no starred stops. Add a stop by clicking the star net to a stop.</h5>
      }
    </>
  );
}

const mapStateToProps = (reduxState) => {
  return {
    user: reduxState.user,
    direction: reduxState.direction,
    lines: reduxState.lines.all
  }
}

export default withRouter(
  connect(mapStateToProps, { changeDirection })(StarredStopsContainer)
)
