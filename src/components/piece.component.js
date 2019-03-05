import React from 'react';
import './piece.css';

const Piece = ({ index, piece, handlePlayerMoveClick }) => (
  <div className="piece" onClick={handlePlayerMoveClick}>
    {piece !== null ? piece : ''}
  </div>
);

export default Piece;
