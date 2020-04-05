import React from 'react'
import { List, Image } from 'semantic-ui-react'

const LineCard = (props) => {

  return(
    <List.Item>
      <List.Icon name='marker' />
      <List.Content>
        <List.Header>{props.line.name}</List.Header>
      </List.Content>
    </List.Item>
  )
};

export default LineCard;
