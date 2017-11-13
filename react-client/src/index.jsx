import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import PokeDropList from './components/PokeDropList.jsx'
import PokemonMoveSelection from './components/PokemonMoveSelection.jsx'
import PokemonBattle from './components/PokemonBattle.jsx'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokeBox: [],
      player1: null,
      player2: null,
      player1Moves: null,
      player2Moves: null,
      pokemon1Ready: false,
      pokemon2Ready: false,
      player1Turn: false,
      player2Turn: false,
      pokemon1HP: '',
      pokemon2HP: ''
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
          console.log(data)
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
  playerReady (pokeName, moves) {
    if (pokeName === this.state.player1.name) {
      this.setState({pokemon1Ready: true});
      this.setState({player1Moves: moves})
      this.setState({pokemon1HP: this.state.player1.stats[5].base_stat})
      console.log('didnt fuck up')
    } else {
      this.setState({player2Moves: moves})
      this.setState({pokemon2Ready: true});
      this.setState({pokemon2HP: this.state.player2.stats[5].base_stat})
      console.log('didnt fuck up')
      console.log(this.state.pokemon1Ready)
      console.log(this.state.player1Moves)
      console.log(this.state.player1)
      console.log('POKEMON HP STAT!!!!! ', this.state.pokemon1HP)
      if (this.state.player1.stats[0].base_stat > this.state.player2.stats[0].base_stat) {
        this.setState({player1Turn: true})
      } else if (this.state.player1.stats[0].base_stat = this.state.player2.stats[0].base_stat) {
        this.setState({player1Turn: true})
      }
      else {
        this.setState({player2Turn: true})
      }
    }
  }

  damageCalc () {

  }

  render() {
    console.log('heloo')
    return (<div>
      <h1><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Pokemon_Stadium.svg/312px-Pokemon_Stadium.svg.png"/></h1>
      <h2>(but worse)</h2>
      {!this.state.player1 && (<PokeDropList player={'One'} pokeBox={this.state.pokeBox} handleSubmit={this.pokemonSelectionSubmit.bind(this)}/>)}
      {!this.state.player2 && (<PokeDropList player={'Two'} pokeBox={this.state.pokeBox} handleSubmit={this.pokemonSelectionSubmit.bind(this)}/>)}
      {(this.state.player1 && (!this.state.player1Moves || !this.state.player2Moves)) && (<img src={this.state.player1.sprites.front_default}/>)}
      {(this.state.player2 && (!this.state.player2Moves || !this.state.player1Moves)) && (<img src={this.state.player2.sprites.front_default}/>)}
      {(this.state.player1Moves && this.state.player2Moves && (!this.state.pokemon1Ready || !this.state.pokemon2Ready)) && (<ul id="main">
          <li><PokemonMoveSelection pokeReady={this.playerReady.bind(this)} pokeName={this.state.player1.name} pokeImage={this.state.player1.sprites.front_default} moves={this.state.player1Moves}/></li>
          <li><PokemonMoveSelection pokeReady={this.playerReady.bind(this)} pokeName={this.state.player2.name} pokeImage={this.state.player2.sprites.front_default} moves={this.state.player2Moves}/></li>
        </ul>)
      }
      {(this.state.pokemon1Ready && this.state.pokemon2Ready) && (
        <ul id="menu">
          <li>
            <PokemonBattle attack={this.damageCalc.bind(this)} isTurn={this.state.player1Turn} pokeImg ={this.state.player1.sprites.back_default} moves={this.state.player1Moves} baseHP={this.state.player1.stats[5].base_stat} currentHP={this.state.pokemon1HP}/>
          </li>
          <li>
            <PokemonBattle attack={this.damageCalc.bind(this)} isTurn={this.state.player2Turn} pokeImg={this.state.player2.sprites.front_default} moves={this.state.player2Moves} baseHP={this.state.player2.stats[5].base_stat} currentHP={this.state.pokemon2HP}/>
          </li>
        </ul>
      )}
    </div>)
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
