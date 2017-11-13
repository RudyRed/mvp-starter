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
        }
      });
    }
  }

  pokemonSelectionSubmit(pokemonId, player) {
    $.ajax({
      type: 'GET',
      url: this.state.pokeBox[pokemonId - 1].url,
      success: (data) => {
        if (player === 'One') {
          this.setState({player1: data});
          this.loadPokemonsMoves(data.id, 1);
        } else {
          this.setState({player2: data});
          this.loadPokemonsMoves(data.id, 2);
        }
      },
      error: (err) => {
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
          this.setState({player1Moves: data});
        } else {
          this.setState({player2Moves: data});
        }
      },
      error: (err) => {
      }
    });
  }
  playerReady (pokeName, moves) {
    if (pokeName === this.state.player1.name) {
      this.setState({
        pokemon1Ready: true,
        player1Moves: moves,
        pokemon1HP: this.state.player1.stats[5].base_stat
      });
      // this.setState({})
      // this.setState({})
    } else {
      this.setState({
        player2Moves: moves,
        pokemon2Ready: true,
        pokemon2HP: this.state.player2.stats[5].base_stat
      })
      // this.setState({});
      // this.setState({pokemon2HP: this.state.player2.stats[5].base_stat})
      if (this.state.player1.stats[0].base_stat > this.state.player2.stats[0].base_stat) {

        this.setState({player1Turn: true})
      } else if (this.state.player1.stats[0].base_stat === this.state.player2.stats[0].base_stat) {

        this.setState({player1Turn: true})
      }
      else {
        this.setState({player2Turn: true})
      }
    }
  }

  damageCalc (move, playerNum) {
    var damage = 0;
    if (playerNum === 1) {
      if (Math.random() * 100 >  this.state.player1Moves[move].accuracy) {
        alert(`${this.state.player1.name}'s attack missed!`);
      } else {
        if (this.state.player1Moves[move].damage_class === "physical") {
          damage = ((((2 * 50 / 5 + 2) * this.state.player1.stats[4].base_stat
          * this.state.player1Moves[move].power / this.state.player2.stats[3].base_stat
        ) / 50) + 2)
           *  Math.random()
        } else {
          damage = ((((2 * 50 / 5 + 2) * this.state.player1.stats[2].base_stat
          * this.state.player1Moves[move].power / this.state.player2.stats[1].base_stat
        ) / 50) + 2)
           *  Math.random()
        }
        if (this.state.pokemon2HP - Math.floor(damage) > 0) {
          this.setState({
            pokemon2HP: this.state.pokemon2HP - Math.floor(damage)
          })
        } else {
          this.setState({pokemon2HP: 0})
          alert(`${this.state.player2.name} has fainted! ${this.state.player1.name} wins!`)
        }
      }
    } else {
      if (Math.random() * 100 >  this.state.player1Moves[move].accuracy) {
        alert(`${this.state.player2.name}'s attack missed!`);
      } else {
        if (this.state.player2Moves[move].damage_class === "physical") {
          damage = ((((2 * 50 / 5 + 2) * this.state.player2.stats[4].base_stat
          * this.state.player2Moves[move].power / this.state.player1.stats[3].base_stat
        ) / 50) + 2)
           *  Math.random()
        } else {
          damage = ((((2 * 50 / 5 + 2) * this.state.player2.stats[2].base_stat
          * this.state.player2Moves[move].power / this.state.player1.stats[1].base_stat
        ) / 50) + 2)
           *  Math.random()
        }
        if (this.state.pokemon1HP - Math.floor(damage) > 0) {
          this.setState({
            pokemon1HP: this.state.pokemon1HP - Math.floor(damage)
          })
        } else {
          this.setState({pokemon1HP: 0})
          alert(`${this.state.player1.name} has fainted! ${this.state.player2.name} wins!`)
        }
      }
    }


    this.setState({
      player1Turn: !this.state.player1Turn,
      player2Turn: !this.state.player2Turn
    })
  }

  render() {
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
            <PokemonBattle playerNum={1} attack={this.damageCalc.bind(this)} isTurn={this.state.player1Turn} pokeImg ={this.state.player1.sprites.back_default} moves={this.state.player1Moves} baseHP={this.state.player1.stats[5].base_stat} currentHP={this.state.pokemon1HP}/>
          </li>
          <li>
            <PokemonBattle playerNum={2}attack={this.damageCalc.bind(this)} isTurn={this.state.player2Turn} pokeImg={this.state.player2.sprites.front_default} moves={this.state.player2Moves} baseHP={this.state.player2.stats[5].base_stat} currentHP={this.state.pokemon2HP}/>
          </li>
        </ul>
      )}
    </div>)
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
