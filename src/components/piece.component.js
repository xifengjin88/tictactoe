import React from 'react';
import './piece.css';

const Piece = ({
  piece,
  index,
  handlePlayerChoose,
  availableMoves,
  win,
  draw
}) => {
  return (
    <div
      className="piece"
      onClick={() => {
        console.log(availableMoves);
        if (win || draw) {
          console.log('is this here');
          return false;
        }
        if (!availableMoves.includes(index)) {
          console.log('is this here');
          return false;
        }
        console.log('is this here');
        handlePlayerChoose(index);
      }}>
      {piece !== null ? piece : ' '}
    </div>
  );
};

export default Piece;
