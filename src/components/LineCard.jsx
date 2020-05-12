import React from 'react'
import { Grid } from 'semantic-ui-react'

const LineCard = ({ handleRenderChange, line }) => {

  const handleClick = () => {
    handleRenderChange(line)
  }

  return (
    <Grid.Column onClick={ handleClick } >
      <h4 className='font'>{line.name}</h4>
    </Grid.Column>
  );
}

export default LineCard;
