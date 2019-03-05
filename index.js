import React from 'react';
import ReactDOM from 'react-dom';
import Board from './src/components/board.component';
import './index.css';

class Game extends React.Component {
  state = {
    headerMessage: 'Welcome to our game',
    currentPlayer: ''
  };

  handleTurnChange = turn => {
    this.setState(() => ({
      currentPlayer: turn
    }));
  };

  handleDisplayMessage = ({ win = false, winner = null, draw = false }) => {
    let headerMessage = 'Game is still going';
    if (draw) {
      headerMessage = 'Its a draw';
    } else if (win) {
      headerMessage = `${winner} is the winner`;
    }
    this.setState({
      headerMessage
    });
  };
  render() {
    return (
      <div>
        <h1>{this.state.headerMessage}</h1>
        <div className="btn-container">
          <div
            onClick={() => this.handleTurnChange('CPU')}
            className="btn cpu-btn">
            O
          </div>
          <div
            onClick={() => this.handleTurnChange('PLAYER')}
            className="btn player-btn">
            X
          </div>
        </div>
        <Board
          handleDisplayMessage={this.handleDisplayMessage}
          currentPlayer={this.state.currentPlayer}
        />
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById('root'));
