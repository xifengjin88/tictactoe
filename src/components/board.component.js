import React from 'react';
import Piece from './piece.component';
import './board.css';

const Game = ({ board, handlePlayerChoose, availableMoves, win, draw }) => {
  return (
    <div className="board">
      {board.map((piece, index) => (
        <Piece
          piece={piece}
          index={index}
          key={index}
          handlePlayerChoose={handlePlayerChoose}
          availableMoves={availableMoves}
          win={win}
          draw={draw}
        />
      ))}
    </div>
  );
};

export default Game;

