class TicTacToe {
  constructor(player = 'X') {
    this.reset(player);
  }

  static winningMove = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  reset = (player = 'X') => {
    this.player = player;
    this.cpu = player === 'X' ? 'O' : 'X';
    this.board = new Array(9).fill(null);
    this.availableMoves = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  };

  playerMove = index => {
    this.board[index] = this.player;
    this.recalculateAvailableMoves(index);

    return this.board;
  };

  recalculateAvailableMoves = index => {
    let replacement = [...this.availableMoves];
    replacement = replacement.filter(move => move !== index);
    this.availableMoves = replacement;
  };

  easyCPUMove = () => {
    const index = this.randomPick();
    this.board[index] = this.cpu;
    this.recalculateAvailableMoves(index);
    return this.board;
  };

  randomPick = () => {
    return this.availableMoves[
      Math.floor(Math.random() * this.availableMoves.length)
    ];
  };

  mediumCPUMove = () => {};

  hardCPUMove = () => {};

  checkWin = player => {
    console.log(
      'board from game.js',
      this.board,
      'player',
      player,
      'winning',
      TicTacToe.winningMove.filter(row => {
        const [col1, col2, col3] = row;
        return (
          this.board[col1] === player &&
          this.board[col2] === player &&
          this.board[col3] === player
        );
      }).length !== 0
    );
    return (
      TicTacToe.winningMove.filter(row => {
        const [col1, col2, col3] = row;
        return (
          this.board[col1] === player &&
          this.board[col2] === player &&
          this.board[col3] === player
        );
      }).length !== 0
    );
  };

  checkDraw = () => {
    return this.availableMoves.length === 0;
  };
}

export default TicTacToe;
