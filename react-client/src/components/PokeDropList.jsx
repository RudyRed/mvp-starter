import React from 'react';

class PokeDropList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true
    }
  }
  render() {
    return  ( <div className="playerone">
      {this.state.display && (<select>
        <option value="" hidden="hidden">Select your option</option>
        {this.props.pokeBox.map(pokemon => <option value={pokemon.name}>{pokemon.id}: {pokemon.name}</option>)}
      </select>)}
    </div>)
  }
}
  export default PokeDropList;
