import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import PokeDropList from './components/PokeDropList.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokeBox: [],
      player1: null,
      player2: null
    }
  }

  componentDidMount() {
    if (!this.state.pokeBox.length) {
      $.ajax({
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
      url: this.state.pokeBox[pokemonId -1].url,
      success: (data) => {
        console.log(typeof data)
        if (player === 'One') {
          this.setState({player1: data})
        } else {
          this.setState({player2: data})
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
      {this.state.player1 && (<img src={this.state.player1.sprites.back_default} />)}
      {this.state.player2 && (<img src={this.state.player2.sprites.front_default} />)}
    </div>)
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
