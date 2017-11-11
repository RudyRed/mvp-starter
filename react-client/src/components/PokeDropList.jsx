import React from 'react';
// import ListItem from './ListItem.jsx';

const PokeDropList = (props) => (
  <div class="dropdown">
    <select>
      <option value="" disabled selected>Select your option</option>
      {props.pokeBox.map(pokemon => <option value={pokemon.name}>{pokemon.id}: {pokemon.name}</option>)}
    </select>
  </div>
)

export default PokeDropList;
