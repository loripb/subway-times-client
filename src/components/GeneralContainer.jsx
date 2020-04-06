// will switch rendering between lines container and stop container
import React, {Component} from 'react';
import LinesContainer from './LinesContainer';
import StopsContainer from './StopsContainer'

class GeneralContainer extends Component {

  state = {
    line: undefined,
    renderLines: true
  }

  handleRenderChange = (lineObj) => {
    console.log(lineObj, "in render change")
    this.setState({
      line: lineObj,
      renderLines: !this.state.renderLines
    })
  }

  render() {
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
            line={ this.state.line }
            handleRenderChange={ this.handleRenderChange }
          />
        }
      </>
    );
  }

}

export default GeneralContainer;
