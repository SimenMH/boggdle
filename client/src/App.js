import './css/styles.css';
import Modal from 'react-modal';

import Board from './components/Board.component';
import Header from './components/Header.component';
import { useState } from 'react';

const boardSize = 25;

function App() {
  const [showHelpModal, setShowHelpModal] = useState(true);

  // If invalid board size
  if (Math.sqrt(boardSize) % 1 !== 0) {
    return <div>Square root of board size must be a whole number</div>;
  }

  const openHelpModal = () => {
    setShowHelpModal(true);
  };

  const closeHelpModal = () => {
    setShowHelpModal(false);
  };

  return (
    <>
      <Modal
        className='Modal'
        overlayClassName='Modal__Overlay'
        isOpen={showHelpModal}
        onRequestClose={closeHelpModal}
        shouldCloseOnOverlayClick={true}
        contentLabel='Help Modal'
      >
        <h2>How To Play</h2>
        <h3>Find the highest scoring words on the grid in 3 guesses</h3>
        <div className='Modal__Close' onClick={closeHelpModal}></div>
        <ul className='Modal__Tutorial'>
          <li>
            Discover words by swiping across the grid of letters. Letters can be
            swiped horizontally, vertically, or diagonally.
          </li>
          <li>
            Each tile in the grid has a specific value. Accumulate points based
            on the letters you select.
          </li>
          <li>
            Invalid words will be considered as a guess with a score of 0
            points.
          </li>
          <li>
            Words with a length of 6 letters or more earn an extra 5 points. Use
            longer words to boost your score.
          </li>
          <li>
            Your final score is the sum of points from all three attempts.
          </li>
        </ul>

        <p>
          A new board is released daily at midnight (UTC). The game uses an
          American-English dictionary
        </p>
      </Modal>
      <Header openHelpModal={() => openHelpModal()} />
      <Board boardSize={boardSize} />
    </>
  );
}

export default App;
