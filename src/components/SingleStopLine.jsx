import React, { Component } from 'react';
import LineStop from './LineStop';
import { List } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class SingleStopLine extends Component {

  state = {
    arrivals: [],
    display: false,
    feed: []
  }

  // fetch for the stop arrivals
  handleClick = () => {
    fetch(`https://subway-times-api.herokuapp.com/lines/${this.props.line.id}`)
    .then(r => r.json())
    .then(data => this.setState({ feed: data.feed, display: !this.state.display }))
  }

  renderArrivals = () => {
    // on click show arival times
    return <LineStop
      key={ this.props.line.id }
      line={ this.props.line }
      feed={ this.state.feed }
      stop={ this.props.stop }
    />
  }

  render(){
    return(
      <List.List>
        <p onClick={ this.handleClick } >{ this.props.line.name }</p>
        <List.Item>
          {
            this.state.display
            ?
            this.renderArrivals()
            :
            null
          }
        </List.Item>
      </List.List>
    )
  }
};

const mapStateToProps = (reduxState) => {
  return {
    stops: reduxState.stops.all
  }
}

export default withRouter(
  connect(mapStateToProps)(SingleStopLine)
)
