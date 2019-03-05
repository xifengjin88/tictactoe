import React from 'react';
import Piece from './piece.component';
import './board.css';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: new Array(9).fill(null),
      win: false,
      winner: null,
      draw: false,
      currentPlayer: props.currentPlayer,
      error: null,
      winningMoves: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ],
      availableMoves: this.resetAvailableMoves()
    };
  }

  resetAvailableMoves = () => {
    const moves = [];
    for (let i = 0; i < 9; i += 1) {
      moves.push(i);
    }
    return moves;
  };

  isValidMoves = index => {
    const validMoves = this.state.availableMoves;
    return validMoves.includes(index);
  };

  calculateAvailableMoves = index => {
    const newMoves = this.state.availableMoves.filter(move => move !== index);
    return newMoves;
  };

  handlePlayerMoveClick = index => {
    if (!this.isValidMoves(index)) {
      this.setState({ error: 'Please choose a correct option' });
      return;
    }
    this.setState(
      ({ board }) => ({
        board: [...board.slice(0, index), 1, ...board.slice(index + 1)],
        availableMoves: this.calculateAvailableMoves(index)
      }),
      () => {
        console.log(
          'board',
          this.state.board,
          'index',
          index,
          'this.state.availableMoves',
          this.state.availableMoves
        );
        this.computerMove(this.state.availableMoves);
      }
    );
  };

  computerMove = availableMoves => {
    if (availableMoves.length === 0) return;
    const randomIndex =
      availableMoves[Math.floor(Math.random() * availableMoves.length)];
    this.setState(
      ({ board }) => ({
        board: [
          ...board.slice(0, randomIndex),
          0,
          ...board.slice(randomIndex + 1)
        ],
        availableMoves: this.calculateAvailableMoves(randomIndex)
      }),
      () =>
        console.log(
          'after computer move',
          'board',
          this.state.board,
          'index',
          randomIndex,
          'this.state.availableMoves',
          this.state.availableMoves
        )
    );
  };

  reset() {
    this.setState({
      board: new Array(9).fill(null),
      win: false,
      draw: false,
      winner: null
    });
  }

  checkWin() {
    let winner = null;
    let win = false;
    let draw = false;
    const board = this.state.board;
    for (let winRow = 0; winRow < this.state.winningMoves.length; winRow += 1) {
      const [win1, win2, win3] = this.state.winningMoves[winRow];
      if (board[win1] === 1 && board[win2] === 1 && board[win3] === 1) {
        winner = 'PLAYER';
        win = true;
      } else if (board[win1] === 0 && board[win2] === 0 && board[win3] === 0) {
        winner = 'CPU';
        win = true;
      } else if (board.filter(piece => piece !== null).length === 9) {
        draw = true;
      }
    }
    this.setState({ winner, win, draw });
  }
  render() {
    return (
      <div className="board">
        {this.state.board.map((piece, index) => {
          return (
            <Piece
              key={index}
              piece={piece}
              handlePlayerMoveClick={() => {
                this.handlePlayerMoveClick(index);
              }}
            />
          );
        })}
      </div>
    );
  }
}

export default Board;
