import React from 'react';

class PokemonBattle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // baseHP:,
      // move1: this.props.moves,
      // isTurn: false
    }
  }


  clickHandler(event) {
    this.props.attack(event.target.id, this.props.playerNum)
  }

  render() {
    // if (!this.state.battleTime) {
      return ( <div>
        <h2>HP: {this.props.currentHP}/{this.props.baseHP} </h2>
        <img src={this.props.pokeImg}/>

      {this.props.isTurn && (<ul id="menu">
        <li><button id="0" onClick={this.clickHandler.bind(this)}> {this.props.moves[0].name} </button></li>
        <li><button id="1" onClick={this.clickHandler.bind(this)}> {this.props.moves[1].name} </button></li>
        <li><button id="2" onClick={this.clickHandler.bind(this)}> {this.props.moves[2].name} </button></li>
        <li><button id="3" onClick={this.clickHandler.bind(this)}> {this.props.moves[3].name} </button></li>
      </ul>)
    }
      </div>)
    // } else {
    //   return (<div>{this.props.pokeName.toUpperCase()} IS WAITING TO BATTLE! <img src={this.props.pokeImage}/> </div>)
    // }
  }
}

export default PokemonBattle;
