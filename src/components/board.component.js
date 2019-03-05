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

  componentDidMount() {
    if (this.state.currentPlayer === 'CPU') {
      console.log(this.state.currentPlayer);
      this.computerMove(this.state.availableMoves, this.state.board);
    }
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
    const newBoard = [
      ...this.state.board.slice(0, index),
      1,
      ...this.state.board.slice(index + 1)
    ];
    const { win, draw, winner } = this.checkWin(newBoard);

    this.setState(
      ({ board }) => ({
        board: newBoard,
        availableMoves: this.calculateAvailableMoves(index),
        currentPlayer: 'CPU',
        win,
        draw,
        winner
      }),
      () => {
        this.props.handleDisplayMessage({
          win: this.state.win,
          winner: this.state.winner,
          draw: this.state.draw
        });
        this.computerMove(this.state.availableMoves, this.state.board);
      }
    );
  };

  computerMove = (availableMoves, board) => {
    if (availableMoves.length === 0) return;
    if (this.state.draw || this.state.win) {
      return;
    }
    const randomIndex =
      availableMoves[Math.floor(Math.random() * availableMoves.length)];
    const newBoard = [
      ...board.slice(0, randomIndex),
      0,
      ...board.slice(randomIndex + 1)
    ];
    const { win, draw, winner } = this.checkWin(newBoard);

    this.setState(
      () => ({
        board: newBoard,
        availableMoves: this.calculateAvailableMoves(randomIndex),
        currentPlayer: 'PLAYER',
        win,
        draw,
        winner
      }),
      () => {
        this.props.handleDisplayMessage({
          win: this.state.win,
          winner: this.state.winner,
          draw: this.state.draw
        });
      }
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

  checkWin(board) {
    let winner = null;
    let win = false;
    let draw = false;

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
    return { winner, win, draw };
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
                if (
                  this.state.currentPlayer === 'CPU' ||
                  this.state.draw ||
                  this.state.win
                ) {
                  return;
                }
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
