import $ from 'jquery';
import React from 'react';

class Pokemon1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      speed: this.props.stats[0].base_stat,
      sd: this.props.stats[1].base_stat,
      sa: this.props.stats[2].base_stat,
      defense: this.props.stats[3].base_stat,
      atack: this.props.stats[4].base_stat,
      hp: this.props.stats[5].base_stat,
      move1: [''],
      move2: [''],
      move3: [''],
      move4: [''],
      battleTime: false
    }
  }

  changeHandler(event) {
    for (var move of this.props.moves) {
      if (move.name === event.target.value) {
        this.setState({
          [event.target.id]: [move.name, move]
        });
      }
    }
  }

  clickHandler(event) {
    event.preventDefault();
    if ([
      this.state.move1[0], this.state.move2[0], this.state.move3[0], this.state.move4[0]
    ].some(x => x === '')) {
      alert('you must pick four moves for your Pokemon!')
    } else if ($.unique([
      this.state.move1[0], this.state.move2[0], this.state.move3[0], this.state.move4[0]
    ]).length < 4) {
      alert(`A Pokemon can't have two of the same moves!`)
    } else {
      this.setState({battleTime: true})

    }
  }

  render() {
    if (!this.state.battleTime) {
      return (<div>
        <form>
          <ul id="main">
            <li>{this.props.pokeName} Move 1:<select id="move1" value={this.state.move1[0]} onChange={this.changeHandler.bind(this)}>
                <option value="" hidden="hidden">Select your option</option>
                {this.props.moves.map(move => <option value={move.name}>{move.name}: type: {move.type}</option>)}
              </select>
            </li>
            <li>Move 2:<select id="move2" value={this.state.move2[0]} onChange={this.changeHandler.bind(this)}>
                <option value="" hidden="hidden">Select your option</option>
                {this.props.moves.map(move => <option value={move.name}>{move.name}: type: {move.type}</option>)}
              </select>
            </li>
            <li>Move 3:<select id="move3" value={this.state.move3[0]} onChange={this.changeHandler.bind(this)}>
                <option value="" hidden="hidden">Select your option</option>
                {this.props.moves.map(move => <option value={move.name}>{move.name}: type: {move.type}</option>)}
              </select>
            </li>
            <li>Move 4:<select id="move4" value={this.state.move4[0]} onChange={this.changeHandler.bind(this)}>
                <option value="" hidden="hidden">Select your option</option>
                {this.props.moves.map(move => <option value={move.name}>{move.name}: type: {move.type}</option>)}
              </select>
            </li>
            <li><input type="submit" value="Confirm Moves Choices" onClick={this.clickHandler.bind(this)}/></li>
          </ul>
        </form>
      </div>)
    } else {
      return (<div>{this.props.pokeName.toUpperCase()} IS WAITING TO BATTLE! <img src={this.props.pokeImage}/> </div>)
    }
  }
}

export default Pokemon1;
