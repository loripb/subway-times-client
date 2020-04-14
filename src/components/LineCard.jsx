import React, { Component } from 'react'
import { Grid, Icon } from 'semantic-ui-react'

const LineCard = ({ handleRenderChange, line }) => {

  const handleClick = () => {
    handleRenderChange(line)
  }

  return (
    <Grid.Column onClick={ handleClick } >
      <h2>{line.name}</h2><Icon name='train' color='orange'/>
    </Grid.Column>
  );
}

export default LineCard;
