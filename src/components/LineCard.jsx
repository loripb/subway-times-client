import React from 'react'
import { List, Image } from 'semantic-ui-react'

const LineCard = (props) => {

  let handleClick = () => {
    props.handleRenderChange()
  }

  return(
    <List.Item onClick={ handleClick } >
      <List.Icon name='marker' />
      <List.Content>
        <List.Header>{props.line.name}</List.Header>
      </List.Content>
    </List.Item>
  )
};

export default LineCard;
