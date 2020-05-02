import React from 'react'
import { Input } from 'semantic-ui-react'

const Search = ({handleInputChange}) => {

  return (
    <Input
    placeholder='Search...'
    onChange={ handleInputChange }
    />
  );
}

export default Search;
