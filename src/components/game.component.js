import React from 'react';
import TicTacToe from '../game';
import Board from './board.component';

class Game extends React.Component {
  state = {
    game: new TicTacToe('X'),
    gameStarted: false,
    turn: 'X',
    player: 'X',
    cpu: 'O',
    winner: null,
    win: false,
    draw: false,
    availableMoves: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    board: new Array(9).fill(null)
  };

  handleChooseTurn = turn => {
    const game = new TicTacToe(turn);
    let player;
    let cpu;
    if (turn === 'O') {
      player = 'O';
      cpu = 'X';
    } else if (turn === 'X') {
      player = 'X';
      cpu = 'O';
    }
    this.setState(
      () => ({
        game,
        gameStarted: true,
        board: game.board,
        turn,
        player,
        cpu,
        availableMoves: game.availableMoves
      }),
      () => {
        if (this.state.turn === 'O') {
          this.cpuMove('easy');
        }
      }
    );
  };

  checkWin = player => {
    const { checkWin, checkDraw } = this.state.game;
    let win = false;
    let draw = false;
    let winner = null;
    let turn = player === 'CPU' ? this.state.cpu : this.state.player;
    if (checkWin(turn)) {
      win = true;
      winner = player;
    } else if (checkDraw(turn)) {
      draw = true;
    }
    return {
      win,
      winner,
      draw
    };
  };

  cpuMove = level => {
    const cpuMove = this.state.game[`${level}CPUMove`];
    const newBoard = cpuMove();
    const availableMoves = this.state.game.availableMoves;

    this.setState(() => {
      const { win, draw, winner } = this.checkWin('CPU');
      if (win || draw) {
        return {
          win,
          draw,
          winner,
          board: newBoard
        };
      } else {
        return {
          board: newBoard,
          availableMoves
        };
      }
    });
  };

  handlePlayerChoose = index => {
    const newBoard = this.state.game.playerMove(index);
    const availableMoves = this.state.game.availableMoves;

    this.setState(
      () => {
        const { win, draw, winner } = this.checkWin('PLAYER');
        if (win || draw) {
          return {
            win,
            draw,
            winner,
            board: newBoard
          };
        } else {
          return {
            board: newBoard,
            availableMoves
          };
        }
      },
      () => {
        if (this.state.win || this.state.draw) {
          return;
        }
        this.cpuMove('easy');
      }
    );
  };

  render() {
    return (
      <div>
        <div className="btn-control">
          <div
            onClick={() => {
              if (this.state.gameStarted) {
                return false;
              }
              this.handleChooseTurn('X');
            }}>
            X
          </div>
          <div
            onClick={() => {
              if (this.state.gameStarted) {
                return false;
              }
              this.handleChooseTurn('O');
            }}>
            O
          </div>
          <Board
            board={this.state.board}
            handlePlayerChoose={this.handlePlayerChoose}
            availableMoves={this.state.availableMoves}
            win={this.state.win}
            draw={this.state.draw}
          />
        </div>
      </div>
    );
  }
}

export default Game;
