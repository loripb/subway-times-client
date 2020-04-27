import React from 'react';
import LineCard from './LineCard'
import { Grid } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const LinesContainer = (props) => {

  const renderLines = () => {
    // set colums
    const colum1 = props.lines.slice(0, 3)
    const colum2 = props.lines.slice(3, 6)
    const colum3 = props.lines.slice(6, 9)
    const colum4 = props.lines.slice(9, 12)
    const colum5 = props.lines.slice(12, 15)
    const colum6 = props.lines.slice(15, 18)
    const colum7 = props.lines.slice(18, 21)
    const colum8 = props.lines.slice(21)

    // set rows
    const row1 = () => {
      return colum1.map(lineObj => {
      return <LineCard
        line={ lineObj }
        key={ lineObj.id}
        handleRenderChange={ props.handleRenderChange }
      />
  })}
    const row2 = () => {
      return colum2.map(lineObj => {return <LineCard
        line={ lineObj }
        key={ lineObj.id}
        handleRenderChange={ props.handleRenderChange }/>})
    }
    const row3 = () => {
      return colum3.map(lineObj => {
      return <LineCard
        line={ lineObj }
        key={ lineObj.id}
        handleRenderChange={ props.handleRenderChange }
      />
  })}
    const row4 = () => {
      return colum4.map(lineObj => {
      return <LineCard
        line={ lineObj }
        key={ lineObj.id}
        handleRenderChange={ props.handleRenderChange }
      />
  })}
    const row5 = () => {
      return colum5.map(lineObj => {
      return <LineCard
        line={ lineObj }
        key={ lineObj.id}
        handleRenderChange={ props.handleRenderChange }
      />
  })}
    const row6 = () => {
      return colum6.map(lineObj => {
      return <LineCard
        line={ lineObj }
        key={ lineObj.id}
        handleRenderChange={ props.handleRenderChange }
      />
  })}
    const row7 = () => {
      return colum7.map(lineObj => {
      return <LineCard
        line={ lineObj }
        key={ lineObj.id}
        handleRenderChange={ props.handleRenderChange }
      />
  })}
    const row8 = () => { return colum8.map(lineObj => {
      return <LineCard
        line={ lineObj }
        key={ lineObj.id}
        handleRenderChange={ props.handleRenderChange }
      />
  })}

    return <Grid columns='three' divided='vertically' >
            <Grid.Row>
              {row1()}
            </Grid.Row>
            <Grid.Row>
              {row2()}
            </Grid.Row>
            <Grid.Row>
              {row3()}
            </Grid.Row>
            <Grid.Row>
              {row4()}
            </Grid.Row>
            <Grid.Row>
              {row5()}
            </Grid.Row>
            <Grid.Row>
              {row6()}
            </Grid.Row>
            <Grid.Row>
              {row7()}
            </Grid.Row>
            <Grid.Row>
              {row8()}
            </Grid.Row>
          </Grid>
  }

  return (
    <div>
      {renderLines()}
    </div>
  );
}

const mapStateToProps = (reduxState) => {
  return {
    lines: reduxState.lines.all
  }
}

export default withRouter(
  connect(mapStateToProps)(LinesContainer)
)
