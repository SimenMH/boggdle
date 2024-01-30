import { useEffect, useState, useCallback } from 'react';
import { getTable, submitWord, submitScore } from '../api/boggdleAPI';
import {
  getSaveData,
  updateHighScores,
  updateSaveData,
} from '../utils/localStorage';

import Tile from './Tile.component';
import Statistics from './Statistics.component';

const TileColor = {
  Default: 0,
  Select: 1,
  Correct: 2,
  Incorrect: 3,
  Disabled: 4,
};

function Board({ boardSize }) {
  const [table, setTable] = useState({});
  const [tiles, setTiles] = useState([]);
  const [hoveredTile, setHoveredTile] = useState(null);
  const [selectedTiles, setSelectedTiles] = useState([]);
  const [currentWord, setCurrentWord] = useState('');
  const [currentWordScore, setCurrentWordScore] = useState(0);
  const [guesses, setGuesses] = useState(0);
  const [guessedWords, setGuessedWords] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);

  const setMouseButtonState = e => {
    const flags = e.buttons !== undefined ? e.buttons : e.which;
    setMouseDown((flags & 1) === 1);
  };

  // Loads today's tiles
  const loadTiles = () => {
    if (table['characters'] && table['values']) {
      const boardSizeSqrt = Math.sqrt(boardSize);
      const newTiles = [];

      let idx = 0;
      for (let i = 0; i < boardSizeSqrt; i++) {
        for (let j = 0; j < boardSizeSqrt; j++) {
          const letter = table.characters[idx];
          const newTile = {
            id: newTiles.length,
            letter: letter,
            position: [i, j],
            points: table.values[letter].value,
            highlight: TileColor.Default,
          };

          newTiles.push(newTile);
          idx++;
        }
      }
      setTiles(newTiles);
    }
  };

  // Loads save data from local storage
  const loadSaveData = () => {
    if (table['day']) {
      const saveData = getSaveData(table['day']);
      setGuessedWords(saveData['guesses']);
      setCurrentScore(saveData['score']);

      let usedGuesses = 0;
      for (let i = 0; i < saveData['guesses'].length; i++) {
        if (saveData['guesses'][i]['word']) usedGuesses++;
      }
      setGuesses(usedGuesses);
    }
  };

  // On load
  useEffect(() => {
    async function loadTable() {
      const newTable = await getTable(); // await
      setTable(newTable);
    }
    loadTable();
    document.addEventListener('mousedown', setMouseButtonState);
    document.addEventListener('mouseup', setMouseButtonState);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Load save data and tiles once table is loaded
  useEffect(() => {
    loadSaveData();
    loadTiles();
  }, [table]); // eslint-disable-line react-hooks/exhaustive-deps

  const resetTiles = useCallback(() => {
    setIsPaused(false);
    setSelectedTiles([]);
    setCurrentWord('');
    setCurrentWordScore(0);
  }, []);

  useEffect(() => {
    // When hovered tile changes
    if (!gameEnded && !isPaused && mouseDown && hoveredTile != null) {
      if (!selectedTiles.includes(hoveredTile)) {
        if (selectedTiles.length) {
          // Check for valid move
          const previousTilePosition = tiles[selectedTiles.slice(-1)].position;
          const currentTilePosition = tiles[hoveredTile].position;
          if (
            Math.abs(previousTilePosition[0] - currentTilePosition[0]) > 1 ||
            Math.abs(previousTilePosition[1] - currentTilePosition[1]) > 1
          ) {
            // Invalid move
            return;
          }
        }

        // Add tile to selected tiles
        setSelectedTiles(prev => {
          return [...prev, hoveredTile];
        });

        // Update current word and word score
        setCurrentWord(prev => (prev += tiles[hoveredTile].letter));
        setCurrentWordScore(prev => (prev += tiles[hoveredTile].points));
      } else if (
        selectedTiles.length > 1 &&
        hoveredTile === selectedTiles.slice(-2)[0]
      ) {
        // Erase last tile
        const previousTile = selectedTiles.slice(-1);
        setCurrentWord(prev => prev.slice(0, -1));
        setCurrentWordScore(prev => (prev -= tiles[previousTile].points));
        setSelectedTiles(prev => prev.slice(0, -1));
      }
    }
  }, [
    hoveredTile,
    mouseDown,
    selectedTiles,
    tiles,
    currentWord,
    isPaused,
    gameEnded,
  ]);

  // Submit Word
  useEffect(() => {
    async function guessWord() {
      // When mouse is released and we have selected tiles
      if (!gameEnded && !isPaused && !mouseDown && selectedTiles.length) {
        setIsPaused(true);
        // TODO: Check if already guessed word
        // If word is at least 2 characters long
        if (currentWord.length >= 2) {
          const score = await submitWord(currentWord); // await
          if (score > 0) {
            // Set highlight CORRECT
            setTiles(prev => {
              return prev.map(tile => {
                if (selectedTiles.includes(tile.id)) {
                  tile.highlight = TileColor.Correct;
                }
                return tile;
              });
            });
          } else {
            // Set highlight INCORRECT
            setTiles(prev => {
              return prev.map(tile => {
                if (selectedTiles.includes(tile.id)) {
                  tile.highlight = TileColor.Incorrect;
                }
                return tile;
              });
            });
          }

          setGuessedWords(prev => {
            const newGuesses = [...prev];
            newGuesses[guesses].word = currentWord;
            newGuesses[guesses].points = score;

            // Update words in local storage
            const saveData = getSaveData(table['day']);
            saveData['guesses'] = newGuesses;
            updateSaveData(table['day'], saveData);

            return newGuesses;
          });

          // Update Score
          setCurrentScore(prev => {
            const newScore = prev + score;

            // Update score in local storage
            const saveData = getSaveData(table['day']);
            saveData['score'] = newScore;
            updateSaveData(table['day'], saveData);

            return newScore;
          });

          setGuesses(prev => prev + 1);

          // Reset tiles after X ms
          setTimeout(resetTiles, 1000);
        } else {
          resetTiles();
        }
      }
    }
    guessWord();
  }, [
    mouseDown,
    selectedTiles,
    currentWord,
    isPaused,
    guesses,
    resetTiles,
    table,
    gameEnded,
  ]);

  // When selectedTiles changes, update selected tiles with Select highlight
  useEffect(() => {
    if (!gameEnded) {
      setTiles(prev => {
        return prev.map(tile => {
          if (selectedTiles.includes(tile.id)) {
            tile.highlight = TileColor.Select;
          } else {
            tile.highlight = TileColor.Default;
          }
          return tile;
        });
      });
    }
  }, [selectedTiles]); // eslint-disable-line react-hooks/exhaustive-deps

  // When we reach maximum guesses, end game
  useEffect(() => {
    async function endGame() {
      if (guesses >= 3 && !isPaused) {
        setGameEnded(true);

        setTiles(prev => {
          return prev.map(tile => {
            tile.highlight = TileColor.Disabled;
            return tile;
          });
        });

        const saveData = getSaveData(table['day']);
        updateHighScores(saveData);
        if (!saveData.submitted) {
          try {
            await submitScore(saveData);
            saveData.submitted = true;
            updateSaveData(table['day'], saveData);
          } catch (err) {
            console.error(err);
          }
        }
      }
    }
    endGame();
  }, [guesses, table, isPaused]);

  return (
    <div className='Board'>
      {gameEnded ? (
        <Statistics day={table['day']} />
      ) : (
        <div className='WordBox'>
          {`${currentWord}`}{' '}
          {currentWordScore > 0 &&
            `(+${currentWordScore + (currentWord.length >= 6 ? 5 : 0)})`}
        </div>
      )}
      <div className='Board__TileContainer'>
        <svg>
          {selectedTiles.length > 1 &&
            selectedTiles.map((tile, idx) => {
              if (idx === selectedTiles.length - 1)
                return <line key={idx}></line>;
              const tile1 = tiles[tile];
              const tile2 = tiles[selectedTiles[idx + 1]];

              const pos1 = [
                tile1.position[1] * 80 + 30,
                tile1.position[0] * 80 + 30,
              ];
              const pos2 = [
                tile2.position[1] * 80 + 30,
                tile2.position[0] * 80 + 30,
              ];

              return (
                <line
                  key={idx}
                  x1={pos1[0]}
                  x2={pos2[0]}
                  y1={pos1[1]}
                  y2={pos2[1]}
                />
              );
            })}
        </svg>

        {tiles.map(tile => (
          <Tile
            key={tile.id}
            tile={tile}
            setHoveredTile={id => setHoveredTile(id)}
          />
        ))}
      </div>

      {guessedWords.length > 0 && (
        <div className='Board__Guesses'>
          <div>
            <div>Your Guesses:</div>
            {guessedWords.map((word, idx) => {
              return (
                <div
                  className={`Board__GuessWord ${
                    guessedWords[idx].word && guessedWords[idx].points === 0
                      ? 'Board__GuessWord--invalid'
                      : ''
                  }`}
                  key={idx}
                >
                  {idx + 1}.{' '}
                  {guessedWords[idx].word &&
                    `${guessedWords[idx].word} (+${guessedWords[idx].points})`}
                </div>
              );
            })}
          </div>
          <div className='Board__Score'>Score: {currentScore}</div>
        </div>
      )}
    </div>
  );
}

export default Board;
