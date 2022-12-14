/*
 * Basic template for the Tic-Tac-Toe game
 * From the tutorial at:
 * https://reactjs.org/tutorial/tutorial.html
 *
 * Gilberto Echeverria
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Square(props) {
  return (
    <button className="square"
            onClick={props.onClick} >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    // A key must be provided when using map to generate elements
    return (<Square value={this.props.squares[i]}
                    key={i}
                    onClick={() => this.props.onClick(i)} />
    );
  }

  makeRow(rowIndex) {
    const cellIndices = [3 * rowIndex, 3 * rowIndex + 1, 3 * rowIndex + 2];
    return (cellIndices.map((cell) => this.renderSquare(cell)));
  }

  render() {
    // A key must be provided when using map to generate elements
    const matrix = [0, 1, 2].map((idx) =>
        <div key={idx} className="board-row">
          {this.makeRow(idx)}
        </div>)
    return (
      <div>
        {matrix}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        coords: null,
      }],
      xIsNext: true,
      stepNumber: 0,
    }
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  handleClick(i) {
    // Treat the state variables as immutable
    // They are not modified directly, but instead a new copy is created
    // Copy the history up to the current step (for when we go back)
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    // Exit if the cell is already marked, or the game has finished
    if(calculateWinner(squares) || squares[i]) {
      return;
    }
    // Determine the coordinates of the cell clicked
    const coords = Math.trunc(i / 3) + ', ' + (i % 3);
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    // Update the state with the changes
    this.setState({
      history: history.concat([{squares: squares, coords: coords}]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }

  createStepList(history) {
    // 'step' is the array item, and 'move' is the array index
    return history.map((step, move) => {
        const desc = move ?
          'Go to move #' + move + " - (" + step.coords + ")" :
          'Go to game start';
        const format_desc = (move === this.state.stepNumber) ?
          // Use JSX to format the content
          <b>{desc}</b> :
          desc;
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}> {format_desc} </button>
          </li>
        )
    });
  }

  render() {
    // Get a direct reference to the current board
    const history = this.state.history;
    const current = history[this.state.stepNumber];

    // Determine if the game has finished
    const winner = calculateWinner(current.squares);
    const status = winner ?
      'Winner is : ' + winner :
      'Next player: ' + (this.props.xIsNext ? 'X' : 'O');

    // Generate a list of previous moves
    const moves = this.createStepList(history);

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
