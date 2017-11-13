import React from 'react';

class Pokemon2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      speed: this.props.stats[0].base_stat,
      sd: this.props.stats[1].base_stat,
      sa: this.props.stats[2].base_stat,
      defense: this.props.stats[3].base_stat,
      atack: this.props.stats[4].base_stat,
      hp: this.props.stats[5].base_stat,
      move1: null,
      move2: null,
      move3: null,
      move4: null
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
    console.log(this.props.stats)
    return  ( <div className="playerone">
      <form>Player {this.props.player}:<select value={this.state.value} onChange={this.changeHandler.bind(this)}>
        <option value="" hidden="hidden">Select your option</option>
        {this.props.pokeBox.map(pokemon => <option value={pokemon.id}>{pokemon.id}: {pokemon.name}</option>)}
      </select> <input type="submit" value="Confirm Pokemon Choice" onClick={this.clickHandler.bind(this)}/> </form>
    </div>)
  }

}



export default Pokemon2;
