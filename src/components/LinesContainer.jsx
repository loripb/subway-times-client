import React from 'react';
import {connect} from 'react-redux'
import LineCard from './LineCard'
import StopsContainer from './StopsContainer'
import { List } from 'semantic-ui-react'

const LinesContainer = (props) => {

  let renderLines = () => {
    return props.lines.map(lineObj => {
      return <LineCard
        line={ lineObj }
        key={ lineObj.id }
        handleRenderChange={ props.handleRenderChange }
      />
    })
  }

  return(
    <div>
      <List celled>
        { renderLines() }
      </List>
    </div>
  )
}

export default LinesContainer;
