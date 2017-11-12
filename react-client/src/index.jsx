import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import List from './components/List.jsx';
import PokeDropList from './components/PokeDropList.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokeBox: [],
      player1: null,
      player2: null,
      player1Moves: null,
      player1Moves: null
    }
  }

  componentDidMount() {
    if (!this.state.pokeBox.length) {
      $.ajax({
        type: 'GET',
        url: '/pokemon',
        success: (data) => {
          this.setState({pokeBox: data})
        },
        error: (err) => {
          console.log('err', err);
        }
      });
    }
  }

  pokemonSelectionSubmit(pokemonId, player) {
    console.log('test')
    console.log(pokemonId)
    console.log(this)
    $.ajax({
      type: 'GET',
      url: this.state.pokeBox[pokemonId - 1].url,
      success: (data) => {
        console.log(typeof data)
        if (player === 'One') {
          this.setState({player1: data});
          this.loadPokemonsMoves(data.id, 1);
        } else {
          this.setState({player2: data});
          this.loadPokemonsMoves(data.id, 2);
        }
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  loadPokemonsMoves(id, playerNum) {
    $.ajax({
      type: 'GET',
      url: '/moves',
      data: {
        id: id
      },
      success: (data) => {
        if (playerNum === 1) {
          console.log(data, 'PLAYER ONE')
          this.setState({player1Moves: data});
        } else {
          console.log(data, 'PLAYER TWO')
          this.setState({player2Moves: data});
        }
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  render() {
    return (<div>
      <h1>Item List</h1>
      {!this.state.player1 && (<PokeDropList player={'One'} pokeBox={this.state.pokeBox} handleSubmit={this.pokemonSelectionSubmit.bind(this)}/>)}
      {!this.state.player2 && (<PokeDropList player={'Two'} pokeBox={this.state.pokeBox} handleSubmit={this.pokemonSelectionSubmit.bind(this)}/>)}
      {(this.state.player1 && (!this.state.player1Moves || !this.state.player2Moves)) && (<img src={this.state.player1.sprites.back_default}/>)}
      {(this.state.player2 && (!this.state.player2Moves || !this.state.player1Moves)) && (<img src={this.state.player2.sprites.front_default}/>)}
    </div>)
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
