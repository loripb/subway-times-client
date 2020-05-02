import React from 'react'
import { Icon, Input } from 'semantic-ui-react'

const Search = ({handleInputChange}) => {

  return (
    <Input
    icon={<Icon name='search' inverted circular link />}
    placeholder='Search...'
    onChange={ handleInputChange }
    />
  );
}

export default Search;
