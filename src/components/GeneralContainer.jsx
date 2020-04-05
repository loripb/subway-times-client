// will switch between lines container and stop container
import React, {Component} from 'react';
import LinesContainer from './LinesContainer';
import StopsContainer from './StopsContainer'

class GeneralContainer extends Component {

  state = {
    renderStops: false
  }

  render(){
    console.log(this.state.renderStops)
    return (
      {
        this.state.renderStops ? <StopsContainer/> : <LinesContainer lines={this.props.lines} />
      }

    )
  }
};

export default GeneralContainer;
