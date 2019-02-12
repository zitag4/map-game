import React, { Component } from 'react';
import './App.css';

class GameOver extends Component {
  render() {
    return (
      <div className='win'>
        <h2 className='highScore'>Game over</h2>
        <p>0 km left</p>
        <p>You found {this.props.match} cities</p>
        <button className='new-game'onClick={this.props.newGame}>New game</button>
      </div>
    );
  }
}

export default GameOver;
