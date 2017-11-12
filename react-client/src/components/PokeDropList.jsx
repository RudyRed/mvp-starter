import React from 'react';

class PokeDropList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: ''
    }
  }

  changeHandler(event) {
    this.setState({pokemon: event.target.value});
  }

  clickHandler(event) {
    event.preventDefault();
    this.props.handleSubmit(this.state.pokemon, this.props.player);
  }

  render() {
    return  ( <div className="playerone">
      <form>Player {this.props.player}:<select value={this.state.value} onChange={this.changeHandler.bind(this)}>
        <option value="" hidden="hidden">Select your option</option>
        {this.props.pokeBox.map(pokemon => <option value={pokemon.id}>{pokemon.id}: {pokemon.name}</option>)}
      </select> <input type="submit" value="Confirm Pokemon Choice" onClick={this.clickHandler.bind(this)}/> </form>
    </div>)
  }

}



export default PokeDropList;
