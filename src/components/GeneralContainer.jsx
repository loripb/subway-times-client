// will switch rendering between lines container and stop container
import React, { useState } from 'react';
import LinesContainer from './LinesContainer';
import StopsContainer from './StopsContainer';

const GeneralContainer = () => {

  const [ renderLines, setRenderLines ] = useState(true)
  const [ line, setLine ] = useState(undefined)

  const handleRenderChange = (lineObj) => {
    setLine(lineObj)
    setRenderLines(!renderLines)
  }

  return (
    <>
      <h1>Subway Lines</h1>
      {
        renderLines
        ?
        <LinesContainer
          handleRenderChange={ handleRenderChange }
        />
        :
        <StopsContainer
          line={ line }
          handleRenderChange={ handleRenderChange }
        />
      }
    </>
  );
}

export default GeneralContainer;
