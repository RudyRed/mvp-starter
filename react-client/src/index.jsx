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
    $.ajax({
      url: '/pokemon',
      success: (data) => {
        console.log(typeof data)
        console.log(data)
        this.setState({
          pokeBox: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  render () {
    return (<div>
      <h1>Item List</h1>
      Player One: <PokeDropList pokeBox={this.state.pokeBox}/>
      Player Two: <PokeDropList pokeBox={this.state.pokeBox}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
