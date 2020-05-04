import React, { Component } from 'react';
import { List } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import SingleStopLine from './SingleStopLine';


class SingleStop extends Component {

  state = {
    arrivals: [],
    lines: []
  }

  callFetch = (stop) => {
    // fetch the stop
    fetch(`https://subway-times-api.herokuapp.com/stops/${stop.id}`)
    .then(r => r.json())
    .then(data => {
      // grab the line ids from promise);
      data.lines.map(line => {
        this.setState({
          lines: [...this.state.lines,line]
        })
      })
    })
  }

  // const removeExtraFeedIds = () => {
  //   // can optimize this
  //   let ids = []
  //   setLines(undefined)
  //   lines.map(line => {
  //     // if ids does not include the feed_id add it
  //     if (ids.includes(line.feed_id) === false){
  //       ids.push(line.feed_id)
  //       console.log(lines);
  //     }
  //   })
  //
  //   console.log(lines, 'from remove extra')
  // }

  handleClick = () => {
    // move stop fetch to another function
    // filter through all stops for each stop id
    const filteredStops = this.props.getFilteredStops().filter(stop => stop.name.toLowerCase().includes(this.props.stopName.toLowerCase()))
    // fetch for each stop and set all associated lines in state
    filteredStops.map(stop => this.callFetch(stop))

    // grab stop from line feed
    // add times to arrival state
  }

  renderLines = () => {
    return this.state.lines.map(line => {
      return <SingleStopLine
        key={ line.id }
        line={ line }
      />
    })
  }

  render(){
    return(
      <List.Item onClick={ this.handleClick }>
        <List.Content>{ this.props.stopName }</List.Content>
        <List.List>
          { this.renderLines() }
        </List.List>
      </List.Item>
    )
  }
};

const mapStateToProps = (reduxState) => {
  return {
    allStops: reduxState.stops.all
  }
}

export default withRouter(
  connect(mapStateToProps)(SingleStop)
)
