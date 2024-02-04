import { useState, useEffect } from 'react';
import { getStatistics } from '../api/boggdleAPI';
import { getHighScores, getSaveData } from '../utils/localStorage';

function Statistics({ day, gameEnded }) {
  const [statistics, setStatistics] = useState(null);
  const [saveData, setSaveData] = useState(null);
  const [highScores, setHighScores] = useState(null);

  useEffect(() => {
    async function loadStats() {
      const newStatistics = await getStatistics();
      setStatistics(newStatistics);
      const newSaveData = getSaveData(day);
      setSaveData(newSaveData);
      const newHighScores = getHighScores();
      setHighScores(newHighScores);
    }
    loadStats();
  }, [day, gameEnded]);

  const copyReultToClipboard = () => {
    const text = `Boggdle ${day}\nhttps://simenmh.com/boggdle\n\nScore: ${saveData['score']}\n1. ${saveData['guesses'][0]['word']} (+${saveData['guesses'][0]['points']})\n2. ${saveData['guesses'][1]['word']} (+${saveData['guesses'][1]['points']})\n3. ${saveData['guesses'][2]['word']} (+${saveData['guesses'][2]['points']})`;
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <div className='Statistics'>
        {gameEnded && (
          <>
            {/* FINAL SCORE */}
            {saveData && (
              <div className='Statistics__FinalScore'>
                Well done! Your final score is: <span>{saveData['score']}</span>
              </div>
            )}

            {/* COPY TO CLIPBOARD */}
            <div className='Statistics__ButtonContainer'>
              <div
                className='Statistics__Button'
                onClick={copyReultToClipboard}
              >
                Copy Results to Clipboard
              </div>
            </div>

            <div className='Statistics__Separator' />

            {/* HIGH SCORE */}
            {highScores && highScores['score'] !== 0 && (
              <div className='Statistics__HighScore'>
                Your all-time highest score: <span>{highScores['score']}</span>
              </div>
            )}

            {/* BEST WORD */}
            {highScores && highScores['word']['word'] && (
              <div className='Statistics__HighScore'>
                Your all-time highest scoring word:{' '}
                <span>
                  {`${highScores['word']['word']} (+${highScores['word']['points']})`}
                </span>
              </div>
            )}
          </>
        )}
        {/* STATISTICS */}
        {statistics && (
          <>
            {gameEnded && (
              <>
                <div className='Statistics__Separator' />

                <div className='Statistics__StatsHeader'>
                  Today's best possible solution:
                </div>
                <div className='Statistics__Stats Statistics__HighestSolution'>
                  {statistics.best.map(obj => {
                    return (
                      <p key={obj.word}>
                        {obj.word} (+{obj.points})
                      </p>
                    );
                  })}
                </div>

                <div className='Statistics__Separator' />

                <div className='Statistics__StatsHeader'>
                  Today's most popular words:
                </div>
                <div className='Statistics__Stats Statistics__MostPopular'>
                  {statistics.popular.map((obj, idx) => {
                    return (
                      <p key={obj.word}>
                        {idx + 1}. {obj.word} (+{obj.points})
                      </p>
                    );
                  })}
                </div>

                <div className='Statistics__Separator' />
              </>
            )}
            <div className='Statistics__StatsHeader'>
              Today's average score: <span>{statistics.average}</span>
            </div>

            <div className='Statistics__Separator' />
          </>
        )}
      </div>
    </>
  );
}

export default Statistics;
