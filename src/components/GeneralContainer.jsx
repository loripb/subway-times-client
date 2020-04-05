// will switch rendering between lines container and stop container
import React, {Component} from 'react';
import LinesContainer from './LinesContainer';
import StopsContainer from './StopsContainer'

class GeneralContainer extends Component {

  state = {
    renderLines: true
  }

  handleRenderChange = () => {
    this.setState({
      renderLines: !this.state.renderLines
    })
  }

  render() {
    console.log(this.state.renderLines)
    return (
      <>
        {
          this.state.renderLines
          ?
          <LinesContainer
            lines={ this.props.lines }
            handleRenderChange={ this.handleRenderChange }
          />
          :
          <StopsContainer
            handleRenderChange={ this.handleRenderChange }
          />
        }
      </>
    );
  }

}

export default GeneralContainer;
