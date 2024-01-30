import './css/styles.css';

import Board from './components/Board.component';

const boardSize = 25;

function App() {
  // If invalid board size
  if (Math.sqrt(boardSize) % 1 !== 0) {
    return <div>Square root of board size must be a whole number</div>;
  }

  return (
    <>
      <header>
        <h1>Boggdle</h1>
      </header>
      <Board boardSize={boardSize} />
    </>
  );
}

export default App;
