import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
    <h4> List Component </h4>
    There are { props.pokeBox.length } pokemon in the PC.
    { props.pokeBox.map(pokemon => <ListItem pokemon={pokemon}/>)}
  </div>
)

export default List;
