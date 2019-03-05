import React from 'react';
import ReactDOM from 'react-dom';
import Board from './src/components/board.component';

class Game extends React.Component {
  render() {
    return <Board />;
  }
}

ReactDOM.render(<Game />, document.getElementById('root'));
